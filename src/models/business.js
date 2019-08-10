import db from "../utils/db";
import "./business_deal";
import "./business_user";

const TABLE_NAME = "businesses";

var Business = db.model('Business',{
  tableName: TABLE_NAME,
  business_deal: function(){
    return this.hasMany('BusinessDeal');
  },
  business_user: function(){
    return this.hasMany('BusinessUser')
  }
});

export default Business;
