// Submodule imports
const Home = require("../../model/home");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addHome = (home)=>{
  return new Promise((resolve, reject)=>{
    if (!home instanceof Home){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `home`(`h_uid`,`h_e_brides_name`,`h_e_grooms_name` ,`h_e_date_of_reception`) VALUES (?,?,?,?)"
    conn.query(query, [
      home.uid,
      home.brides_name,
      home.grooms_name,
      home.date_of_reception
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        home.id = res.insertId
        resolve(home)
      }
    })
  })
}
