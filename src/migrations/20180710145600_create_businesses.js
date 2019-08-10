const TABLE_NAME = 'businesses';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments();
    table.string('business_name');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
