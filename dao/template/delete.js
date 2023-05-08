// Submodule imports
const Template = require("../../model/template");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteTemplate = (template)=>{
  return new Promise((resolve, reject)=>{
    if (!template instanceof Template){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `template` WHERE t_uid = ?"
    conn.query(query, [
      template.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
