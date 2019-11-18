//JSON data
//let inventaryRecords = require('./queries.json');
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const fs = require("fs");

mongoose
  .connect(
    "mongodb+srv://aman:qwerty@123@cluster0-vinie.mongodb.net/test?retryWrites=true&w=majority",{
    //"mongodb+srv://sid:kctaneja@cluster0-pqe9f.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      console.log("mongoose connected");
    },
    err => {
      console.log("mongoose connection failed");
    }
  );
var nameSchema = mongoose.Schema({
  username: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
});
var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then(item => {
      res.send("Name saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

app.post("/finduser", function(req, res) {
  //console.log(req);

  User.find(req.body)
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length > 0) {
        if (
          req.body.username === docs[0].username &&
          req.body.password === docs[0].password
        ) {
          res.status(200).json({ status: true, value: "validated" });
        } else {
          res.status(200).json({ status: false, value: "not validated" });
        }
      } else {
        res.status(200).json({ status: false, value: "not validated" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: false,
        value: "not validated"
      });
    });
});

app.get("/users", function(req, res) {
  console.log(req);

  User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.listen(3000, function() {
  console.log("server running at port 3000");
});
