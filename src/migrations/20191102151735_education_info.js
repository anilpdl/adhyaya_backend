const TABLE_NAME = 'educations';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.string('level');
    table.string('institution');
    table.string('symbol');
    table.string('board');
    table.string('grade');
    table.string('marks');
    table.integer('passed_year');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
