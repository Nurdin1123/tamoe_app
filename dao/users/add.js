// Submodule imports
const Users = require("../../model/users");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addUsers = (users)=>{
  return new Promise((resolve, reject)=>{
    if (!users instanceof Users){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `users`(`u_uid`, `u_email`, `u_phone_number`, `u_password`) VALUES (?,?,?,?)"
    conn.query(query, [
      users.uid,
      users.email,
      users.phone_number,
      users.password
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        users.id = res.insertId

        delete users.password
        resolve(users)
      }
    })
  })
}
