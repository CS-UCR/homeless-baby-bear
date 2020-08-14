const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const uploadRouter = require('./upload/upload');
const changeRouter = require('./changeDataPage/changeData');
const heatMapRouter = require('./headMapPage/heatMap');
const locationRouter = require('./locationStatPage/locationStat');

require('dotenv/config');

const API_PORT = 4001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/apis/upload', uploadRouter);
app.use('/apis', changeRouter);
app.use('/apis', heatMapRouter);
app.use('/apis', locationRouter);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
