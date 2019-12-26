const crypto = require("crypto");

const Schema = require("../db/schema");

const schema = new Schema("accounts", [
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

module.exports = {
  signin: async req => {
    const body = req.body;
    if ((!body.username && body.username !== "") || (!body.password && body.password !== ""))
      throw 0;
    if (body.username.trim().length <= 0) throw -1; // To short username
    if (body.password.trim().length <= 0) throw -2; // To short password

    const res = await schema.select({
      find: { username: body.username },
      get: ["id", "username", "avatar", "date", "password", "salt"]
    });
    if (res.length <= 0) throw -3; // Entered username isn't exist
    const hashedPassword = encryptPassword(res[0].salt, body.password.trim());
    if (hashedPassword !== res[0].password) throw -3;
    else {
      const data = {
        id: res[0].id,
        username: res[0].username,
        avatar: res[0].avatar,
        date: res[0].date
      };
      return { data: data, signature: encryptPassword(process.env.JWT_SALT, JSON.stringify(data)) };
    }
  },
  verify: async req => {
    const body = req.body;
    if (!body.jwt || !body.jwt.data || !body.jwt.signature) throw -1;
    const res = await schema.select({
      find: { username: body.jwt.data.username },
      get: ["salt"]
    });
    if (res.length <= 0) throw -1;
    const signature = encryptPassword(process.env.JWT_SALT, JSON.stringify(body.jwt.data));
    if (signature !== body.jwt.signature) throw -1;
    return true;
  },
  signup: async req => {
    const body = req.body;
    // Validation
    if (
      (!body.username && body.username !== "") ||
      (!body.password && body.password !== "") ||
      (!body.repeatPassword && body.repeatPassword !== "")
    ) {
      throw 0; // 400 error
    }

    if (body.username.trim().length < 2 || body.username.trim() > 30) throw -1; // To short username
    if (body.password.trim().length < 6) throw -2; // To short password
    if (body.password.trim() != body.repeatPassword.trim()) throw -3; // Password's isn't equal

    const usr = await schema.select({ find: { username: body.username } });
    if (usr.length > 0) throw -4; // This username is already exist

    await schema.insert({ username: body.username, password: body.password });
    return true;
  },
  get: async req => {
    return await schema.select();
  },
  getIdByUsername: async username => {
    const res = await schema.select({ find: { username }, get: ["id"] });
    if (res.length <= 0) return null;
    else return res[0].id;
  },
  drop: async req => {
    await schema.drop();
    return true;
  }
};

const getSalt = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const encryptPassword = (salt, password) => {
  return crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("hex");
};
