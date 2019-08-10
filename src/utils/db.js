import knex from "knex";
import bookshelf from "bookshelf";
import config from "../config/config.json";

const connection = knex(config.db);
const db = bookshelf(connection);

db.plugin(["registry"]);

export default db;
