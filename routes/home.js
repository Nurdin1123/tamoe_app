const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Home = require("../model/home");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteHome } = require("../dao/home/delete");
const { editHome } = require("../dao/home/edit");
const { addHome } = require("../dao/home/add");
const { getAllHome } = require("../dao/home/get_all");
const { getHomeByUid } = require("../dao/home/get_all");
const router = express.Router();

/* GET all home */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get home by uid */
    getHomeByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* home UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllHome(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add home*/
router.post("/", async (req, res) => {
  if (
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.date_of_reception === undefined   
    ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const home = new Home(
    null,
    makeId(8),
    req.body.brides_name,
    req.body.grooms_name,
    req.body.date_of_reception  
    );

  addHome(home)
    .then(async (result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        success: false,
      });
    });
});

/* PUT edit home */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.date_of_reception === undefined
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const home = new Home(
    null,
    req.body.uid,
    req.body.brides_name,
    req.body.grooms_name,
    req.body.date_of_reception  
    );

  editHome(home)
    .then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        success: false,
      });
    });
});

// /* DELETE a home */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteHome(new Home(null, req.query.uid))
    .then((e) => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((_) => {
      console.error(e);
      res.status(500).send({
        success: false,
      });
    });
});

module.exports = router;
