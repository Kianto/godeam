const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema User
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    require: false
  },
  address: {
    type: String,
    require: false
  },
  
  isBlock: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'users', versionKey: false });

module.exports = User = mongoose.model("users", UserSchema);
