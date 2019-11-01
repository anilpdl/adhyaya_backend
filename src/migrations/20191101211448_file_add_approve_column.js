const TABLE_NAME = "files";

exports.up = function (knex, Promise) {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.bool('is_approved').defaultsTo(false);
    table.integer('approver_id').references('id').inTable('users');
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('scores', function (table) {
    table.dropColumn('is_approved');
    table.dropColumn('approver_id');
  })
}