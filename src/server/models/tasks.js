const projects = require("./projects");

const schema = require("./schemas/tasks");

module.exports = {
  get: async req => {
    return await schema.select();
  },
  create: async req => {
    const body = req.body;
    const title = body.title || false;
    const description = body.description || false;
    const project_id = body.project_id || false;

    await projects.verify(body.jwt, project_id);

    if (!title || !description || !project_id) throw -20;
    if (title.trim().length <= 0) throw -21;
    if (description.trim().length <= 0) throw -22;

    return await schema.insert({
      title,
      description,
      project_id,
      type: "task"
    });
  },
  drop: async req => {
    return await schema.drop();
  }
};
