const fs = require('fs');

const toursPathToFile = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursPathToFile));

const saveTours = (newTours, res, responseData, statusCode = 200) =>
  fs.writeFile(
    toursPathToFile,
    JSON.stringify(newTours),
    { encoding: 'utf-8' },
    (error) => {
      if (!!error) {
        return res.status(500).json({
          status: 'fail',
          message: 'Server failed to write new data',
        });
      }

      res.status(statusCode).json({
        status: 'success',
        data: {
          tour: responseData,
        },
      });
    }
  );

/**
 * @description passed as a middleware to `router.param()` function, checks if `id` is present in URL params
 * @param {Object} req request action object
 * @param {Object} res response action object
 * @param {Function} next proceed to next middleware func
 * @param {String} value the `id` param value
 * @returns {undefined}
 */
const checkID = (req, res, next, value) => {
  const id = parseInt(value, 10);
  const tour = tours.find((objTour) => objTour.id === id);
  if (!tour) {
    // important to have a return statement here, so when the next() is called - there should not be any continuation. (midleware next() explained watch: https://www.youtube.com/watch?v=lY6icfhap2o )
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  }
  next();
};

const validateNewData = (req, res, next) => {
  const bHasRequiredFields = !!req.body.name && !!req.body.price;
  if (!bHasRequiredFields) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'tour data not valid 💥' });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTourByID = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = tours.find((objTour) => objTour.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  const newTours = [...tours, newTour];
  saveTours(newTours, res, newTour, 201);
};

const updateTourByID = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let newTour;

  const newTours = tours.map((objCurent) => {
    if (objCurent.id === id) {
      newTour = { ...objCurent, ...req.body };
      return newTour;
    }
    return objCurent;
  });
  saveTours(newTours, res, newTour);
};

const deleteTourByID = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const newTours = tours.filter((currentTour) => currentTour.id !== id);

  saveTours(newTours, res, null, 204);
};

module.exports = {
  checkID,
  createNewTour,
  deleteTourByID,
  getAllTours,
  getTourByID,
  updateTourByID,
  validateNewData,
};
