class Manage_Guests{
    constructor(
      id,
      uid,
      invite_code,
      fullname,
      phone_number,
      email,
      seat_number,
      number_of_guests,
    ) {
      this.id = id;
      this.uid = uid;
      this.invite_code = invite_code;
      this.fullname = fullname;
      this.phone_number = phone_number;
      this.email = email;
      this.seat_number = seat_number;
      this.number_of_guests = number_of_guests;
    }
  }
  
  module.exports = Manage_Guests;
  