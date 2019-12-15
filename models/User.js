const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  tempPassword: {
    type: String,
    default: '',
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

UserSchema.pre('save', function (next) {
  User.findByEmail(this.email).then(user => {
    if (!user) {
      let salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
    this.updateAt = Date.now(); 
    next();
  });
});

UserSchema
.statics
.findByEmail = function (email) {
  return User.findOne({ email: email });  
};

/* This method is to check if the password is match to this user */
UserSchema
.methods
.validPassword = function (password) {
  if (this.tempPassword !== '') {
    console.log(`LOG: compare password ${password} and hash ${this.tempPassword}`);
    if (bcrypt.compareSync(password, this.tempPassword)) {
      this.tempPassword = '';
      this.save();
      return true;
    }
  }
  console.log(`LOG: compare password ${password} and hash ${this.password}`);
  return bcrypt.compareSync(password, this.password);
}

/* This method is hash password */
UserSchema
.methods
.setPassword = function (password) {
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
}

/* This method is to generate a random 2nd password for forgotpassword issue */
UserSchema
.methods
.genTempPassword = function (password) {
  let tempPass = Math.random().toString(36).substring(3);
  console.log(tempPass);

  let salt = bcrypt.genSaltSync(10);
  this.tempPassword = bcrypt.hashSync(tempPass, salt);
  this.save();

  return tempPass;
}

module.exports = User = mongoose.model("users", UserSchema);
