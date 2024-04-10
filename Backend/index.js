const express = require("express");
const app = express();
const connection = require("./connection");
const router = require("./routes/userRoutes");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 1212;

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(router);
connection();

app.listen(PORT, () => {
  console.log("Server is Ported at 1212");
});
