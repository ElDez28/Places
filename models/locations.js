const API_KEY = "AIzaSyC2pT6NSrbP-0Qy6VEaDb3Bm2jd56Tu8HU";

const axios = require("axios");
const AppError = require("../errorHandling/AppError");

exports.getCoordsForAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    address
  )}&inputtype=textquery&fields=geometry&key=${API_KEY}`;

  const response = await axios.get(url);

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new AppError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  const coordinates = data.candidates[0].geometry.location;

  return coordinates;
};
