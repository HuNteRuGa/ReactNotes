const accounts = require("../models/accounts");

module.exports = async (req, res, next) => {
  const func = req.params.func;
  if (func && accounts[func]) {
    try {
      accounts.func(req);
    } catch (err) {
      switch (err) {
        case 0:
          res.send({ res: "false" });
        default:
          res.sendStatus(400);
      }
    }
  } else res.sendStatus(400);
};
