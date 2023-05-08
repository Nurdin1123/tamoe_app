// Submodule imports
const Manage_Guests = require("../../model/manage_guests");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editManage_Guests = (manage_guests)=>{
  return new Promise((resolve, reject)=>{
    if (!manage_guests instanceof Manage_Guests){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `manage_guests` SET `mg_invite_code`=?,`mg_fullname`=? ,`mg_phone_number`=?,`mg_email`=?,`mg_seat_number`=?,`mg_e_number_of_guests`=? WHERE `mg_uid` = ?"
    conn.query(query, [
      manage_guests.uid,
      manage_guests.invite_code,
      manage_guests.fullname,
      manage_guests.phone_number,
      manage_guests.email,
      manage_guests.seat_number,
      manage_guests.number_of_guests
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(manage_guests)
      }
    })
  })
}
