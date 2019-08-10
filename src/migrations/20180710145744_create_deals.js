const TABLE_NAME = 'deals';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments();
    table.string('name');
    table.string('description');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
