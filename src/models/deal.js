import db from "../utils/db";
import "./business_deal";
import "./booked_deal";

const TABLE_NAME = "deals";

var Deal = db.model('Deal',{
  tableName: TABLE_NAME,
  business_deal: function() {
    return this.hasMany("BusinessDeal");
  },
  booked_deal: function(){
    return this.hasMany('BookedDeal');
  }
});

export default Deal;
