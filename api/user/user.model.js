const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// const { sault } = require('../config');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true, unique: true },
  token: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ['Verified', 'Created'],
    default: 'Created',
  },
  verificationToken: { type: String, required: false },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false },
});
userSchema.static('updateUser', async function (id, updateParams) {
  const user = await this.findById(id);
  if (!user) throw new Error('User not found');

  Object.keys(updateParams).forEach(name => {
    user[name] = updateParams[name];
  });

  return user.save();
});

userSchema.static('initUserFromGoogle', async function (email, name, googleId) {
  const user = await this.findOne({ googleId });

  if (user) return user;

  return new this({
    email,
    name: name.replace(/\s/gim, '_').toLowerCase(),
    googleId,
  });
});

userSchema.static('findByVerificationToken', async function (
  verificationToken,
) {
  return this.findOne({
    verificationToken,
  });
});

userSchema.static('verifyUser', async function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      status: 'Verified',
      verificationToken: null,
    },
    {
      new: true,
    },
  );
});

// userSchema.pre("save", async function(next) {
//   if (!this.isNew) {
//     return next();
//   }

//   if (this.password) {
//     this.password = await bcrypt.hash(this.password, sault);
//   }

//   return next();
// });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
