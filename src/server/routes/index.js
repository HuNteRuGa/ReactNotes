const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const accounts = require("../controllers/accounts");

router.all("*", (req, res, next) => {
  if (req.headers.host.substr(0, 4) == "api.") req.url = `/api${req.url}`;
  next();
});
router.get("/", main);
router.post("/api/accounts/:func", accounts);

module.exports = router;
