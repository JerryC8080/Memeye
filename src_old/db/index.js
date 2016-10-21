const path = require("path");
const Datastore = require("nedb");
const Promise = require("bluebird");
const db = new Datastore({
  filename: path.join(__dirname, './datafile.db')
});
const dbAsync = Promise.promisifyAll(db);


db.loadDatabase();

dbAsync.loadDatabase();

module.exports = {
  db: db,
  dbAsync: dbAsync
};