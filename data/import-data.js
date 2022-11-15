const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successfull"));
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
