const Project = require("../models/projectModel");
const helper = require("../fileupload");
const deleteHelper = require("../deletefile");

const createProject = async (req, res) => {
  try {
    const {
      name,
      type,
      status,
      clientId,
      technology,
      description,
      developersId,
    } = req.body;

    let developers = req.body.developersId;
    if (typeof developers === "string") {
      try {
        developers = JSON.parse(developers);
      } catch (err) {
        console.error("Error parsing developersId string:", err);
        return res.status(400).json({
          success: false,
          message: "Invalid developersId format",
          error: err.message,
        });
      }
    }

    console.log(developersId);
    const file = req.files && req.files.image;
    let image;
    if (file) {
      try {
        image = await helper.upload(file, "images");
        console.log("Image uploaded successfully");
      } catch (err) {
        console.error("Error in image uploading", err);

        return res.status(500).json({
          success: false,
          message: "Failed to upload the image",
          error: err.message,
        });
      }
    }

    let project = await Project.create({
      name,
      type,
      status,
      clientId,
      technology,
      description,
      developersId: developers,
      image,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, status, clientId, technology, description } = req.body;

    let developers = req.body.developersId;
    developers =
      typeof developers === "string"
        ? JSON.parse(developers)
        : req.body.developers;

    const file = req.file && req.file.image;
    let image;

    if (file) {
      try {
        image = await helper.upload(file, "images");
        console.log("Image uploaded successfully");
      } catch (err) {
        console.error("Error in image uploading", err);
        return res.status(500).json({
          success: false,
          message: "Failed to upload the image",
          error: err.message,
        });
      }
    }

    const updatedProject = {
      name,
      type,
      status,
      clientId,
      developers,
      technology,
      description,
      image,
    };

    const project = await Project.findByIdAndUpdate(id, updatedProject, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({
      success: false,
      message: "Invalid request.",
      error: error.message,
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("clientId")
      .populate("developersId");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteHelper.projectPhoto(id);

    const deletedProject = await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      deletedProject: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};
const getsingleProject = async (req, res) => {
  const id = req.params.id;
  try {
    const singleProject = await Project.findById(id)
      .populate("clientId")
      .populate("developersId");
    if (!singleProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(singleProject);
  } catch (error) {
    console.log(`Error getting the single project: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProject: createProject,
  updateProject,
  getProjects,
  deleteProject,
  getsingleProject,
};
