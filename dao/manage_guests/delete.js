// Submodule imports
const Manage_Guests = require("../../model/manage_guests");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteManage_Guests = (manage_guests)=>{
  return new Promise((resolve, reject)=>{
    if (!manage_guests instanceof Manage_Guests){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `manage_guests` WHERE mg_uid = ?"
    conn.query(query, [
      manage_guests.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
