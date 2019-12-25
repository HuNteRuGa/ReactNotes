const Schema = require("../db/schema");

let schema;

try {
  schema = new Schema(
    "table",
    {
      title: "id",
      type: "int",
      required: true,
      unique: false,
      primary: true,
      autoincrement: true
    },
    {
      title: "username",
      type: "text",
      required: true
    },
    {
      title: "password",
      type: "text",
      required: true
    },
    {
      title: "date",
      type: "bigint"
    }
  );
} catch (err) {}

module.exports = {
  get: async req => {
    const query = req.query;
    const find = JSON.parse(query.find || "{}");
    const get = JSON.parse(query.get || "[]");
    return await schema.select({ find, get });
  },
  update: async req => {
    const query = req.query;
    const find = JSON.parse(query.find || "{}");
    const set = JSON.parse(query.set || "{}");
    return await schema.update({ find, set });
  },
  drop: async req => {
    return await schema.drop();
  },
  insert: async req => {
    return await schema.insert(req.query);
  }
};
