import knex from "knex";
import bookshelf from "bookshelf";
import config from "../config/config";

const connection = knex(config.db);
const db = bookshelf(connection);

db.plugin(['registry', 'visibility']);

export default db;
