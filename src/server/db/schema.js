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

    const stringFIND = getFindString(this.validator, find);

    if (!order.by) order.by = Object.keys(this.columns)[0];
    if (!order.desc) order.desc = true;
    const stringORDER = ` ORDER BY ${order.by} ${order.desc ? "DESC" : ""}`;

    const stringLIMIT = ` LIMIT ${limit}`;
    const stringOFFSET = ` OFFSET ${offset}`;

    let GET = "";
    for (let column of get) {
      if (!this.validator[column]) throw -201;
      if (GET !== "") GET += ", ";
      GET += column;
    }
    const stringGET = GET === "" ? "*" : GET;

    let JOIN = ` FROM public.${this.table}`;
    if (join && join.type && join.table && join.get) {
      if (join.type == "natural") {
        let joinGet = "";
        for (let column of join.get) {
          joinGet += `, ${column}`;
        }
        JOIN = `${joinGet} NATURAL JOIN public.${join.table}`;
      } else throw -204;
    }

    const res = await sql(
      `SELECT ${stringGET}${JOIN}${stringFIND}${stringORDER}${stringLIMIT}${stringOFFSET}`
    );
    return res.map(value => this.get(value));
  }
  async drop() {
    sql(`DROP TABLE public.${this.table}`);
  }
  async update(params = {}) {
    const find = params.find || {};
    const set = this.set(params.set || {});

    const stringFIND = getFindString(this.validator, find);

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

const getFindString = (validator, find) => {
  let FIND = "";
  for (let key in find) {
    if (!validator[key]) throw -200;
    if (FIND !== "") FIND += " AND ";
    FIND += `${key}='${find[key]}'`;
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
