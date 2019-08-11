const TABLE_NAME = 'status_users';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.enu('status', ['pending', 'processing', 'completed']).defaultsTo(0);
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
