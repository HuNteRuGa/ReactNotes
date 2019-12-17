const postgres = require("./index");
const { validate, validateObject } = require("../utils/validator");

const types = {
  int: { sql: "integer", js: "number" },
  bigint: { sql: "bigint", js: "number" },
  float: { sql: "real", js: "number" },
  text: { sql: "text", js: "string" },
  varchar: { sql: "varchar", js: "string" },
  bool: { sql: "boolean", js: "boolean" }
};

const validator = {
  title: {
    type: "string",
    required: true
  },
  type: {
    type: "string", 
    required: true
  },
  required: {
    type: "boolean"
  },
  unique: {
    type: "boolean"
  },
  primary: {
    type: "boolean"
  },
  autoincrement: {
    type: "boolean"
  },
  foreignKey: {
    type: "object",
    elems: {
      table: {
        type: "string",
        required: true
      },
      columns: {
        type: "object",
        required: true,
        minLength: 1,
        arrayType: "string"
      }
    }
  }
};

const columnsSetter = (target, prop, value) => {
  try {
    validateObject(value, validator);
  } catch (err) {
    consoleError(err);
    throw 0;
  }
  target[prop] = value;
  return true;
};

class Schema {
  constructor(table, ...columns) {
    if (columns[0][0]) columns = columns[0];
    this.table = table;

    this.columns = new Proxy(
      {},
      {
        set: columnsSetter
      }
    );

    for (let col of columns) {
      const title = col.title;
      try {
        validate("title", title, validator);
      } catch (err) {
        consoleError(err);
        throw 0;
      }

      try {
        this.columns[title] = {
          ...col
        };
      } catch (err) {
        throw 0;
      }
    }

    this.create();
  }
  async select() {}
  async create() {
    let req = "";
    let foreign = "";
    let primaries = [];

    for (const title in this.columns) {
      const column = this.columns[title];
      const type = types[column.type].sql;
      const required = column.required ? " NOT NULL" : "";
      const unique = column.unique ? " UNIQUE" : "";
      const autoincrement = column.autoincrement
        ? " GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 )"
        : "";
      const primary = column.primary;
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
      primaries.length > 0 ? `CONSTRAINT ${this.table}_pk PRIMARY KEY (${primaries})` : "";

    const sql = `CREATE TABLE if not exists public.${this.table}(\n${req}${foreign}${primary})`;

    try {
      await postgres(sql);
    } catch (err) {
      consoleError(err.stack);
    }
  }
}

module.exports = Schema;

const consoleError = err => {
  console.log("\n\x1b[41m", "            === ERROR ===            ", "\x1b[0m");
  console.log(err);
  console.log("\x1b[41m", "            === ERROR ===            ", "\x1b[0m\n");
};
