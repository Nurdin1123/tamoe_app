class Transaction{
    constructor(
      id,
      uid,
      email,
      price,
      information,
    ) {
      this.id = id;
      this.uid = uid;
      this.email = email;
      this.price = price;
      this.information = information;
    }
  }
  
  module.exports = Transaction;
  