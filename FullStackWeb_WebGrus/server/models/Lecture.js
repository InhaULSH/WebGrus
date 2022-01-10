const mongoose = require('mongoose');

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
  applicationPeriod: {
    type: Boolean,
    default: true
  },
  filePath: {
    type: String
  }
}, { timestamps: true })

lectureSchema.method.autoApplicationPeriod = function() {
  var lecture = this;
  if (lecture.capacity === lecture.applicants) {
    lecture.applicationPeriod = false;
  } else {
    lecture.applicationPeriod = true;
  }
  lecture.save()
}

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = { Lecture }
