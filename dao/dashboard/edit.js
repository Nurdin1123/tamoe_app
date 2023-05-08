// Submodule imports
const Dashboard = require("../../model/dashboard");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editDashboard = (dashboard)=>{
  return new Promise((resolve, reject)=>{
    if (!dashboard instanceof Dashboard){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `dashboard` SET `d_u_email`=?,`d_e_brides_name`=?,`d_e_grooms_name`=? ,`d_e_time_of_reception`=?,`d_tr_information`=? WHERE `d_uid` = ?"
    conn.query(query, [
      dashboard.uid,
      dashboard.u_email,
      dashboard.e_brides_name,
      dashboard.e_grooms_name,
      dashboard.e_time_of_reception,
      dashboard.tr_information
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(dashboard)
      }
    })
  })
}
