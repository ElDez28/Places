const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./models/userModel");

dotenv.config({ path: `./config.env` });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB successfully connected");
  });

const server = app.listen("5000", () => {
  console.log("Server running on port 5000");
});
