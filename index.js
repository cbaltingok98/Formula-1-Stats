const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const driverStat = require("./json/currentLeaderboard.json");
const archive = require("./json/raceHistory.json");

app.get("/", function(req, res){
    res.render("index", {driverStat : driverStat});
});

app.get("/archive", function(req, res) {
    // console.log(archive["2020"][0]["Standings"][5]);
    res.render("archive", {archive : archive});
});


app.listen(3000, '127.0.0.1', function () {
    console.log("Formula 1 Started");
});