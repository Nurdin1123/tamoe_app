// Submodule imports
const Users = require("../../model/users");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteUsers = (users)=>{
  return new Promise((resolve, reject)=>{
    if (!users instanceof Users){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `users` WHERE u_uid = ?"
    conn.query(query, [
      users.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
