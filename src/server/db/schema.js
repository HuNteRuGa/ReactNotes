const postgres = require("./index");

function decode(elems, columns) {
  elems.forEach((elem, index) => {
    for (key in elem) {
      if (columns[key] && columns[key].type == "string") {
        elems[index][key] = elems[index][key].replace(/%_1/gi, "'");
      }
    }
  });
  return elems;
}

function encode(elems, columns) {
  elems.forEach((elem, index) => {
    for (key in elem) {
      if (columns[key] && columns[key].type == "string") {
        elems[index][key] = elems[index][key].replace(/'/gi, "%_1");
      }
    }
  });
  return elems;
}

function getWhere(find, columns) {
  let where = false;

  if (find) {
    for (let key in find) {
      if (columns[key] || key == "id") {
        if (where) where += ` OR`;
        else where = "WHERE";

        let param = find[key];
        param = key != "id" && columns[key].type == "string" ? `'${param}'` : param;
        where += ` ${key}=${param}`;
      } else {
        consoleError(`column \`${key}\` doesn't exist`);
        throw 0;
      }
    }
  }
  return where;
}

module.exports = class {
  constructor(table, columns) {
    this.table = table;
    this.columns = {};
    for (let i = 0; i < columns.length; i++) {
      let column = columns[i];
      this.columns[column.title] = {
        type: column.type || "number",
        required: column.required || false
      };
    }
    if (this.columns.id) this.columns.id.delete();
    this.create();
  }
  async select(params) {
    if (!params) params = {};

    if (params.limit) params.limit = +params.limit;
    if (params.start) params.start = +params.start;
    if (!params.limit || typeof params.limit != "number") params.limit = 50;
    if (!params.start || typeof params.start != "number") params.start = 0;

    if (!params.order || typeof params.order != "string" || !this.columns[params.order]) params.order = "id";
    if (params.desc == "true") params.desc = true;
    if (params.desc == "false") params.desc = false;
    if ((!params.desc && params.desc !== false) || typeof params.desc != "boolean") params.desc = true;

    let col = "";
    if (!params.columns || params.columns.length == 0) col = "*";
    else {
      col = `id`;
      params.columns.forEach(value => {
        if (this.columns[value]) {
          col += `, ${value}`;
        } else {
          consoleError(`column \`${key}\` doesn't exist`);
          throw 0;
        }
      });
    }

    let where;
    try {
      where = getWhere(params.find, this.columns);
    } catch (err) {
      throw 0;
    }

    const sql = `SELECT ${col} FROM ${this.table} ${where ? where : ``} ORDER BY ${params.order}${params.desc ? " DESC" : ""} OFFSET ${params.start} LIMIT ${params.limit}`;
    try {
      let res = await postgres(sql);
      res = decode(res, this.columns);
      if (this.get && typeof this.get == "function") res = this.get(res);
      return res;
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
  async insert(params) {
    if (this.set && typeof this.set == "function") params = this.set(params);

    let columns = false;
    let values = false;

    params = encode([params], this.columns)[0];

    for (let key in this.columns) {
      if (this.columns[key].required && !params[key]) {
        consoleError(`\`${key}\` is \x1b[31mREQUIRED\x1b[0m to insert to the table \`${this.table}\``);
        throw 0;
      } else {
        if (typeof params[key] == this.columns[key].type) {
          if (columns) {
            columns += ", ";
            values += ", ";
          } else {
            columns = "";
            values = "";
          }
          columns += key;
          values += this.columns[key].type == "string" ? `'${params[key]}'` : params[key];
        } else {
          if (!this.columns[key].required && typeof params[key] == "undefined") {
            continue;
          } else {
            consoleError(`"${typeof params[key]}" is not required type of column \`${key}\``);
            throw 0;
          }
        }
      }
    }

    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING id`;
    try {
      let res = await postgres(sql);
      return res[0];
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
  async remove(params) {
    let where;
    try {
      where = getWhere(params.find, this.columns);
    } catch (err) {
      throw 0;
    }

    const sql = `DELETE FROM ${this.table} ${where ? where : ``} RETURNING id`;
    try {
      let res = await postgres(sql);
      return res;
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
  async truncate() {
    const sql = `TRUNCATE ${this.table}`;
    try {
      let res = await postgres(sql);
      return res;
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
  async update(params) {
    if (this.set && typeof this.set == "function") params.set = this.set(params.set);
    let where;
    try {
      where = getWhere(params.find, this.columns);
    } catch (err) {
      consoleError(`"WHERE" error`);
      throw 0;
    }
    if (!params.set) {
      consoleError(`You should write set parametres`);
      throw 0;
    }

    params.set = encode([params.set], this.columns)[0];
    let set = false;
    for (let key in params.set) {
      if (this.columns[key]) {
        if (this.columns[key].type == typeof params.set[key]) {
          if (set) {
            set += ", ";
          } else set = "";
          set += `${key}=${this.columns[key].type == "string" ? `'${params.set[key]}'` : params.set[key]}`;
        } else {
          consoleError(`"${typeof params.set[key]}" is not required type of column \`${key}\``);
          throw 0;
        }
      } else {
        consoleError(`column \`${key}\` doesn't exist`);
        throw 0;
      }
    }
    const sql = `UPDATE ${this.table} SET ${set} ${where ? where : ``}`;
    try {
      await postgres(sql);
      return 0;
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
  async create() {
    let columns = "";
    for (let key in this.columns) {
      let column = this.columns[key];
      let type;
      if (column.type == "number") type = "integer";
      else if (column.type == "string") type = "text";
      else if (column.type == "boolean") type = "boolean";
      else if (column.type == "json") type = "json";
      else type == "text";
      columns += `${key} ${type}${column.required ? ` NOT NULL` : ``},
            `;
    }

    const sql = `
        CREATE TABLE if not exists public.${this.table}
        (
            id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
            ${columns}CONSTRAINT ${this.table}_pkey PRIMARY KEY (id)
        )`;
    try {
      await postgres(sql);
      return 0;
    } catch (err) {
      consoleError(`\x1b[31merror:\x1b[0m ${err}\n\x1b[34mrequest:\x1b[0m ${sql}`);
      throw 0;
    }
  }
};

function consoleError(err) {
  console.log("\n\x1b[41m", "            === ERROR ===            ", "\x1b[0m");
  console.log(err);
  console.log("\x1b[41m", "            === ERROR ===            ", "\x1b[0m\n");
}
