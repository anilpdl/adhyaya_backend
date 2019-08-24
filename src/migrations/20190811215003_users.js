const TABLE_NAME = 'users';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('first_name').notNull();
    table.string('middle_name')
    table.string('last_name').notNull();
    table.enu('role', ['admin', 'student']).defaultsTo('student').notNull();
    table.string('email').notNull();
    table.string('password').notNull();
    table.enu('gender', ['male', 'female']).defaultsTo('male').notNull();
    table.timestamp('last_login');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
