const mongoose = require("mongoose");
require("dotenv").config();

const db =
  "mongodb+srv://rahulohol:rahulohol@cluster0.qyig40b.mongodb.net/authusers?retryWrites=true&w=majority";

const connection = mongoose.connect(process.env.mongo_url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = { connection };
