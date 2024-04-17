var express = require("express");
const mongoose = require("mongoose");
const CycleStatus = require("./mongodb");
const cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());

app.get("/data", async (req, res) => {
  try {
    let mydata = {};
    if (Object.keys(req.query).length === 0) {
      mydata = await CycleStatus.find();
    } else {
      mydata = await CycleStatus.find({ts: { $gt: req.query.st, $lt: req.query.et }})
   }
    res.json(mydata);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

var server = app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});
