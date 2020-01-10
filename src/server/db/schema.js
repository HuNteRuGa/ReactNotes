const postgres = require("./index");
const { validate, validateObject } = require("../utils/validator");
const { initValidator } = require("./validators");
const { getProxy } = require("../utils/proxy");

const types = {
  int: { sql: "integer", js: "number" },
  bigint: { sql: "bigint", js: "number" },
  float: { sql: "real", js: "number" },
  text: { sql: "text", js: "string" },
  varchar: { sql: "varchar", js: "string" },
  bool: { sql: "boolean", js: "boolean" }
};

class Schema {
  constructor(table, ...columns) {
    if (columns[0][0]) columns = columns[0];
    this.table = table;

    this.columns = getProxy();

    this.validator = {};

    for (let col of columns) {
      const title = col.title;
      try {
        validate("title", title, initValidator);
      } catch (err) {
        consoleError(err);
        throw 0;
      }

      try {
        if (!types[col.type]) {
          consoleError(`Data type "${col.type}" isn't exist`);
          throw 0;
        }
        this.columns[title] = {
          ...col
        };
        this.validator[title] = {
          type: types[col.type].js,
          required: col.autoincrement ? false : col.required
        };
        this.primary = Object.keys(this.columns)[0];
      } catch (err) {
        throw 0;
      }
    }
    // console.log(this.columns);
    this.create();
  }
  async insert(args) {
    if (this.set && typeof this.set == "function") args = this.set(args);

    try {
      validateObject(args, this.validator);
    } catch (err) {
      consoleError(err);
      throw -100;
    }

    const COLUMNS = Object.keys(args).join(", ");
    const VALUES = Object.values(args)
      .map(arg => `'${arg}'`)
      .join(", ");

    return await sql(
      `INSERT INTO public.${this.table} (${COLUMNS}) VALUES (${VALUES}) RETURNING id`
    );
  }
  async select(params = {}) {
    const find = params.find || {};
    const order = params.order || {};
    const get = params.get || [];
    const limit = params.limit || "ALL";
    const offset = params.offset || 0;
    const join = params.join || false;

    const stringFIND = getFindString(this.validator, find, this.table);

    if (!order.by) order.by = this.primary;
    if (!order.desc) order.desc = true;
    const stringORDER = ` ORDER BY public.${this.table}.${order.by} ${order.desc ? "DESC" : ""}`;

    const stringLIMIT = ` LIMIT ${limit}`;
    const stringOFFSET = ` OFFSET ${offset}`;

    let GET = "";
    for (let column of get) {
      if (!this.validator[column]) throw -201;
      if (GET !== "") GET += ", ";
      GET += `public.${this.table}.${column}`;
    }
    const stringGET = GET === "" ? "*" : GET;

    let JOIN = ` FROM public.${this.table}`;
    if (join && join.type && join.table && join.get) {
      let joinGet;
      switch (join.type) {
        case "natural":
          joinGet = `, public.${join.table}.${join.get.join(`, public.${join.table}.`)}`;
          JOIN = `${joinGet} FROM public.${this.table} NATURAL JOIN public.${join.table}`;
          break;

        case "inner":
          joinGet = `, public.${join.table}.${join.get.join(`, public.${join.table}.`)}`;
          JOIN = `${joinGet} FROM public.${this.table} INNER JOIN public.${join.table} ON public.${
            this.table
          }.${join.equal[this.table]}=public.${join.table}.${join.equal[join.table]}`;
          break;

        case "right":
          joinGet = `, public.${join.table}.${join.get.join(`, public.${join.table}.`)}`;
          JOIN = `${joinGet} FROM public.${this.table} RIGHT JOIN public.${join.table} ON public.${
            this.table
          }.${join.equal[this.table]}=public.${join.table}.${join.equal[join.table]}`;
          break;

        case "left":
          joinGet = join.get.reduce(
            (prev, get) => prev + `, public.${join.table}.${get} ${join.table}_${get}`,
            ""
          );
          JOIN = `${joinGet} FROM public.${this.table} LEFT JOIN public.${join.table} ON public.${
            this.table
          }.${join.equal[this.table]}=public.${join.table}.${join.equal[join.table]}`;
          break;

        default:
          throw -204;
      }
    }
    const sqlStr = `SELECT ${stringGET}${JOIN}${stringFIND}${stringORDER}${stringLIMIT}${stringOFFSET}`;
    console.log(`\n${sqlStr}\n`);
    let res = await sql(sqlStr);

    if (
      (join && join.type === "left") ||
      (join && join.type === "right") ||
      (join && join.type === "inner")
    ) {
      const responses = res.map(value => {
        const result = { [join.table]: {} };

        for (let key in value) {
          if (key.startsWith(`${join.table}_`)) {
            if (value[key]) {
              const k = key.substr(`${join.table}_`.length);
              result[join.table][k] = value[key];
            }
          } else {
            result[key] = value[key];
          }
        }
        if (Object.keys(result[join.table]).length <= 0) result[join.table] = null;
        return result;
      });
      res = [];
      for (let response of responses) {
        if (!res[response[this.primary]]) {
          res[response[this.primary]] = { ...response, [join.table]: [] };
        }
        if (response[join.table])
          res[response[this.primary]][join.table].push(response[join.table]);
      }
      res = res.filter(value => value !== null);
    }
    return res.map(value => this.get(value));
  }
  async drop() {
    sql(`DROP TABLE public.${this.table}`);
  }
  async update(params = {}) {
    const find = params.find || {};
    const set = this.set(params.set || {});

    const stringFIND = getFindString(this.validator, find, this.table);

    let SET = "";
    for (let column in set) {
      if (!this.validator[column]) throw -202;
      validate(column, set[column], this.validator);
      if (SET !== "") SET += ", ";
      SET += `${column}='${set[column]}'`;
    }

    return await sql(`UPDATE public.${this.table} SET ${SET}${stringFIND}`);
  }
  async create() {
    let req = "";
    let foreign = "";
    let primaries = [];

    for (const title in this.columns) {
      const column = this.columns[title];
      const type = types[column.type].sql;
      const primary = column.primary;
      const required = column.required || primary ? " NOT NULL" : "";
      const unique = column.unique ? " UNIQUE" : "";
      const autoincrement = column.autoincrement
        ? " GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 )"
        : "";
      const foreignKey = column.foreignKey;

      req += `${title} ${type}${required}${unique}${autoincrement},\n`;

      if (foreignKey) {
        const references = foreignKey.columns.join(", ");
        foreign += `FOREIGN KEY (${title}) REFERENCES ${column.foreignKey.table} (${references}) ON DELETE CASCADE,\n`;
      }

      if (primary) primaries.push(title);
    }
    primaries = primaries.join(", ");
    let primary =
      primaries.length > 0 ? `CONSTRAINT ${this.table}_pkey PRIMARY KEY (${primaries})` : "";

    sql(`CREATE TABLE if not exists public.${this.table} \n(\n${req}${foreign}${primary}\n)`);
  }
  set(args) {
    return args;
  }
  get(res) {
    return res;
  }
}

module.exports = Schema;

const getFindString = (validator, find, table) => {
  let FIND = "";
  for (let key in find) {
    if (!validator[key]) throw -200;
    if (FIND !== "") FIND += " AND ";
    FIND += `public.${table}.${key}='${find[key]}'`;
  }
  return FIND === "" ? "" : ` WHERE ${FIND}`;
};

const sql = async request => {
  try {
    return await postgres(request);
  } catch (err) {
    consoleError(`${err.stack}\nSQL:\n${request}`);
    return false;
  }
};

const consoleError = err => {
  console.log("\n\x1b[41m", "            === ERROR ===            ", "\x1b[0m");
  console.log(err);
  console.log("\x1b[41m", "            === ERROR ===            ", "\x1b[0m\n");
};
