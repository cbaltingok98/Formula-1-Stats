const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.set("port", (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const driverStat = require("./json/currentLeaderboard.json");
const archive = require("./json/raceHistory.json");
let foundRace = {};

app.get("/", function(req, res){
    // driverStat.sort(function(a b){
    //     return b.points - a.points;
    // })
    res.render("index", {driverStat : driverStat});
});

app.get("/archive", function(req, res) {
    // console.log(archive["2020"][0]["Standings"][5]);
    res.render("archive", {archive : archive});
});

app.get("/archive/:id/show", function(req, res){
    let raceID = req.params.id;
    archive["2020"].map(race => {
        if(race["race_id"] == raceID){
            foundRace = race;
        }
    })
    res.redirect("/showRaceStat");
});

app.get("/showRaceStat", function(req, res){
    res.render("raceStats", {foundRace : foundRace});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' , app.get('port'));
})