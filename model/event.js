class Event{
    constructor(
      id,
      uid,
      brides_name,
      grooms_name,
      number_of_guests,
      location,
      date_of_reception,
      time_of_reception,
    ) {
      this.id = id;
      this.uid = uid;
      this.brides_name = brides_name;
      this.grooms_name = grooms_name;
      this.number_of_guests = number_of_guests;
      this.location = location;
      this.date_of_reception = date_of_reception;
      this.time_of_reception = time_of_reception;
    }
  }
  
  module.exports = Event;
  