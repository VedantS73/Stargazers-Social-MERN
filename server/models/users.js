const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
