const accounts = require("../models/accounts");

module.exports = async (req, res, next) => {
  const func = req.params.func;
  if (func && accounts[func]) {
    try {
      const response = await accounts[func](req);
      //console.log(response);
      res.send({ res: response || false });
    } catch (err) {
      console.log(err);
      if (err == 0) {
        res.sendStatus(400);
      } else {
        res.send({ res: false, code: err });
      }
    }
  } else res.sendStatus(400);
};
