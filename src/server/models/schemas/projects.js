const Schema = require("../../db/schema");

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
      title: "account_id",
      type: "int",
      required: true,
      foreign: { table: "accounts", column: "id" }
    },
    {
      title: "title",
      type: "text",
      required: true
    },
    {
      title: "description",
      type: "text",
      required: true
    },
    {
      title: "date",
      type: "bigint"
    }
  );
} catch (err) {}

schema.set = params => {
  const time = new Date();
  const date = Math.round(time.getTime() / 1000);

  return {
    ...params,
    date
  };
};

schema.get = params => {
  return {
    ...params,
    date: params.date * 1000,
    tasks: [],
    inProcess: [],
    done: []
  };
};

module.exports = schema;
