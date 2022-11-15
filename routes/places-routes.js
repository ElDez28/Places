const express = require("express");
const authController = require("../auth/authController");
const placesController = require("../controllers/placesController");
const router = express.Router({ mergeParams: true });
const fileUpload = require("../controllers/file-upload");
router
  .route("/")
  .get(placesController.getAllPlaces)
  .post(
    fileUpload.single("image"),
    authController.protect,
    placesController.setUserId,
    placesController.createPlace
  );
router
  .route("/:id")
  .get(placesController.getOnePlace)
  .patch(
    authController.protect,
    placesController.setUserId,
    placesController.updatePlace
  )
  .delete(
    authController.protect,
    placesController.setUserId,
    placesController.deletePlace
  );

module.exports = router;
