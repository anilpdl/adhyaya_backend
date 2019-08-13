const TABLE_NAME = 'avatar_users';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.string('url').notNull();
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
