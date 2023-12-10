const mongoose = require("mongoose");

const Adminschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },

  secret: {
    type: Object,
    default: null,
  },
  temp_secret: {
    type: Object,
    default: null,
  },
  authVerify: {
    type: Boolean,
  },
});

const Admin = mongoose.model("loginadmins", Adminschema);

module.exports = Admin;
