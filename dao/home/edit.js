// Submodule imports
const Home = require("../../model/home");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editHome = (home)=>{
  return new Promise((resolve, reject)=>{
    if (!home instanceof Home){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `home` SET `h_e_brides_name`=?,`h_e_grooms_name`=? ,`h_e_date_of_reception`=? WHERE `h_uid` = ?"
    conn.query(query, [
      home.uid,
      home.brides_name,
      home.grooms_name,
      home.date_of_reception
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(home)
      }
    })
  })
}
