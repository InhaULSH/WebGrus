const mongoose = require("mongoose");

const notionSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notions", notionSchema);
