const TABLE_NAME = 'personal_details';

exports.up = function (knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.date('dob');
    table.string('father_name');
    table.string('mother_name');
    table.string('marital_status');
    table.string('citizenship_number');
    table.date('citizenship_issued_date');
    table.string('citizenship_issued_place');
    table.string('passport_number');
    table.date('passport_issued_date');
    table.date('passport_expiry_date');
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
