const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const lectureSchema = mongoose.Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 1000
  },
  contactInfo: {
    type: String,
    maxlength: 25
  },
  capacity: {
    type: Number
  },
  application: {
    type: Number,
    default: 0
  },
  applicationPeriod: {
    type: Boolean,
    default: true
  },
  filePath: {
    type: String
  }
}, { timestamps: true })

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = { Lecture }
