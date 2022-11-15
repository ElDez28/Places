const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../auth/authController");
const placesRouter = require("./places-routes");
const fileUpload = require("../controllers/file-upload");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "public" });
router.use("/:id/places", placesRouter);
router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.restrictTo("admin"), userController.createUser);

router.route("/signup").post(fileUpload.single("image"), authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

// router.use(authController.protect, authController.restrictTo("admin"));
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
