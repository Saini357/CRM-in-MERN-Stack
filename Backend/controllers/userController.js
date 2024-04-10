const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Validator } = require("node-input-validator");
const helper = require("../fileupload");

const signUp = async (req, res) => {
  try {
    const v = new Validator(req.body, {
      name: "required|minLength:5",
      role: "required",
      number: "required|minLength:10",
      email: "required|email",
      username: "required",
      password: "required|minLength:5",
    });

    const isValid = await v.check();
    if (!isValid) {
      return res.status(400).json({ errors: v.errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    let image;

    if (req.files && req.files.image) {
      try {
        const file = req.files.image;
        console.log(file, "sd");
        image = await helper.upload(file, "images");
      } catch (uploadError) {
        console.error("Error in image upload", uploadError);
        return res.status(500).json({ message: "Error in image upload" });
      }
    }
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      image: image,
      username: req.body.username,
      number: req.body.number,
      role: req.body.role,
    };

    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { number: user.number }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User is already registered" });
    } else {
      const result = await User.create(user);
      return res
        .status(201)
        .json({ message: "User created successfully", result });
    }
  } catch (error) {
    console.error("Error in signUp", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password Credentials" });
    }
    const security_key = "S@iniPRince@%&*";
    const token = await jwt.sign({ _id: user._id.toString() }, security_key, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, user: user, token: token });
  } catch (error) {
    console.error("Error in login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("errors in fetching users", error);
  }
};

module.exports = {
  adduser: signUp,
  authenticate: login,
  getUsers: getUser,
};
