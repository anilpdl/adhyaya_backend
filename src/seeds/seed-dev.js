const BUSINESSES = "businesses";
const BUSINESS_DEALS = "business_deals";
const DEALS = "deals";
const BOOKED_DEALS = "booked_deals";
const USERS = "users";
const BUSINESS_USERS = "business_users";

const BUSINESSES_DATA = require("./data/businesses");
const BUSINESS_DEALS_DATA = require("./data/business_deals");
const DEALS_DATA = require("./data/deals");
const BOOKED_DEALS_DATA = require("./data/booked_deals");
const USERS_DATA = require("./data/users");
const BUSINESS_USERS_DATA = require("./data/business_users");

exports.seed = (knex, Promise) => {
  // Deletes existing entries
  return (
       knex(BOOKED_DEALS).del()
      .then(() => {
        return knex(BUSINESS_DEALS).del();
      })
      .then(() => {
        return knex(DEALS).del();
      })
      .then(() => {
        return knex(BUSINESS_USERS).del();
      })
      .then(() => {
        return knex(BUSINESSES).del();
      })
      .then(() => {
        return knex(USERS).del();
      })
      // Inserts seed entries
      .then(() => {
        return knex(USERS).insert(USERS_DATA);
      })
      .then(() => {
        return knex(BUSINESSES).insert(BUSINESSES_DATA);
      })
      .then(() => {
        return knex(BUSINESS_USERS).insert(BUSINESS_USERS_DATA);
      })
      .then(() => {
        return knex(DEALS).insert(DEALS_DATA);
      })
      .then(() => {
        return knex(BUSINESS_DEALS).insert(BUSINESS_DEALS_DATA);
      })
      .then(() => {
        return knex(BOOKED_DEALS).insert(BOOKED_DEALS_DATA);
      })
  );
};
