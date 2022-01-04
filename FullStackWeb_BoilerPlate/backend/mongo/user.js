const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

// var Schema = mongoose.Schema;
var UserSchema = mongoose.Schema({
  Name: {
    type: String,
    maxlength: 15
  },
  Email: {
    type: String,
    trim: true,
    uniqe: 1
  },
  Password: {
    type: String,
    maxlength: 15
  },
  Authority: {
    type: Number,
    default: 0
  },
  Image: {
    type: String
  },
  Token: {
    type: String
  },
  TokenExp: {
    type: Number
  }
});

UserSchema.pre('save', function(next){
  var user = this;
  if (user.isModified('Password')) {
    bcrypt.getSalt(saltRounds, function(err, salt){
      if (err) { return next(err) }
      bcrypt.hash(user.Password, salt, function(err, hsash){
        if (err) { return next(err) }
        user.Password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

UserSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.Password, function(err, isMatch) {
    if (err) { return cb(err) }
    return cb(null, isMatch)
  })
}

UserSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.Token = token;
  user.save((err, user) => {
    if (err) { return cb(err) }
    return cb(null, user)
  })
}

UserSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "Token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
module.exports = mongoose.model('UserDB', UserSchema);
