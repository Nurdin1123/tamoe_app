var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventRouter = require("./routes/event");
var templateRouter = require("./routes/template");
var homeRouter = require("./routes/home");
var transactionRouter = require("./routes/transaction");
var dashboardRouter = require("./routes/dashboard");
var manage_guestsRouter = require("./routes/manage_guests");
var edit_themeRouter = require("./routes/edit_theme");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/event", eventRouter);
app.use("/template", templateRouter);
app.use("/home", homeRouter);
app.use("/transaction", transactionRouter);
app.use("/dashboard", dashboardRouter);
app.use("/manage_guests", manage_guestsRouter);
app.use("/edit_theme", edit_themeRouter);



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
