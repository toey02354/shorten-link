require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ShortenUrl = require("./model/ShortenUrl");

const app = express();
const PORT = 4000;
const MG_CONNECTION = process.env.MG_CONNECTION;
const connectionString = MG_CONNECTION;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('./frontend/dist'))

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const { fullUrl } = await ShortenUrl.findOne({
      shortUrl: req.params.shortUrl,
    });
    res.send(fullUrl);
  } catch (error) {
    res.send("no url");
  }
});

app.post("/shorten", async (req, res) => {
  try {
    const { shortUrl } = await ShortenUrl.create({ fullUrl: req.body.fullUrl });
    res.send(shortUrl);
  } catch (error) {
    res.send("");
  }
  //   res.send(JSON.stringify(req.body));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
