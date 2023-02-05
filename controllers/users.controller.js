const router = require("express").Router();
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ! Endpoint to create a user
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({
      user: newUser,
      message: "Success: User Created",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Endpoint that allowes the user to login with email and password
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      throw new Error("Passwords Do Not Match");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({ user: user, message: "Success", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Endpoint that allows the user to be updated (not fully functional yet)
router.patch("/update/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
    const returnOptions = { new: true };
    const user = await User.findByIdAndUpdate(filter, update, returnOptions);

    res.json({
      message: message ? "User updated" : "User was not updated",
      user: user ? user : {},
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ! Endpoint that allows the user to be deleted by the id
router.delete("/:id", async (req, res) => {
  try {
    const userRecord = await User.findById(req.params.id);

    if (!userRecord) throw new Error("Record Does Not Exist");

    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.json({
      deletedUser: deletedUser,
      message:
        deletedUser.deletedCount > 0
          ? "User was deleted"
          : "User was not deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
