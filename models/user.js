const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlenght: 5 },
});

module.exports = User = mongoose.model("user", userSchema);
