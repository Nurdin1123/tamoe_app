// Submodule imports
const Users = require("../../model/users");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editUsers = (users)=>{
  return new Promise((resolve, reject)=>{
    if (!users instanceof Users){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `users` SET `u_phone_number`=?,`u_email`=? WHERE `u_uid` = ?"
    conn.query(query, [
      users.uid,
      users.phone_number,
      users.email
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(users)
      }
    })
  })
}
