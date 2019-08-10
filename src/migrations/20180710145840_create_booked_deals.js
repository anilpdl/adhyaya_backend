const TABLE_NAME = 'booked_deals';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments();
    table.integer('user_id').references('users.id');
    table.integer('deal_id').references('deals.id');
    table.boolean('redeemed').default(false);
    table.boolean('expired').default(false);
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
