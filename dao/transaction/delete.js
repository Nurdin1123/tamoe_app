// Submodule imports
const Transaction = require("../../model/transaction");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.deleteTransaction = (transaction)=>{
  return new Promise((resolve, reject)=>{
    if (!transaction instanceof Transaction){
      reject(WRONG_OBJECT)
    }

    const query = "DELETE FROM `transaction` WHERE tr_uid = ?"
    conn.query(query, [
      transaction.uid,
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
