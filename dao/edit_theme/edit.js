// Submodule imports
const Edit_Theme = require("../../model/edit_theme");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editEdit_Theme = (edit_theme)=>{
  return new Promise((resolve, reject)=>{
    if (!edit_theme instanceof Edit_Theme){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `edit_theme` SET `et_e_brides_name`=?,`et_e_grooms_name`=? ,`et_brides_parent_1`=?,`et_brides_parent_2`=?,`et_grooms_parent_1`=?,`et_grooms_parent_2`=?,`et_e_location`=? WHERE `et_uid` = ?"
    conn.query(query, [
      edit_theme.uid,
      edit_theme.e_brides_name,
      edit_theme.e_grooms_name,
      edit_theme.brides_parent_1,
      edit_theme.brides_parent_2,
      edit_theme.grooms_parent_1,
      edit_theme.grooms_parent_2,
      edit_theme.e_location
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(edit_theme)
      }
    })
  })
}
