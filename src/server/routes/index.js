const express = require("express");
const router = express.Router();

const main = require("../controllers/main");
const accounts = require("../controllers/accounts");
const projects = require("../controllers/peojects");

router.all("*", (req, res, next) => {
  if (req.headers.host.substr(0, 4) == "api.") req.url = `/api${req.url}`;
  next();
});
router.post("*", (req, res, next) => {
  console.log(`\nbody:\n`, req.body, `\n`);
  next();
});
router.post("/api/accounts/:func", accounts);
router.get("/api/accounts/:func", accounts);
router.post("/api/projects/:func", projects);
router.get("/api/projects/:func", projects);
router.get("*", main);

module.exports = router;
