const TABLE_NAME = "users";

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments();
    table.string("first_name");
    table.string("middle_name");
    table.string("last_name");
    table.string("role").default("customer");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME);
};
