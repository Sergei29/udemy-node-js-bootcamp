const express = require('express');
const {
  createNewTour,
  deleteTourByID,
  getAllTours,
  getTourByID,
  updateTourByID,
} = require('../controllers/toursController');

const toursRouter = express.Router();

toursRouter.route('/').get(getAllTours).post(createNewTour);
toursRouter
  .route('/:id')
  .get(getTourByID)
  .patch(updateTourByID)
  .delete(deleteTourByID);

module.exports = toursRouter;
