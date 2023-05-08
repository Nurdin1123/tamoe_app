// Submodule imports
const Template = require("../../model/template");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editTemplate = (template)=>{
  return new Promise((resolve, reject)=>{
    if (!template instanceof Template){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `template` SET `t_e_uid`=?,`t_level`=?,`t_price`=? WHERE `t_uid` = ?"
    conn.query(query, [
      template.uid,
      template.e_uid,
      template.level,
      template.price
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(template)
      }
    })
  })
}
