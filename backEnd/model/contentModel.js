const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    editorData: {
      type: String,
    },
  },
  {
    collection: "editor",
  }
);

const Contents = mongoose.model("Contents", contentSchema);

module.exports = Contents;
