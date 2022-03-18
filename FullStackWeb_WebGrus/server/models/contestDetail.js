const mongoose = require("mongoose");

const contestDetailSchema = new mongoose.Schema({
  contestid: String, // 공모전 글 아이디
  title: String,
  description: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contestdetails", contestDetailSchema);
