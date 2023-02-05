const router = require("express").Router();
const Room = require("../models/room.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
// const validateSession = require("../middleware/validate-session")

// ! Endpoint that allows the user to create a room
router.post("/create", validateSession, async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      description: req.body.description,
      addUsers: req.body.addUsers,
    });
    const newRoom = await room.save();
    res.json({ room: newRoom });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

// ! Endpoint that allows the user to see all the rooms that have been created
router.get("/", validateSession, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      rooms: rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ! Endpoint that allows the user to delete a room by its unique id
router.delete("/:id", validateSession, async (req, res) => {
  try {
    const deletedRoom = await Room.deleteOne({
      _id: req.params.id,
    });
    res.json({
      deletedRoom: deletedRoom,
      message:
        deletedRoom.deletedCount > 0
          ? "Room was deleted"
          : "Room was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ! Endpoint that allows the user to update the room by the rooms unique id
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const room = await Room.findOneAndUpdate(filter, update, returnOptions);
    res.json({ message: "Room updated", room: room });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
