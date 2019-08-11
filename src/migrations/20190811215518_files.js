const TABLE_NAME = 'files';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('name');
    table.string('url');
    table.bool('is_deleted');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
