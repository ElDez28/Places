const User = require("../models/userModel");
const factory = require("../controllers/handlerFactory");

exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getOneUser = factory.getOne(User, { path: "places" });
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
