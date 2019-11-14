// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema({
  id: Number,
  picture: {
    type: String,
    require: true,
    get: v => `${root}${v}`
  },
  raw_address:{
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  accuracy: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("new_Data", DataSchema);