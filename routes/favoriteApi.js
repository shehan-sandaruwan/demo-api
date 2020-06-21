var express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dataStore = [];

router.get("/", function (req, res, next) {
  res.send(JSON.stringify(dataStore.length > 0 ? dataStore : {}));
});

router.post("/update", (req, res) => {
  const index = dataStore.findIndex((obj) => obj.index === req.body.index);

  if (index > -1) {
    dataStore[index].isLiked = req.body.isLiked;
  } else {
    dataStore.push(req.body);
  }

  res.end("yes");
});

router.post("/remove", (req, res) => {
  const newArray = dataStore.filter((obj) => obj.index !== req.body.index);

  dataStore = newArray;

  res.end("yes");
});

module.exports = router;
