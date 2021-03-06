const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const { ROUTES } = require('./constants');
const { helloMiddleware, timeMiddleware } = require('./middlewares');

const app = express();

/**
 * @description middlewares used by express app:
 * - `express.json()` - parses the request's body json->data, if that comes as JSON Data-Type.
 * - morgan - logger middleware
 */
const middlewares =
  process.env.NODE_ENV === 'development'
    ? [express.json(), morgan('dev'), timeMiddleware, helloMiddleware]
    : [express.json()];

app.use(...middlewares);

app.use(express.static(`${__dirname}/public`));

app.use(ROUTES.TOURS, toursRouter);
app.use(ROUTES.USERS, usersRouter);

module.exports = app;
