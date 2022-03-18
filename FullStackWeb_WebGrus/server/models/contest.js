const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  id: String,
  src: String, // 공모전의 사진이 저장된 경로
  title: String,
  description: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contests", contestSchema);
