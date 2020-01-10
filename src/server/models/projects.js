const accounts = require("./accounts");

const schema = require("./schemas/projects");

module.exports = {
  verify: async (jwt, id) => {
    await accounts.verify({ body: { jwt } });
    let res = await schema.select({
      get: ["id"],
      find: { id },
      join: {
        type: "inner",
        table: "accounts",
        equal: { table: "account_id", accounts: "id" },
        get: ["id"]
      }
    });
    if (res.length <= 0) throw -40;
    if (res[0].id === jwt.data.id) return true;
    else return false;
  },
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
    return await schema.select({
      find,
      get: ["id", "title", "description", "account_id", "date"],
      join: {
        type: "left",
        table: "tasks",
        equal: { table: "id", tasks: "project_id" },
        get: ["id", "title", "description", "date"]
      }
    });
  },
  getByJwt: async req => {
    await accounts.verify(req);
    const body = req.body;
    return await schema.select({
      find: { account_id: body.jwt.data.id },
      get: ["id", "title", "description", "account_id"],
      limit: 10,
      join: {
        type: "inner",
        table: "tasks",
        equal: { table: "id", tasks: "project_id" },
        get: ["id", "title", "description", "date"]
      }
    });
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
