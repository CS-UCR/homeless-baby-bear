const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const router = express.Router();
//const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());
//app.use(cors());

const postsRoute = require('./routes/posts');
app.use(express.static(__dirname + '/front-end'));
app.use('/', postsRoute);

app.use('/', router);


mongoose.connect(
    process.env.DB_CONNECTION,
    {useUnifiedTopology: true,useNewUrlParser: true } ,() => 
    console.log('connect to DB!')
);

app.listen(3000);