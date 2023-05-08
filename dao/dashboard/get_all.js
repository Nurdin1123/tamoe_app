// Submodule imports
const Dashboard= require("../../model/dashboard");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllDashboard = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `dashboard` ";
    if (keyword !== null) {
      query += ` WHERE (d_uid LIKE '%${keyword}%' OR d_u_email LIKE '%${keyword}%' OR d_e_brides_name LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let dashboard = [];
        for (let i = 0; i < res.length; i++) {
          const dashboards = new Dashboard(
            res[i].d_id,
            res[i].d_uid,
            res[i].d_u_email,
            res[i].d_e_brides_name,
            res[i].d_e_grooms_name,
            res[i].d_e_time_of_reception,
            res[i].d_tr_information
          );
          dashboard.push(dashboards);
        }
        resolve(dashboard);
      }
    });
  });
};
