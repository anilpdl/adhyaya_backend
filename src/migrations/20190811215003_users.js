const TABLE_NAME = 'users';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.string('first_name');
    table.string('middle_name')
    table.string('last_name');
    table.enu('role', ['admin', 'student']).defaultsTo('student');
    table.string('email');
    table.string('password');
    table.enu('gender', ['male', 'female']).defaultsTo('male');
    table.timestamp('last_login');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
