const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const config = require('../config');

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
  fileUrl:  { type:String}
});

userSchema.pre('save',function (next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(config.SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      email: ret.email,
      isAdmin: ret.isAdmin,
      fileUrl: ret.fileUrl
    }
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);