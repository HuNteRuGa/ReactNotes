const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const config = require("./config/");

const app = express();
app.use(cookieParser()); //Подключаю Cookie parser для работы с куки

app.engine("ejs", require("ejs-locals"));
app.set("views", path.join(__dirname, "../dist/public/"));
app.set("view engine", "ejs"); //Движок для загрузки .ejs

morgan.token("api", function(req, res) {
  if (
    req.headers.host.substr(0, 4) == "api." ||
    req.url.substr(0, 5) == "/api/"
  )
    return "\x1b[41mAPI\x1b[0m";
  else return "\x1b[43m\x1b[30mPAGE\x1b[0m";
});
morgan.token("url", function(req, res) {
  return req.url;
});

app.use(morgan(":api :method \x1b[42m\x1b[30mURL::url\x1b[0m"));
//app.use(morgan(':api :method URL::url :response-time ms'));

app.use(cors());

app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); //Подключаю Body parser-ы для получения POST запросов

app.use(require("./routes"));

app.use((req, res, next) => {
  // res.render("404");
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  //console.dir(err);
  console.log(err.stack);
  res.sendStatus(500);
  // res.render("500");
});

if (!module.parent) {
  app.listen(config.port, "0.0.0.0");
}
// module.exports = app;
