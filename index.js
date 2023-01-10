require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ShortenUrl = require("./model/ShortenUrl");

const app = express();
const PORT = 4000;
const MG_CONNECTION = process.env.MG_CONNECTION;
const connectionString = MG_CONNECTION;

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./frontend/dist"));

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
    res.status(301).redirect(fullUrl);
    res.send(fullUrl);
  } catch (error) {
    res.send("no url was found");
  }
});

app.post("/shorten", async (req, res) => {
  const fullUrl = eq.body.fullUrl;
  const { shortUrl } = await ShortenUrl.findOne({ fullUrl });
  if (shortUrl) res.send(shortUrl);
  try {
    const { shortUrl } = await ShortenUrl.create({ fullUrl });
    res.send(shortUrl);
  } catch (error) {
    console.log(error);
    res.send("invalid url");
  }
  //   res.send(JSON.stringify(req.body));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
