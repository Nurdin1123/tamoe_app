// Submodule imports
const Transaction = require("../../model/transaction");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addTransaction = (transaction)=>{
  return new Promise((resolve, reject)=>{
    if (!transaction instanceof Transaction){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `transaction`(`tr_uid`, `tr_u_email`, `tr_t_price`, `tr_information`) VALUES (?,?,?,?)"
    conn.query(query, [
      transaction.uid,
      transaction.email,
      transaction.price,
      transaction.information
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        transaction.id = res.insertId
        resolve(transaction)
      }
    })
  })
}
