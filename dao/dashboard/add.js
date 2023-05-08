// Submodule imports
const Dashboard = require("../../model/dashboard");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addDashboard = (dashboard)=>{
  return new Promise((resolve, reject)=>{
    if (!dashboard instanceof Dashboard){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `dashboard`(`d_uid`,`d_u_email`,`d_e_brides_name`,`d_e_grooms_name` ,`d_e_time_of_reception`,`d_tr_information`) VALUES (?,?,?,?,?,?)"
    conn.query(query, [
      dashboard.uid,
      dashboard.email,
      dashboard.brides_name,
      dashboard.grooms_name,
      dashboard.time_of_reception,
      dashboard.tr_information
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        dashboard.id = res.insertId
        resolve(dashboard)
      }
    })
  })
}
