// Submodule imports
const Event= require("../../model/event");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllEvent = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `event` ";
    if (keyword !== null) {
      query += ` WHERE (e_uid LIKE '%${keyword}%' OR e_brides_name LIKE '%${keyword}%' OR e_grooms_name LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let event = [];
        for (let i = 0; i < res.length; i++) {
          const events = new Event(
            res[i].e_id,
            res[i].e_uid,
            res[i].e_brides_name,
            res[i].e_grooms_name,
            res[i].e_number_of_guests,
            res[i].e_location,
            res[i].e_date_of_reception,
            res[i].e_time_of_reception
          );
          event.push(events);
        }
        resolve(event);
      }
    });
  });
};
