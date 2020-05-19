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
let season;

app.get("/", function(req, res){
    driverProfile["Driver"].sort(function(a, b){
        return b.points - a.points;
    })
    res.render("index", {driverProfile : driverProfile["Driver"], raceCalendar : raceCalendar});
});

app.get("/season3", function(req, res) {
    // console.log(archive["2020"][0]["Standings"][5]);
    season = "SEASON3";
    res.render("season3", {archive : archive});
});

app.get("/season4", function(req, res){
    season = "SEASON4";
    res.render("season4", {archive : archive});
})

app.get("/archive/:id/show", function(req, res){
    let raceID = req.params.id;
    archive[season].map(race => {
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
    let newTeamList = [];
    let newTeam = {};
    constructor["Teams"].map(team => {
        newTeam.name = team["name"];
        newTeam.class = team["class"];
        newTeam.image = team["image"];
        newTeam.drivers = [];
        newTeam.teamPoints = 0;
        team["drivers"].map(driver => {
            if(driver == "No Driver"){
                newTeam.drivers.push(driver);
            } else {
                driverProfile["Driver"].map(foundDriver => {
                    if(driver == foundDriver.driver){
                        newTeam.drivers.push(foundDriver.driver);
                        newTeam.teamPoints += foundDriver.points;
                    }
                })
            }
           
        })
        newTeamList.push(newTeam);
        newTeam = {};
    })
    newTeamList.sort(function(a, b){
        return b.teamPoints - a.teamPoints;
    })
    res.render("teamlist", {constructor : newTeamList});
});

app.get("/leaderboardhistory", function(req, res){
    res.render("leaderboardhistory", {leaderboardHistory : leaderboardHistory});
});

app.get("/showRaceStat", function(req, res){
    foundRace["Standings"].sort(function(a, b){
        return b.points - a.points;
    });
    res.render("raceStats", {foundRace : foundRace});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' , app.get('port'));
});