let driverStat = [
    { "driver": "StarfoxF1", "team": "RACING POINT", "points": 356 },
    { "driver": "FatedRacer14130", "team": "RACING POINT", "points": 330 },
    { "driver": "GM ManyEx", "team": "FERRARI", "points": 241 },
    { "driver": "Saloo911D", "team": "RENAULT", "points": 150 },
    { "driver": "KillaRamo3", "team": "FERRARI", "points": 147 },
    { "driver": "Yigitalp2631", "team": "MERCEDES", "points": 144 },
    { "driver": "STPPH57", "team": "RENAULT", "points": 90 },
    { "driver": "HoneyBadger6725", "team": "REDBULL", "points": 94 },
    { "driver": "SilaHeNdaZ", "team": "MERCEDES", "points": 40 },
    { "driver": "OpsAngel98", "team": "REDBULL", "points": 37 }
];

driverStat.sort(function(a, b) {
    return b.points - a.points;
});



        let table = document.getElementById('driversList').childNodes;
        table = table[3].childNodes;
        table = table[3];
        let counter = 0;
        let positionCounter = 1;
        driverStat.map(driver  => {
            let row = document.createElement('tr');
            table.appendChild(row);
            let newRow = table.childNodes[counter];
            let dPosition = document.createElement('td');
            dPosition.textContent = positionCounter;
            newRow.appendChild(dPosition);
            let dName = document.createElement('td');
            dName.textContent = driver.driver;
            newRow.appendChild(dName);
            let dTeam = document.createElement('td');
            dTeam.textContent = driver.team;
            newRow.appendChild(dTeam);
            let dPoints = document.createElement('td');
            dPoints.textContent = driver.points;
            newRow.appendChild(dPoints);
            counter++;
            positionCounter++;
        });