const mongoose = require("mongoose");
const catchAsync = require("../errorHandling/catchAsync");
const { getCoordsForAddress } = require("./locations");
const placesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You have to provide title for your place"],
  },
  description: {
    type: String,
    required: [true, "You have to provide a description"],
  },
  address: {
    type: String,
    required: [true, "You have to provide an adress"],
  },
  image: {
    type: String,
  },
  coordinates: [Number],

  creator: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Place must have an author"],
    },
  ],
});

placesSchema.pre("save", async function (next) {
  try {
    const coordinates = await getCoordsForAddress(this.address);

    this.coordinates[0] = coordinates.lat;
    this.coordinates[1] = coordinates.lng;
  } catch (err) {
    next(err);
  }

  next();
});
const Places = mongoose.model("Places", placesSchema);
module.exports = Places;
