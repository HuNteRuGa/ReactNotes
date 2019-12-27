const { getSalt, encryptPassword } = require("../../utils/password");

const Schema = require("../../db/schema");

let schema;

try {
  schema = new Schema("accounts", [
    {
      title: "id",
      type: "int",
      required: true,
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
      title: "salt",
      type: "text",
      required: true
    },
    {
      title: "avatar",
      type: "text",
      required: false
    },
    {
      title: "date",
      type: "bigint",
      required: true
    }
  ]);
} catch (err) {}

schema.set = params => {
  const time = new Date();
  const date = Math.round(time.getTime() / 1000);

  const salt = getSalt(16);
  const password = encryptPassword(salt, params.password);

  return {
    ...params,
    date,
    salt,
    password
  };
};

schema.get = res => {
  return {
    ...res,
    date: res.date * 1000
  };
};

module.exports = schema;
