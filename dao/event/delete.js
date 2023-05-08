// Submodule imports
const Event = require("../../model/event");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteEvent = (event)=>{
  return new Promise((resolve, reject)=>{
    if (!event instanceof Event){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `event` WHERE e_uid = ?"
    conn.query(query, [
      event.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
