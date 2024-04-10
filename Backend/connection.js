const mongoose = require("mongoose");

async function Connection() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12345@ram0.qjhi0ml.mongodb.net/webcrm?retryWrites=true&w=majority"
    );
    console.log("connection successful");
  } catch (error) {
    console.log(`Error in Connection ${error}`);
  }
}

module.exports = Connection;
