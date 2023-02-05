// ! Defining our variables to allows us to connect our files

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/users.controller");
const roomController = require("./controllers/room.controller");
const messageController = require("./controllers/message.controller");
const validateSession = require("../reactChat-mongodb/middleware/validate-session");

// ! connecting to the database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const db = mongoose.connection;
//mongoose.connect("mongodb://127.0.0.1:27017/reactChat-mongodb");
mongoose.connect(process.env.DATABASEURL);
db.once("open", () => console.log("Connected to the DB"));

// ! Creeating path for the endpoints to be used in postman
app.use(express.json());
app.use(cors());
app.use("/user", userController);
app.use("/message", messageController);
app.use("/room", roomController);

// ! shows us that we are succesfully connected to the port
app.listen(process.env.PORT, function () {
  console.log(`React Chat App is listening on port ${process.env.PORT}`);
});
