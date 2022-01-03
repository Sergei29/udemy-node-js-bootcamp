const express = require('express');
const {
  checkID,
  createNewTour,
  deleteTourByID,
  getAllTours,
  getTourByID,
  updateTourByID,
  validateNewData,
} = require('../controllers/toursController');

const toursRouter = express.Router();

toursRouter.param('id', checkID);

toursRouter.route('/').get(getAllTours).post(validateNewData, createNewTour);

toursRouter
  .route('/:id')
  .get(getTourByID)
  .patch(updateTourByID)
  .delete(deleteTourByID);

module.exports = toursRouter;
