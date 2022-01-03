const express = require('express');
const {
  createNewUser,
  deleteUserByID,
  getAllUsers,
  getUserByID,
  updateUserByID,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.route('/').get(getAllUsers).post(createNewUser);
usersRouter
  .route('/:id')
  .get(getUserByID)
  .patch(updateUserByID)
  .delete(deleteUserByID);

module.exports = usersRouter;
