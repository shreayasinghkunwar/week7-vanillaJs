var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Paints";
const mongoose = require("mongoose");

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;


module.exports = { connection }