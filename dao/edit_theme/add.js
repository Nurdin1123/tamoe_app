// Submodule imports
const Edit_Theme = require("../../model/edit_theme");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addEdit_Theme = (edit_theme)=>{
  return new Promise((resolve, reject)=>{
    if (!edit_theme instanceof Edit_Theme){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `edit_theme`(`et_uid`,`et_e_brides_name`,`et_e_grooms_name` ,`et_brides_parent_1`,`et_brides_parent_2`,`et_grooms_parent_1`,`et_grooms_parent_2`,`et_e_location`) VALUES (?,?,?,?,?,?,?,?)"
    conn.query(query, [
      edit_theme.uid,
      edit_theme.brides_name,
      edit_theme.grooms_name,
      edit_theme.brides_parent_1,
      edit_theme.brides_parent_2,
      edit_theme.grooms_parent_1,
      edit_theme.grooms_parent_2,
      edit_theme.location
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        edit_theme.id = res.insertId
        resolve(edit_theme)
      }
    })
  })
}
