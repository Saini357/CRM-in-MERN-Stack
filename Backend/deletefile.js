const fs = require("fs").promises;
const ClientModel = require("./models/clientModel");
const ProjectModel = require("./models/projectModel");

async function deleteFile(id) {
  try {
    const client = await ClientModel.findOne({ _id: id });
    const filePath = `./public/images/${client.image}`;
    if (!filePath) {
      console.log("File path not found in client data");
      return;
    }

    await fs.unlink(filePath);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function projectPhoto(id) {
  const photo = await ProjectModel.findOne({ _id: id });
  // console.log(id);
  console.log(photo.image);
  const filePath = `./public/${photo.image}`;

  fs.unlink(filePath);
  // console.log(filePath, "lllll");
}

module.exports = {
  deleteFile,
  projectPhoto,
};
