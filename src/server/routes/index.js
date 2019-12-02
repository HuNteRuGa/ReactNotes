const express = require("express");
const router = express.Router();

const main = require("../controllers/main");

router.all("*", (req, res, next) => {
  if (req.headers.host.substr(0, 4) == "api.") req.url = `/api${req.url}`;
  next();
});
router.get("/", main);

module.exports = router;
