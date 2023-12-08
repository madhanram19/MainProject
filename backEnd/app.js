var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var postman = require("./postman");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var updateRouter = require("./routes/update");
// var kycRouter = require("./routes/upload");
// var admin = require("./routes/adminroute")
const dbConnect = require("./config/dbConnect"); // Adjust the path as needed
const {
  getTwoFactorAuthentication,
  verifyTwoFactorAuthentication,
  disableTwoFactorAuthentication,
} = require("./routes/twoFactorAuth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users/upload/kyc", kycRouter);
app.use("/user", usersRouter);
app.use("/login", loginRouter);
app.use("/update", updateRouter);
app.use("/postman", postman);
// app.use("/admin", admin);
app.post("/user/twoFactorAuth/getSecertKey", getTwoFactorAuthentication);
app.post("/user/twoFactorAuth/verifySecret", verifyTwoFactorAuthentication);
app.post("/user/twoFactorAuth/disableAuthCode", disableTwoFactorAuthentication);
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
