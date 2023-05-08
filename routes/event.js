const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Event = require("../model/event");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteEvent } = require("../dao/event/delete");
const { editEvent } = require("../dao/event/edit");
const { addEvent } = require("../dao/event/add");
const { getAllEvent } = require("../dao/event/get_all");
const { geteventByUid } = require("../dao/event/get_all");
const router = express.Router();

/* GET all event */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get event by uid */
    getEventByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* event UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllEvent(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add event*/
router.post("/", async (req, res) => {
  if (
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.number_of_guests === undefined ||
    req.body.location === undefined ||
    req.body.date_of_reception === undefined ||
    req.body.time_of_reception === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const event = new Event(
    null,
    makeId(8),
    req.body.brides_name,
    req.body.grooms_name,
    req.body.number_of_guests,
    req.body.location,
    req.body.date_of_reception,
    req.body.time_of_reception
  );

  addEvent(event)
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

/* PUT edit event */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.number_of_guests === undefined ||
    req.body.location === undefined ||
    req.body.date_of_reception === undefined ||
    req.body.time_of_reception === undefined
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const event = new Event(
    null,
    req.body.uid,
    req.body.brides_name,
    req.body.grooms_name,
    req.body.number_of_guests,
    req.body.location,
    req.body.date_of_reception,
    req.body.time_of_reception
  );

  editEvent(event)
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

// /* DELETE a event */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteEvent(new Event(null, req.query.uid))
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
