module.exports = {
  port: 8081,
  postgres: {
    url: "db",
    port: "5432",
    database: "postgres",
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD
  }
};
