const TABLE_NAME = 'files';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('name').notNull();
    table.string('url').notNull();
    table.bool('is_deleted').defaultsTo(false);
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
