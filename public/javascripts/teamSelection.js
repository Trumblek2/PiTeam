const sqlite3 = require('sqlite3').verbose();
var path = require('path');

function teamElig (Budget, PIDs) {
    
    //Open the players database
    let db = new sqlite3.Database(path.join(__dirname, '..', 'databases', 'players.db'), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
    	    console.error(err.message);
    	}else{
    	    console.log('Connected to the players database.');
    	}
    });

    //Get the Cost, Position, and Team for all players on the team selected by users
    var query = 'SELECT Cost, Pos, TeamAbv FROM players WHERE PID IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var teamValue = 0;
    var allPos = [];
    var numTeams = [];
    
    db.serialize(() => {
        db.each(query, [PIDs[0], PIDs[1], PIDs[2], PIDs[3], PIDs[4], PIDs[5], PIDs[6], PIDs[7], PIDs[8], PIDs[9], PIDs[10]], function(err,row) {
            if (err) {
                console.error(err.message);
            }

            teamValue += row.Cost;
            allPos.push(row.Pos);
            numTeams.push(row.TeamAbv);
        
        }, function(){
            var Elig = true;
            var numGK = 0;
            var numDEF = 0;
            var numMID = 0;
            var numFOR = 0;
            var sameTeam = 0;

            //Sum the number of players in each position
            for(i = 0; i < 11; i++){
                if(allPos[i] == 'GK'){
                    numGK++;
                }else if(allPos[i] == 'DEF'){
                    numDEF++;
                }else if(allPos[i] == 'MID'){
                    numMid++;
                }else if(allPos[i] == 'FOR'){
                    numFOR++;
                }
            }

            //Checks the iTeam standards for an eligable team
            if(teamValue > Budget){
                Elig = false;
            }else if(numGK != 1){
                Elig = false;
            }else if(numDEF < 3 || numDEF > 5){
                Elig = false;
            }else if(numMID < 3 || numMID > 5){
                Elig = false;
            }else if(numFOR < 1 || numFOR > 3){
                Elig = false;
            }else if(sameTeam > 4){
                Elig = false;
            }

            //Return may not work, as it is from callback function
            return Elig;

        });

        db.close((err) => {
			if (err) {
				   console.error(err.message);
			}
			console.log('Close the database connection.');
		});
    });
}