const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');
require('dotenv/config');

const dbRoute = process.env.DB_CONNECTION;

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// this will be our data base's data structure
const DataSchema = mongoose.Schema({
    id: Number,
    picture: {
        type: String,
        require: true,
        get: (v) => `${root}${v}`,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
        require: true,
    },
    accuracy: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    lat: {
        type: Double,
    },
    lng: {
        type: Double,
    },
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('pictureSchema', DataSchema);
