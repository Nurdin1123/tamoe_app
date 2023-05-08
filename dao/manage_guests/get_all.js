// Submodule imports
const Manage_Guests= require("../../model/manage_guests");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllManage_Guests = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `manage_guests` ";
    if (keyword !== null) {
      query += ` WHERE (mg_uid LIKE '%${keyword}%' OR mg_invite_code LIKE '%${keyword}%' OR mg_fullname LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let manage_guests = [];
        for (let i = 0; i < res.length; i++) {
          const Manage_guests = new Manage_Guests(
            res[i].mg_id,
            res[i].mg_uid,
            res[i].mg_invite_code,
            res[i].mg_fullname,
            res[i].mg_phone_number,
            res[i].mg_email,
            res[i].mg_seat_number,
            res[i].mg_e_number_of_guests
          );
          manage_guests.push(Manage_guests);
        }
        resolve(manage_guests);
      }
    });
  });
};
