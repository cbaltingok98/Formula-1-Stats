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

const leaderboardHistory = require("./json/leaderboardHistory.json");
const archive = require("./json/raceHistory.json");
const constructor = require("./json/constructor.json");
const driverProfile = require("./json/drivers.json");
const raceCalendar = require("./json/raceCalendar.json");
const worldChamps = require("./json/worldChampions.json");
let foundRace = {};

app.get("/", function(req, res){
    driverProfile["Driver"].sort(function(a, b){
        return b.points - a.points;
    })
    res.render("index", {driverProfile : driverProfile["Driver"], raceCalendar : raceCalendar});
});

app.get("/season3", function(req, res) {
    // console.log(archive["2020"][0]["Standings"][5]);
    res.render("season3", {archive : archive});
});

app.get("/season4", function(req, res){
    res.render("season4");
})

app.get("/archive/:id/show", function(req, res){
    let raceID = req.params.id;
    archive["SEASON3"].map(race => {
        if(race["race_id"] == raceID){
            foundRace = race;
        }
    })
    res.redirect("/showRaceStat");
});

app.get("/worldChamp", function(req, res){
    res.render("worldChampions", {worldChamps : worldChamps});
});

app.get("/teamlist", function(req, res){
    let result;
    res.render("teamlist", {constructor : constructor["Teams"], driverProfile : driverProfile["Driver"], result : result});
});

app.get("/leaderboardhistory", function(req, res){
    res.render("leaderboardhistory", {leaderboardHistory : leaderboardHistory});
});

app.get("/showRaceStat", function(req, res){
    res.render("raceStats", {foundRace : foundRace});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' , app.get('port'));
});