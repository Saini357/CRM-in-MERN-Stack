const Meeting = require("../models/meetingModel");
const { Validator } = require("node-input-validator");

const createmeeting = async (req, res) => {
  try {
    const newMeetingData = {
      name: req.body.name,
      email: req.body.email,
      clientname: req.body.clientname,
      date: new Date(req.body.date),
      time: req.body.time,
      status: req.body.status,
      subject: req.body.subject,
    };

    const v = new Validator(req.body, {
      name: "required|alpha",
      email: "required|email",
      clientname: "required|alpha",
      date: "required",
      status: "required",
      subject: "required",
      time: "required",
    });

    const isValid = await v.check();
    if (!isValid) {
      return res.status(400).json({ errors: v.errors });
    }

    const existingMeeting = await Meeting.findOne({
      $or: [
        { subject: newMeetingData.subject },
        { clientname: newMeetingData.clientname },
      ],
    });

    if (existingMeeting) {
      return res.status(409).json({
        message: "A meeting with this subject or client already exists.",
      });
    }

    const createdMeeting = await Meeting.create(newMeetingData);

    res.status(201).json(createdMeeting);
  } catch (err) {
    console.error("Error in creating meeting:", err);
    res
      .status(500)
      .json({ error: "Failed to create meeting.", details: err.message });
  }
};

const updatemeeting = async (req, res) => {
  try {
    const id = req.params.id;

    const updateMeetingData = {
      name: req.body.name,
      email: req.body.email,
      clientname: req.body.clientname,
      date: new Date(req.body.date),
      status: req.body.status,
      time: req.body.time,
      subject: req.body.subject,
    };

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      updateMeetingData,
      {
        new: true,
      }
    );

    if (!updatedMeeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found." });
    }

    res.status(200).json({ success: true, result: updatedMeeting });
  } catch (error) {
    console.error("Error in updating meeting:", error);
    res.status(500).json({
      success: false,
      message: "Error in updating meeting.",
      error: error.message,
    });
  }
};

const getMeeting = async (req, res) => {
  try {
    const allmeetings = await Meeting.find();
    res.status(200).json({ message: true, result: allmeetings });
  } catch (error) {
    console.error("Error in getting meetings:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error!", error: error.message });
  }
};

const deletemeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res
      .status(200)
      .json({ message: "successfully deleted", Result: deletedMeeting });
  } catch (error) {
    console.error("Error in deleting meeting:", error);
    res
      .status(500)
      .json({ message: "Error in deleting meeting.", error: error.message });
  }
};

const getSingleMeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "No meeting found with the provided ID",
      });
    }

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    console.error("Error in fetching single meeting:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};
module.exports = {
  createmeeting,
  deletemeeting,
  updatemeeting,
  getMeeting,
  getSingleMeeting,
};
