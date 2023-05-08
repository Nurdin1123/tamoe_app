const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Dashboard = require("../model/dashboard");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteDashboard } = require("../dao/dashboard/delete");
const { editDashboard } = require("../dao/dashboard/edit");
const { addDashboard } = require("../dao/dashboard/add");
const { getAllDashboard } = require("../dao/dashboard/get_all");
const { getDashboardByUid } = require("../dao/dashboard/get_all");
const router = express.Router();

/* GET all dashboard */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get dashboard by uid */
    getDashboardByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* dashboard UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllDashboard(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add dashboard*/
router.post("/", async (req, res) => {
  if (
    req.body.email === undefined ||
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.time_of_reception === undefined ||
    req.body.tr_information === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const dashboard = new Dashboard(
    null,
    makeId(8),
    req.body.email,
    req.body.brides_name,
    req.body.grooms_name,
    req.body.time_of_reception,
    req.body.tr_information
  );

  addDashboard(dashboard)
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

/* PUT edit dashboard */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.email === undefined ||
    req.body.brides_name === undefined ||
    req.body.grooms_name === undefined ||
    req.body.time_of_reception === undefined ||
    req.body.tr_information === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const dashboard = new Dashboard(
    null,
    req.body.uid,
    req.body.email,
    req.body.brides_name,
    req.body.grooms_name,
    req.body.time_of_reception,
    req.body.tr_information
  );

  editDashboard(dashboard) 
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

// /* DELETE a dashboard */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteDashboard(new Dashboard(null, req.query.uid))
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
