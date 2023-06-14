var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var alert = require("alert");
var session = require("express-session");
var canGo = ["annapurna", "bali", "inca", "paris", "rome", "santorini"];
var sResults = [];
const PORT = process.env.PORT || 3030;

// initialize session
app.use(
  session({
    secret: "thisIsShouny",
    resave: true,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Login Page
app.get("/", function (req, res) {
  res.render("login", { title: "Login" });
});

app.post("/", function (req, res) {
  // check if user and password are in DB
  var user = req.body.username;
  var password = req.body.password;

  if (user == "admin" && password == "admin") {
    req.session.username = user;
    res.redirect("/home");
  } else {
    MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
      if (err) throw err;

      var db = client.db("myDB");
      db.collection("myCollection").findOne(
        { username: user, password: password },
        function (err, resDB) {
          if (err) throw err;

          if (resDB == null) {
            alert("Wrong Credentials");
            res.redirect("/");
          } else {
            req.session.username = user;
            res.redirect("/home");
          }
        }
      );
    });
  }
});

// Home
app.get("/home", function (req, res) {
  res.render("home", { title: "Home" });
});

// Registration
app.get("/registration", function (req, res) {
  res.render("registration", { title: "Registration" });
});

app.post("/register", function (req, res) {
  // Add user and password are in DB
  var user = req.body.username;
  var password = req.body.password;
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: user, password: password },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Account Already Registered");
          res.redirect("/registration");
        } else if (user == "" || password == "") {
          alert("Please Enter Credentials");
          res.redirect("/registration");
        } else {
          db.collection("myCollection").insertOne(
            { username: user, password: password },
            function (err, resDB) {
              if (err) throw err;
              res.redirect("/");
            }
          );
        }
      }
    );
  });
});

//Seach
app.post("/search", function (req, res) {
  var searchingFor = req.body.Search;
  sResults = canGo.filter((element) => {
    if (element.includes(searchingFor)) {
      return true;
    }
  });

  var showA = "hidden";
  var showB = "hidden";
  var showI = "hidden";
  var showP = "hidden";
  var showR = "hidden";
  var showS = "hidden";

  if (sResults.includes("annapurna")) showA = "";

  if (sResults.includes("bali")) showB = "";

  if (sResults.includes("inca")) showI = "";

  if (sResults.includes("paris")) showP = "";

  if (sResults.includes("rome")) showR = "";

  if (sResults.includes("santorini")) showS = "";

  res.render("searchresults", {
    showA: showA,
    showB: showB,
    showI: showI,
    showP: showP,
    showR: showR,
    showS: showS,
  });
});

// Add to want to go list posts

app.post("/insertA", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "annapurna" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/annapurna");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "annapurna" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/annapurna");
            }
          );
        }
      }
    );
  });
});

app.post("/insertB", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "bali" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/bali");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "bali" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/bali");
            }
          );
        }
      }
    );
  });
});

app.post("/insertI", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "inca" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/inca");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "inca" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/inca");
            }
          );
        }
      }
    );
  });
});

app.post("/insertP", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "paris" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/paris");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "paris" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/paris");
            }
          );
        }
      }
    );
  });
});

app.post("/insertR", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "rome" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/rome");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "rome" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/rome");
            }
          );
        }
      }
    );
  });
});

app.post("/insertS", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username, wantToGoList: "santorini" },
      function (err, resDB) {
        if (err) throw err;

        if (resDB != null) {
          alert("Already in your list");
          res.redirect("/santorini");
        } else {
          db.collection("myCollection").updateOne(
            { username: req.session.username },
            { $push: { wantToGoList: "santorini" } },
            function (err, resDB) {
              if (err) throw err;

              alert("Inserted Successfully");
              res.redirect("/santorini");
            }
          );
        }
      }
    );
  });
});

// Wanttogo
app.get("/wanttogo", function (req, res) {
  MongoClient.connect("mongodb://0.0.0.0:27017", function (err, client) {
    if (err) throw err;

    var db = client.db("myDB");

    db.collection("myCollection").findOne(
      { username: req.session.username },
      function (err, resDB) {
        if (err) throw err;

        var showA = "hidden";
        var showB = "hidden";
        var showI = "hidden";
        var showP = "hidden";
        var showR = "hidden";
        var showS = "hidden";

        if (resDB.wantToGoList.includes("annapurna")) showA = "";

        if (resDB.wantToGoList.includes("bali")) showB = "";

        if (resDB.wantToGoList.includes("inca")) showI = "";

        if (resDB.wantToGoList.includes("paris")) showP = "";

        if (resDB.wantToGoList.includes("rome")) showR = "";

        if (resDB.wantToGoList.includes("santorini")) showS = "";

        res.render("wanttogo", {
          showA: showA,
          showB: showB,
          showI: showI,
          showP: showP,
          showR: showR,
          showS: showS,
        });
      }
    );
  });
});

//Hiking
app.get("/hiking", function (req, res) {
  res.render("hiking", { title: "Hiking" });
});

// Cities
app.get("/cities", function (req, res) {
  res.render("cities", { title: "Cities" });
});

// Islands
app.get("/islands", function (req, res) {
  res.render("islands", { title: "Islands" });
});

// inca
app.get("/inca", function (req, res) {
  res.render("inca", { title: "Inca" });
});

// Annapurna
app.get("/annapurna", function (req, res) {
  res.render("annapurna", { title: "Annapurna" });
});

// Paris
app.get("/paris", function (req, res) {
  res.render("paris", { title: "Paris" });
});

// Rome
app.get("/rome", function (req, res) {
  res.render("rome", { title: "Rome" });
});

// Bali
app.get("/bali", function (req, res) {
  res.render("bali", { title: "Bali" });
});

// Santorini
app.get("/santorini", function (req, res) {
  res.render("santorini", { title: "Santorini" });
});

// Searchresults
app.get("/searchresults", function (req, res) {
  res.render("searchresults", { title: "Search Results" });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
