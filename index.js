let driverStat = [
    { "position": 1, "driver": "StarfoxF1", "team": "RACING POINT", "points": 315 },
    { "position": 2, "driver": "FatedRacer14130", "team": "RACING POINT", "points": 294 },
    { "position": 3, "driver": "GM ManyEx", "team": "FERRARI", "points": 215 },
    { "position": 4, "driver": "Saloo911D", "team": "RENAULT", "points": 150 },
    { "position": 5, "driver": "KillaRamo3", "team": "FERRARI", "points": 132 },
    { "position": 6, "driver": "Yigitalp2631", "team": "MERCEDES", "points": 122 },
    { "position": 7, "driver": "STPPH57", "team": "RENAULT", "points": 90 },
    { "position": 8, "driver": "HoneyBadger6725", "team": "REDBULL", "points": 80 },
    { "position": 9, "driver": "SilaHeNdaZ", "team": "MERCEDES", "points": 26 },
    { "position": 10, "driver": "OpsAngel98", "team": "REDBULL", "points": 15 }
];





        let table = document.getElementById('driversList').childNodes;
        table = table[3].childNodes;
        table = table[3];
        let counter = 0;
        driverStat.map(driver  => {
            let row = document.createElement('tr');
            table.appendChild(row);
            let newRow = table.childNodes[counter];
            let dPosition = document.createElement('td');
            dPosition.textContent = driver.position;
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
        });