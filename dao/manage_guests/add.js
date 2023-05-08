// Submodule imports
const Manage_Guests = require("../../model/manage_guests");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addManage_Guests = (manage_guests)=>{
  return new Promise((resolve, reject)=>{
    if (!manage_guests instanceof Manage_Guests){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `manage_guests`(`mg_uid`,`mg_invite_code`,`mg_fullname` ,`mg_phone_number`,`mg_email`,`mg_seat_number`,`mg_e_number_of_guests`) VALUES (?,?,?,?,?,?,?)"
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
        manage_guests.id = res.insertId
        resolve(manage_guests)
      }
    })
  })
}
