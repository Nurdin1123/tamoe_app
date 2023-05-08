// Submodule imports
const Template = require("../../model/template");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addTemplate = (template)=>{
  return new Promise((resolve, reject)=>{
    if (!template instanceof Template){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `template`(`t_uid`, `t_e_uid`,`t_level`, `t_price`) VALUES (?,?,?,?)"
    conn.query(query, [
      template.uid,
      template.e_uid,
      template.level,
      template.price
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        template.id = res.insertId
        resolve(template)
      }
    })
  })
}
