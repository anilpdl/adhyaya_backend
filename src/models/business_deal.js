import db from "../utils/db";
import "./business";
import "./deal";

const TABLE_NAME = "business_deals";

var BusinessDeal = db.model('BusinessDeal',{
  tableName: TABLE_NAME,
  deal: function(){
    return this.belongsTo('Deal');
  },
  business: function(){
    return this.belongsTo('Business');
  }
});

export default BusinessDeal;
