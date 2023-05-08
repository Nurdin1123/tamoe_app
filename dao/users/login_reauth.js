const conn = require("../../conn/mysql_conn_handler");
const Users = require("../../model/users");
const {AUTHENTICATION_FAILED} = require("../../constants/error_messages");

module.exports.loginReauth = (email)=>{
  return new Promise((resolve, reject)=>{
    const query = "SELECT * FROM `users` WHERE `u_email` = ? "
    conn.query(query, [email], async(_, users)=>{
      if (users.length === 0){
        reject(AUTHENTICATION_FAILED)
      }else{
          const i = 0;
          const users = new Users(
            users[i].u_id,
            users[i].u_uid,
            users[i].u_email,
            users[i].u_phone_number,
            users[i].u_password,
            users[i].u_salt,
          )

          delete users.password
          delete users.salt

          resolve(users)
      }
    })
  })
}
