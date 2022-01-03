const fs = require('fs');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is still under construction.',
  });
};
const createNewUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is still under construction.',
  });
};
const getUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is still under construction.',
  });
};
const updateUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is still under construction.',
  });
};
const deleteUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is still under construction.',
  });
};

module.exports = {
  createNewUser,
  deleteUserByID,
  getAllUsers,
  getUserByID,
  updateUserByID,
};
