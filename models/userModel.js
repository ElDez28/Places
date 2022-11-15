const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail");
const Places = require("./placesModel");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "You must provide username"],
      unique: [true, "This username is not available"],
      trim: true,
      minlength: [3, "Name must be longer then 3 charachters"],
    },
    email: {
      type: String,
      required: true,
      validator: [isEmail, "Provide a valid email"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be longer then 7 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          this.password === el;
        },
        message: "Passwords do not match!",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("places", {
  ref: "Places",
  foreignField: "creator",
  localField: "_id",
});
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "places",
  });
  next();
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  correctPassword
) {
  return await bcrypt.compare(candidatePassword, correctPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
