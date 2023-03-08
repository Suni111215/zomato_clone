var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = 3003;
var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
//const mongouri = "mongodb://0.0.0.0:27017/assignment6";
const mongouri =
// "mongodb://0.0.0.0:27017/zomato1";
"mongodb://sunitaR:krishang@ac-pivg9it-shard-00-00.qsrpstb.mongodb.net:27017,ac-pivg9it-shard-00-01.qsrpstb.mongodb.net:27017,ac-pivg9it-shard-00-02.qsrpstb.mongodb.net:27017/zomato?ssl=true&replicaSet=atlas-cjofdc-shard-0&authSource=admin&retryWrites=true&w=majority"

// "mongodb+srv://sunitaR:rgk@1122@cluster0.qsrpstb.mongodb.net/zomato";
 
const cors = require("cors");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
mongoose
  .connect(mongouri)
  .then(() => {
    console.log("db connected successfully");
    app.listen(port, () => {
      console.log("server is started at", port);
    });
  })
  .catch((error) => {
    console.log("unable to connect-", error);
  });
