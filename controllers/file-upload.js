const multer = require("multer");
const { v1: uuid } = require("uuid");
const TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = TYPE[file.mimetype];
      cb(null, uuid() + "." + ext);
      //Setting the storage
    },
  }),
  // validation
  fileFilter: (req, file, cb) => {
    const isValid = !!TYPE[file.mimetype]; // znaci ako je undefined pretvorice ga u false a ako nije onda ce ga pretvoriti u true
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
