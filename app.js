const express = require("express");
const AppError = require("./errorHandling/AppError");
const usersRoutes = require("./routes/users-routes");
const placesRoutes = require("./routes/places-routes");
const fs = require("fs");
const cors = require("cors");
const authController = require("./auth/authController");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/places", placesRoutes);
app.use((req, res, next) => {
  next(new AppError("This route does not exist", 404));
});
app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {
      console.log(err);
    });
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
});
module.exports = app;
