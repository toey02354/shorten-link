require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ShortenUrl = require("./model/ShortenUrl");

const app = express();
const PORT = 4000;
const MG_CONNECTION = process.env.MG_CONNECTION;

app.use(cors({ methods: ["GET", "POST"] }));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./frontend/dist"));

mongoose.connect(MG_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(shortUrl);
  try {
    const { fullUrl } = await ShortenUrl.findOne({
      shortUrl,
    });
    return res.redirect(301, fullUrl);
  } catch (error) {
    console.log(error);
    return res.send("no url was found");
  }
});

app.post("/api/shorten", async (req, res) => {
  const fullUrl = req.body.fullUrl;
  const result = await ShortenUrl.findOne({ fullUrl });
  console.log(result);
  if (result && result.shortUrl) return res.send(result.shortUrl);

  try {
    const { shortUrl } = await ShortenUrl.create({ fullUrl });
    return res.send(shortUrl);
  } catch (error) {
    console.log(error);
    return res.send("invalid url");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
