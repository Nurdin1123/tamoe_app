// Submodule imports
const Dashboard = require("../../model/dashboard");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteDashboard = (dashboard)=>{
  return new Promise((resolve, reject)=>{
    if (!dashboard instanceof Dashboard){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `dashboard` WHERE d_uid = ?"
    conn.query(query, [
      dashboard.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
