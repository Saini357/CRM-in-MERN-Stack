const ClientModel = require("../models/clientModel");
const helper = require("../fileupload");
const deletehelper = require("../deletefile");

const createClient = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      try {
        const file = req.files.image;
        const image = await helper.upload(file, "images");
        console.log(image);
      } catch (error) {
        console.log(error, "error in upload client  image");
      }
    }
    const client = {
      name: req.body.name,
      email: req.body.email,
      image: req.files.image.name,
      description: req.body.description,
      // createdBy: req.body.createdBy,
    };

    const existingClient = await ClientModel.findOne({
      $or: [{ email: client.email }, { name: client.name }],
    });

    if (existingClient) {
      res.status(400).json({ Message: "Client is Already Added" });
    } else {
      await ClientModel.create(client);
      res.status(200).json({
        message: true,
        client: client,
      });
    }
  } catch (error) {
    console.log(error, "error in client");
    res.status(400).json({ success: false, Error: error });
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;

    await deletehelper.deleteFile(id);
    const result = await ClientModel.findByIdAndDelete({ _id: id });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateClient = async (req, res) => {
  const id = req.params.id;
  const { name, email, description, createdBy } = req.body;
  const updateImage = req.files && req.files.image;

  try {
    if (updateImage) {
      const Image = await helper.upload(updateImage, "images");
    }

    const imageName = req.files.image.name;
    const updatedClient = await ClientModel.findByIdAndUpdate(id, {
      $set: { name, email, description, createdBy, image: imageName },
    });

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client updated successfully", updatedClient });
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getClients = async (req, res) => {
  try {
    let clients = await ClientModel.find();
    res.status(200).json({ clients });
  } catch (error) {
    res.status(400).json({ message: "error in get clients", Error: error });
  }
};

module.exports = {
  addclient: createClient,
  removeclient: deleteClient,
  UpdateClient: updateClient,
  Getclients: getClients,
};
