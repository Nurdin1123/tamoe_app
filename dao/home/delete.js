// Submodule imports
const Home = require("../../model/home");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteHome = (home)=>{
  return new Promise((resolve, reject)=>{
    if (!home instanceof Home){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `home` WHERE h_uid = ?"
    conn.query(query, [
      home.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
