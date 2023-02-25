
const config = require("./cnStr");
const { Pool, Client } = require('pg');
const pool = new Pool(config);
module.exports = pool;

