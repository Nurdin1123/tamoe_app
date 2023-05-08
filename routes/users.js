const { INCOMPLETE_BODY } = require("../constants/error_messages");
const Users = require("../model/users");
const makeId = require("../util/random_string");

const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const { AUTHENTICATION_FAILED } = require("../constants/error_messages");
const { deleteUsers } = require("../dao/users/delete");
const { editUsers } = require("../dao/users/edit");
const { addUsers } = require("../dao/users/add");
const { getAllUsers } = require("../dao/users/get_all");
const { getusersByUid } = require("../dao/users/get_all");
const { validateInput } = require("../util/Regexr");
const { loginWithEmail } = require("../dao/users/login_with_email");
const { loginReauth } = require("../dao/users/login_reauth");
const { authenticateToken } = require("../util/jwt");

const router = express.Router();

const generateAccessToken = (obj) => {
  return jwt.sign(obj, process.env.TOKEN_SECRET);
};

/* POST Login */
router.post("/login", (req, res, _) => {
  loginWithEmail(req.body.email, req.body.password)
    .then((result) => {
      res.status(200).send({
        success: true,
        users: result,
        access_token: generateAccessToken(JSON.stringify(result)),
      });
      //renewTimestampLastLogin(result.id).catch(e=>{})
    })
    .catch((err) => {
      if (err === AUTHENTICATION_FAILED) {
        res.status(200).send({
          success: false,
          error: AUTHENTICATION_FAILED,
        });
      } else {
        console.error(err);
        res.status(500).send({
          success: false,
          error: err,
        });
      }
    });
});

/* POST Reauth */
router.post("/re-auth", (req, res) => {
  //console.log(req.user)
  loginReauth(req.users.email)
    .then((result) => {
      res.status(200).send({
        success: true,
        user: result,
        access_token: generateAccessToken(JSON.stringify(result)),
      });
      //renewTimestampLastLogin(result.id).catch(e=>{})
    })
    .catch((err) => {
      if (err === AUTHENTICATION_FAILED) {
        res.status(200).send({
          success: false,
          error: AUTHENTICATION_FAILED,
        });
      } else {
        console.error(err);
        res.status(500).send({
          success: false,
          error: err,
        });
      }
    });
});

/* GET all users */
router.get("/", (req, res, _) => {
  if (req.query.uid !== undefined) {
    /* Get users by uid */
    getUsersByUid(req.query.uid).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  } else {
    /* users UID is not passed therefore retrieve all */
    const keyword = req.query.q !== undefined ? req.query.q : null;
    req.query.start = req.query.start === undefined ? null : req.query.start;
    req.query.count = req.query.count === undefined ? null : req.query.count;
    getAllUsers(keyword, req.query.start, req.query.count).then((result) => {
      res.status(200).send({
        success: true,
        result: result,
      });
    });
  }
});

/* POST add users*/
router.post("/", validateInput, async (req, res) => {
  if (
    req.body.email === undefined ||
    req.body.phone_number === undefined 
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const password = makeId(8);
  const salt = makeId(6);
  const saltedPassword = crypto.SHA256(password).toString();


  const users = new Users(
    null,
    makeId(8),
    req.body.email,
    req.body.phone_number,
    null
  );

  users.password = saltedPassword;
  users.salt = salt;

  addUsers(users)
    .then(async (result) => {
      res.status(200).send({
        success: true,
        result: result,
        password: password,
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        success: false,
      });
    });
});

/* PUT edit users */
router.put("/", validateInput, async (req, res) => {
  if (
    req.body.uid === undefined ||
    req.body.email === undefined ||
    req.body.phone_number === undefined
  ) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  const users = new Users(
    null,
    req.body.uid,
    req.body.email,
    req.body.phone_number
  );

  editUsers(users)
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

// /* DELETE a users */
router.delete("/", (req, res, next) => {
  if (req.query.uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  deleteUsers(new Users(null, req.query.uid))
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

/* REGISTER user in a store */
router.post("/set-store", validateInput, (req, res) => {
  if (req.body.store_uid === undefined || req.body.users_uid === undefined) {
    res.status(400).send({
      success: false,
      error: INCOMPLETE_BODY,
    });
    return;
  }

  registerUsersStores(req.body.users_uid, req.body.store_uid)
    .then((r) => {
      res.status(200).send({
        success: true,
        result: r,
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        success: false,
        error: e,
      });
    });
});

module.exports = router;
