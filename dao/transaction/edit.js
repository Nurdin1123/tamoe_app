// Submodule imports
const Transaction = require("../../model/transaction");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.editTransaction = (transaction)=>{
  return new Promise((resolve, reject)=>{
    if (!transaction instanceof Transaction){
      reject(WRONG_OBJECT)
    }

    const query = "UPDATE `transaction` SET `tr_u_email`=?,`tr_t_price`=? ,`tr_information`=? WHERE `tr_uid` = ?"
    conn.query(query, [
      transaction.uid,
      transaction.email,
      transaction.price,
      transaction.information
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(transaction)
      }
    })
  })
}
