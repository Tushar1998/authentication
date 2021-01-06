const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

module.export = User;
