const express = require("express");
const Routes = express.Router();

const USER = require("../controllers/userController");
const CLIENT = require("../controllers/clientController");
const PROJECT = require("../controllers/projectController");
const MEETING = require("../controllers/meetingController");

// users
Routes.post("/signup", USER.adduser);
Routes.post("/login", USER.authenticate);
Routes.get("/getuser", USER.getUsers);

//clients
Routes.post("/client/signup", CLIENT.addclient);
Routes.delete("/client/delete/:id", CLIENT.removeclient);
Routes.put("/client/update/:id", CLIENT.UpdateClient);
Routes.get("/client/getclients", CLIENT.Getclients);

// Projects
Routes.post("/create/project", PROJECT.addProject);
Routes.get("/projects", PROJECT.getProjects);
Routes.get("/singleproject/:id", PROJECT.getsingleProject);
Routes.put("/update/projects/:id", PROJECT.updateProject);
Routes.delete("/delete/projects/:id", PROJECT.deleteProject);

// Meetings Routes
Routes.post("/create/meeting", MEETING.createmeeting);
Routes.delete("/delete/meeting/:id", MEETING.deletemeeting);
Routes.put("/update/meeting/:id", MEETING.updatemeeting);
Routes.get("/meetings", MEETING.getMeeting);
Routes.get("/single/meeting/:id", MEETING.getSingleMeeting);

module.exports = Routes;
