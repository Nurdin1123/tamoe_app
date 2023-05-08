const crypto = require("crypto-js");
const conn = require("../../conn/mysql_conn_handler");
const Users = require("../../model/users");
const {AUTHENTICATION_FAILED} = require("../../constants/error_messages");
module.exports.loginWithEmail = (email, password)=>{
  return new Promise((resolve, reject)=>{
    const query = "SELECT * FROM `users` WHERE `u_email` = ? ;"
    conn.query(query, [email], async(error, users)=>{
      if (users.length === 0){
        reject(AUTHENTICATION_FAILED)
      }else{
        const saltedUsersInputPass = users[0].u_salt + password
        const usersInputHashBrown = crypto.SHA256(saltedUsersInputPass).toString()
        if (usersInputHashBrown === users[0].u_password) {
          const i = 0;
          const users = new Users(
            users[i].u_id,
            users[i].u_uid,
            users[i].u_email,
            users[i].u_phone_number,
          )

          delete users.password
          delete users.salt

          resolve(users)
        }else{
          reject(AUTHENTICATION_FAILED)
        }
      }
    })
  })
}
