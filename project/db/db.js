const pgp = require('pg-promise')(/* options */);

const db = pgp('postgres://postgres:pg123@localhost:5432/mymusicworld');

module.exports = db;

