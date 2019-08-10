const TABLE_NAME = 'business_deals';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments();
    table.integer('business_id').references('businesses.id');
    table.integer('deal_id').references('deals.id');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
