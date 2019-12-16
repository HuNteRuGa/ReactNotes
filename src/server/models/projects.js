const Schema = require("../db/schema.new");

try {
  const schema = new Schema(
    "table",
    {
      title: "id",
      type: "int",
      required: true,
      unique: true,
      primary: true,
      autoincrement: true,
      foreignKey: { table: "asd", columns: ["id"] }
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
    }
  );
} catch (err) {}

module.exports = {};
