const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Transaction = require("../model/transaction");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { deleteTransaction } = require("../dao/transaction/delete");
const { editTransaction } = require("../dao/transaction/edit");
const { addTransaction } = require("../dao/transaction/add");
const { getAllTransaction } = require("../dao/transaction/get_all");
const { getTransactionByUid } = require("../dao/transaction/get_all");
const router = express.Router();

/* GET all transaction */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get transaction by uid */
    getTransactionByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* transaction UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllTransaction(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add transaction*/
router.post("/", async (req, res) => {
  if (
    req.body.email === undefined ||
    req.body.price === undefined ||
    req.body.information === undefined   
    ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const transaction = new Transaction(
    null,
    makeId(8),
    req.body.email,
    req.body.price,
    req.body.information
  );

  addTransaction(transaction)
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

/* PUT edit transaction */
router.put("/", async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.email === undefined ||
    req.body.price === undefined ||
    req.body.information === undefined
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const transaction = new Transaction(
    null,
    req.body.uid,
    req.body.u_email,
    req.body.t_price,
    req.body.information
  );

  editTransaction(transaction)
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

// /* DELETE a transaction */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteTransaction(new Transaction(null, req.query.uid))
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
