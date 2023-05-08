const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Edit_Theme = require("../model/edit_theme");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteEdit_Theme } = require("../dao/edit_theme/delete");
const { editEdit_Theme } = require("../dao/edit_theme/edit");
const { addEdit_Theme } = require("../dao/edit_theme/add");
const { getAllEdit_Theme } = require("../dao/edit_theme/get_all");
const { getEdit_ThemeByUid } = require("../dao/edit_theme/get_all");
const router = express.Router();

/* GET all edit_theme */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get edit_theme by uid */
    getEdit_ThemeByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* edit_theme UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllEdit_Theme(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add edit_theme*/
router.post("/", async (req, res) => {
  if (
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.brides_parent_1 === undefined ||
    req.body.brides_parent_2 === undefined ||
    req.body.grooms_parent_1 === undefined ||
    req.body.grooms_parent_2 === undefined ||
    req.body.location === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLEBODY,
    });
    return;
  }

  const edit_theme = new Edit_Theme(
    null,
    makeId(8),
    req.body.brides_name,
    req.body.grooms_name,
    req.body.brides_parent_1,
    req.body.brides_parent_2,
    req.body.grooms_parent_1,
    req.body.grooms_parent_2,
    req.body.location
  );

  addEdit_Theme(edit_theme)
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

/* PUT edit edit_theme */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.e_brides_name === undefined ||
    req.body.e_grooms_name === undefined ||
    req.body.brides_parent_1 === undefined ||
    req.body.brides_parent_2 === undefined ||
    req.body.grooms_parent_1 === undefined ||
    req.body.grooms_parent_2 === undefined ||
    req.body.e_location === undefined
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const edit_theme = new Edit_Theme(
    null,
    req.body.uid,
    req.body.e_brides_name,
    req.body.e_grooms_name,
    req.body.brides_parent_1,
    req.body.brides_parent_2,
    req.body.grooms_parent_1,
    req.body.grooms_parent_2,
    req.body.e_location
  );

  editEdit_Theme(edit_theme)
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

// /* DELETE a edit_theme */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteEdit_Theme(new Edit_Theme(null, req.query.uid))
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
