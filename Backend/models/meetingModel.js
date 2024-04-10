const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    clientname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    status: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
