const TABLE_NAME = 'business_users';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments();
    table.integer('business_id').references('businesses.id');
    table.integer('user_id').references('users.id');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
