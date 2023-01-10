const mongoose = require("mongoose");
const shortId = require("shortid");

const schema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: () => shortId(),
  },
});

module.exports = mongoose.model("ShortenUrl", schema);
