// Submodule imports
const Template= require("../../model/template");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllTemplate = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `template` ";
    if (keyword !== null) {
      query += ` WHERE (t_uid LIKE '%${keyword}%' OR t_level LIKE '%${keyword}%' OR t_price LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let template = [];
        for (let i = 0; i < res.length; i++) {
          const templates = new Template(
            res[i].t_id,
            res[i].t_uid,
            res[i].t_e_uid,
            res[i].t_level,
            res[i].t_price
          );
          template.push(templates);
        }
        resolve(template);
      }
    });
  });
};
