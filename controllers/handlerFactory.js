const catchAsync = require("../errorHandling/catchAsync");
const AppError = require("../errorHandling/AppError");

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const data = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) {
      filter = { creator: req.params.id };
    }

    const data = await Model.find(filter);
    if (!data) return next(new AppError("No data found", 404));
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (popOptions) query.populate(popOptions);
    const data = await query;

    if (!data) return next(new AppError("No data found with that id", 404));
    res.status(200).json({
      message: "success",
      data,
    });
  });
};
const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const filteredBody = filteredObj(req.body, "title", "description");
    if (req.file) filteredBody.photo = req.file.filename;
    const id = req.params.id;
    const element = await Model.findById(id);
    if (parseInt(element.creator[0]) !== parseInt(req.user.id)) {
      return next(
        new AppError("You are not authorized to update this file", 401)
      );
    }

    const data = await Model.findByIdAndUpdate(id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const element = await Model.findById(id);
    if (parseInt(element.creator[0]) !== parseInt(req.user.id)) {
      return next(
        new AppError("You are not authorized to delete this file", 401)
      );
    }
    await Model.findByIdAndRemove(req.params.id);
    res.status(201).json({
      status: "success",
    });
  });
};
