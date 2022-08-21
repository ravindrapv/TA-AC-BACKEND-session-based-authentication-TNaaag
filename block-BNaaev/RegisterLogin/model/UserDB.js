var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    name: { type: String, requerd: true },
    email: { type: String, requerd: true },
    password: { type: String, minlength: 5, maxlength: 8, required: true },
    phone:Number,
    age:Number
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

var User = mongoose.model("User", userSchema);
module.exports = User;
