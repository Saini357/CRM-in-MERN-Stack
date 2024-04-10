const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    type: {
      type: String,
    },

    status: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // ye collectionka name hai
    },
    technology: {
      type: String,
    },

    description: {
      type: String,
    },

    developersId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
