const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user"
  },
  password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

//Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
})

module.exports = mongoose.model("User", UserSchema);
