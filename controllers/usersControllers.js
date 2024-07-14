const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require('bcryptjs');




const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password').exec();

    return res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await User.findById(id).select('-password').exec();

    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    return res.status(404).json({
      success: false,
      message: `user id '${id}' not found`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for user id",
    });
  }
};





const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id).select('-password').exec();
    if (!deleted) throw new Error();
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} not found` });
  }
};

const updateUser = async (req, res) => {
  const { error, value } = schemas.updateUser.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  const { id } = req.params;

  try {
    const updated = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `user id ${id} was not found.` });

    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} was not found.` });
  }
};




const toggleIsBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: `User id ${id} not found` });
    }

    user.isBusiness = !user.isBusiness;
    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};








module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  toggleIsBusiness,
};
