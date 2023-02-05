// ! Below we are defining the fields that will be in our collection
const { default: mongoose } = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  addUsers: String,
});

module.exports = mongoose.model("Room", RoomSchema);
