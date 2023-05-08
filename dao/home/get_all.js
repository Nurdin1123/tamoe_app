// Submodule imports
const Home= require("../../model/home");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllHome = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `home` ";
    if (keyword !== null) {
      query += ` WHERE (h_uid LIKE '%${keyword}%' OR h_e_brides_name LIKE '%${keyword}%' OR h_e_grooms_name LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let home = [];
        for (let i = 0; i < res.length; i++) {
          const homes = new Home(
            res[i].h_id,
            res[i].h_uid,
            res[i].h_e_brides_name,
            res[i].h_e_grooms_name,
            res[i].h_e_date_of_reception
          );
          home.push(homes);
        }
        resolve(home);
      }
    });
  });
};
