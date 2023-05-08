// Submodule imports
const Edit_Theme= require("../../model/edit_theme");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllEdit_Theme = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `edit_theme` ";
    if (keyword !== null) {
      query += ` WHERE (et_uid LIKE '%${keyword}%' OR et_e_brides_name LIKE '%${keyword}%' OR et_e_grooms_name LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let edit_theme = [];
        for (let i = 0; i < res.length; i++) {
          const edit_themes = new Edit_Theme(
            res[i].et_id,
            res[i].et_uid,
            res[i].et_e_brides_name,
            res[i].et_e_grooms_name,
            res[i].et_brides_parent_1,
            res[i].et_brides_parent_2,
            res[i].et_grooms_parent_1,
            res[i].et_grooms_parent_2,
            res[i].et_e_location
          );
          edit_theme.push(edit_themes);
        }
        resolve(edit_theme);
      }
    });
  });
};
