const router = require("express").Router();
const Message = require("../models/message.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

// ! Enpoindt that allows user to create a new message
router.post("/create", validateSession, async (req, res) => {
  try {
    const message = new Message({
      when: req.body.when,
      user: req.body.user,
      room: req.body.room,
      body: req.body.room,
    });
    const newMessage = await message.save();
    res.status(200).json({
      message: newMessage,
      message: "Your message has been added",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Endpoint that allows the user to viewall the messages within a room endpoint
router.get("/view-all", validateSession, async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ messages: messages, message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ! Endpoint that allows the user to update a message within a room endpoint
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const message = await Message.findByIdAndUpdate(
      filter,
      update,
      returnOptions
    );

    res.json({
      message: message ? "Message updated" : "Message was not updated",
      message: message ? message : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ! Endpoint that allows the user to delete a message within a room endpoint
router.delete("/:id", validateSession, async (req, res) => {
  try {
    const messageRecord = await Message.findById(req.params.id);

    if (!messageRecord) throw new Error("Record Does Not Exist");

    const deletedMessage = await Message.deleteOne({ _id: req.params.id });
    res.json({
      deletedMessage: deletedMessage,
      message:
        deletedMessage.deletedCount > 0
          ? "Message was deleted"
          : "Message was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
