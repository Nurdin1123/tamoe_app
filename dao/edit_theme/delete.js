// Submodule imports
const Edit_Theme = require("../../model/edit_theme");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteEdit_Theme = (edit_theme)=>{
  return new Promise((resolve, reject)=>{
    if (!edit_theme instanceof Edit_Theme){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `edit_theme` WHERE et_uid = ?"
    conn.query(query, [
      edit_theme.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
