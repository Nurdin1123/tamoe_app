class Dashboard{
    constructor(
      id,
      uid,
      email,
      brides_name,
      grooms_name,
      time_of_reception,
      tr_information,
    ) {
      this.id = id;
      this.uid = uid;
      this.email = email;
      this.brides_name = brides_name;
      this.grooms_name = grooms_name;
      this.time_of_reception = time_of_reception;
      this.tr_information = tr_information;
    }
  }
  
  module.exports = Dashboard;
  