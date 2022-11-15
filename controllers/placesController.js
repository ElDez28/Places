const factory = require("../controllers/handlerFactory");
const Places = require("../models/placesModel");
exports.setUserId = (req, res, next) => {
  if (!req.body.creator) req.body.creator = req.user.id;
  next();
};
exports.getAllPlaces = factory.getAll(Places);
exports.getOnePlace = factory.getOne(Places);
exports.updatePlace = factory.updateOne(Places);
exports.deletePlace = factory.deleteOne(Places);
exports.createPlace = factory.createOne(Places);
