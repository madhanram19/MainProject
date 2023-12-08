const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      default: null// add custom validation if needed
    },
    DOB: {
      type: String, // add custom validation if needed
      default: null
    },
    profileImg: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    zipCode: {
      type: Number,
      default: null
    },
    otp: {
      code: {
        type: String
      }
    },
    temp_secret: {
      type: Object,
      default: null
    },
    secret: {
      type: Object,
      default: null
    },
    twoFactorAuth: {
      type: Boolean,
      default: false
    },
    

  },

  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

