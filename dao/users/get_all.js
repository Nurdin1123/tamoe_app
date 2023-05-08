// Submodule imports
const Users= require("../../model/users");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllUsers = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `users` ";
    if (keyword !== null) {
      query += ` WHERE (u_uid LIKE '%${keyword}%' OR u_email LIKE '%${keyword}%' OR u_phone_number LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let users = [];
        for (let i = 0; i < res.length; i++) {
          const user = new Users(
            res[i].u_id,
            res[i].u_uid,
            res[i].u_email,
            res[i].u_phone_number
          );
          users.push(user);
        }
        resolve(users);
      }
    });
  });
};

