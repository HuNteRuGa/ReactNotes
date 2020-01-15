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
      find: { account_id: 1 },
      get: ["id", "title", "description", "account_id", "date"],
      join: {
        type: "left",
        table: "tasks",
        equal: { table: "id", tasks: "project_id" },
        get: ["id", "title", "description", "date"]
      }
    });
  },
  updateTitleById: async function(req) {
    const body = req.body;
    const id = body.id;
    await this.verify(body.jwt, id);

    const title = body.title;

    if (title.trim() === "") throw -40;

    return await schema.update({ find: { id }, set: { title } });
  },
  updateDescriptionById: async function(req) {
    const body = req.body;
    const id = body.id;
    await this.verify(body.jwt, id);

    const description = body.description;

    if (description.trim() === "") throw -40;

    return await schema.update({ find: { id }, set: { description } });
  },
  getByJwt: async req => {
    await accounts.verify(req);
    const body = req.body;
    let res = await schema.select({
      find: { account_id: body.jwt.data.id },
      get: ["id", "title", "description", "account_id", "date"],
      limit: 10,
      join: {
        type: "left",
        table: "tasks",
        equal: { table: "id", tasks: "project_id" },
        get: ["id", "title", "description", "date", "type"]
      }
    });
    res = res.map(value => {
      const response = {
        id: value.id,
        title: value.title,
        description: value.description,
        account_id: value.account_id,
        task: [],
        inProcess: [],
        done: []
      };
      const tasks = value.tasks;
      for (let key in tasks) {
        const task = tasks[key];
        const type = task.type;
        console.log(task);
        if (type === "task" || type === "inProcess" || type === "done") {
          response[type].push(task);
        } else throw -14;
      }
      return response;
    });
    return res;
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
