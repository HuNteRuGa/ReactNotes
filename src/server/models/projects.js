const Schema = require("../db/schema");

const accounts = require("./accounts");

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

module.exports = {
  create: async req => {
    await accounts.verify(req);

    const body = req.body;
    const title = body.title;
    const description = body.description;
    if (title.trim().length <= 0) throw -10;
    if (description.trim().length <= 0) throw -11;
    return await schema.insert({ account_id: body.jwt.data.id, title, description });
  },
  get: async req => {
    const query = req.query;
    const find = JSON.parse(query.find || "{}");
    const get = JSON.parse(query.get || "[]");
    return await schema.select({ find, get });
  },
  getByJwt: async req => {
    await accounts.verify(req);
    const body = req.body;
    return await schema.select({ find: { account_id: body.jwt.data.id }, limit: 10 });
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
