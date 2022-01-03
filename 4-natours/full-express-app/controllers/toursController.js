const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  }
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
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    { encoding: 'utf-8' },
    (error) => {
      if (!!error) {
        return res.status(500).json({
          status: 'fail',
          message: 'Server failed to write new data',
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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

  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    { encoding: 'utf-8' },
    (error) => {
      if (!!error) {
        return res.status(500).json({
          status: 'fail',
          message: 'Server failed to write new data',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const deleteTourByID = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundTour = tours.find((currentTour) => currentTour.id === id);

  if (!foundTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'tour not found',
    });
  }

  const newTours = tours.filter((currentTour) => currentTour.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    { encoding: 'utf-8' },
    (error) => {
      if (!!error) {
        return res.status(500).json({
          status: 'fail',
          message: 'Server failed to write new data',
        });
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

module.exports = {
  createNewTour,
  deleteTourByID,
  getAllTours,
  getTourByID,
  updateTourByID,
};
