// Submodule imports
const Transaction= require("../../model/transaction");


const conn = require("../../conn/mysql_conn_handler");

module.exports.getAllTransaction = (keyword, limitStart, limitCount) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `transaction` ";
    if (keyword !== null) {
      query += ` WHERE (tr_uid LIKE '%${keyword}%' OR tr_u_email LIKE '%${keyword}%' OR tr_t_price LIKE '%${keyword}%')`;
    }
    if (limitStart !== null && limitCount !== null) {
      query += ` LIMIT ${limitStart}, ${limitCount}`;
    }
    conn.query(query, [], async (err, res) => {
      if (err) {
        reject(err);
      } else {
        let transaction = [];
        for (let i = 0; i < res.length; i++) {
          const transactions = new Transaction(
            res[i].tr_id,
            res[i].tr_uid,
            res[i].tr_u_email,
            res[i].tr_t_price,
            res[i].tr_information
          );
          transaction.push(transactions);
        }
        resolve(transaction);
      }
    });
  });
};
