const Schema = require("../db/schema");

const schema = new Schema("accounts", [
  {
    title: "username",
    type: "string",
    required: true
  },
  {
    title: "password",
    type: "string",
    required: true
  },
  {
    title: "avatar",
    type: "string",
    required: false
  },
  {
    title: "date",
    type: "string",
    required: true
  }
]);

schema.set = params => {
  const time = new Date();
  const date = time.getMilliseconds();
  return {
    ...params,
    date: date
  };
};

module.exports = {
  verify: async req => {
    const body = req.body;
    const check = await schema.get({ find: { username: body.username } });
    if (check.length >= 1) throw 0;
    else return 1;
  }
};
