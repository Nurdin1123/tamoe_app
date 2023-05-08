const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Manage_Guests = require("../model/manage_guests");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteManage_Guests } = require("../dao/manage_guests/delete");
const { editManage_Guests } = require("../dao/manage_guests/edit");
const { addManage_Guests } = require("../dao/manage_guests/add");
const { getAllManage_Guests } = require("../dao/manage_guests/get_all");
const { getManage_GuestsByUid } = require("../dao/manage_guests/get_all");
const router = express.Router();

/* GET all manage_guests */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get manage_guests by uid */
    getManage_GuestsByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* manage_guests UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllManage_Guests(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add manage_guests*/
router.post("/", async (req, res) => {
  if (
    req.body.invite_code === undefined ||
    req.body.fullname === undefined ||
    req.body.phone_number === undefined ||
    req.body.email === undefined ||
    req.body.seat_number === undefined ||
    req.body.number_of_guests === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const manage_guests = new Manage_Guests(
    null,
    makeId(8),
    req.body.invite_code,
    req.body.fullname,
    req.body.phone_number,
    req.body.email,
    req.body.seat_number,
    req.body.number_of_guests
  );

  addManage_Guests(manage_guests)
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

/* PUT edit manage_guests */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.invite_code === undefined ||
    req.body.fullname === undefined ||
    req.body.phone_number === undefined ||
    req.body.email === undefined ||
    req.body.seat_number === undefined ||
    req.body.number_of_guests === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const manage_guests = new Manage_Guests(
    null,
    req.body.uid,
    req.body.invite_code,
    req.body.fullname,
    req.body.phone_number,
    req.body.email,
    req.body.seat_number,
    req.body.number_of_guests
  );

  editManage_Guests(manage_guests)
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

// /* DELETE a manage_guests */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteManage_Guests(new Manage_Guests(null, req.query.uid))
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
