module.exports = {
  initValidator: {
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
  }
};
