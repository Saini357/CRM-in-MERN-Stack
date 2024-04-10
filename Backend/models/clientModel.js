const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String, default: "" },
    description: { type: String, required: true },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
