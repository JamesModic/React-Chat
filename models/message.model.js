// ! Below we are defining the fields that will be in our collection
const { default: mongoose } = require("mongoose");

const MessageSchema = new mongoose.Schema({
  when: String,
  user: String,
  room: String,
  body: String,
});

module.exports = mongoose.model("Message", MessageSchema);
