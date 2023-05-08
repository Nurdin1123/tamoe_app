class Edit_Theme{
    constructor(
      id,
      uid,
      brides_name,
      grooms_name,
      brides_parent_1,
      brides_parent_2,
      grooms_parent_1,
      grooms_parent_2,
      location,
    ) {
      this.id = id;
      this.uid = uid;
      this.brides_name = brides_name;
      this.grooms_name = grooms_name;
      this.brides_parent_1 = brides_parent_1;
      this.brides_parent_2 = brides_parent_2;
      this.grooms_parent_1 = grooms_parent_1;
      this.grooms_parent_2 = grooms_parent_2;
      this.location = location;
    }
  }
  
  module.exports = Edit_Theme;
  