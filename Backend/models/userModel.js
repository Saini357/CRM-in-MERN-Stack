const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true, minlength: 10 },
    username: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    logintime: { type: Date, default: Date.now },
    image: { type: String, default: "" },

    role: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
