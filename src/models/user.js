import db from "../utils/db";
import "./business_user";
import "./booked_deal"

const TABLE_NAME = "users";

var User = db.model('User',{
  tableName: TABLE_NAME,
  booked_deals: function(){
    return this.hasMany('BookedDeal');
  },
  business_users: function(){
    return this.hasMany("BusinessUser");
  }
});

export default User;
