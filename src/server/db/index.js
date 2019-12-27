const Postgres = require("pg").Pool;

const config = require("../config/index");

const postgres = new Postgres({
  host: config.postgres.url,
  port: config.postgres.port,
  database: config.postgres.database,
  user: config.postgres.user,
  password: config.postgres.password
});

module.exports = async sql => {
  let promise = new Promise((resolve, reject) => {
    postgres.query(sql, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res.rows);
      }
    });
  });
  return promise;
};
