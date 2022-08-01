const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //shortcut for created-updated dates
);

module.exports = mongoose.model("Category", categorySchema);
