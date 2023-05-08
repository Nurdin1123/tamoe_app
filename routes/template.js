const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Template = require("../model/template");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteTemplate } = require("../dao/template/delete");
const { editTemplate } = require("../dao/template/edit");
const { addTemplate } = require("../dao/template/add");
const { getAllTemplate } = require("../dao/template/get_all");
const { getTemplateByUid } = require("../dao/template/get_all");
const router = express.Router();

/* GET all template */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get template by uid */
    getTemplateByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* template UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllTemplate(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add template*/
router.post("/", async (req, res) => {
  if (
    req.body.e_uid === undefined ||
    req.body.level === undefined ||
    req.body.price === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const template = new Template(
    null,
    makeId(8),
    req.body.e_uid,
    req.body.level,
    req.body.price
  );

  addTemplate(template)
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

/* PUT edit template */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.e_uid === undefined ||
    req.body.level === undefined ||
    req.body.price === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const template = new Template(
    null,
    req.body.uid,
    req.body.e_uid,
    req.body.level,
    req.body.price
  );

  editTemplate(template)
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

// /* DELETE a template */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteTemplate(new Template(null, req.query.uid))
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
