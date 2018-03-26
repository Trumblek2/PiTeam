var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var statsCalc = require('./../public/javascripts/statsCalc');
var navbarjs = require('../public/javascripts/navbar');
var path = require('path');
var async = require('async');

//Goals SQL: SELECT COUNT (*), PL.PID FROM PLGoals1718 GL, players PL WHERE PL.PID = GL.Scorer AND GL.OG != 1 GROUP BY PL.PID
//Assists SQL: SELECT COUNT (*), PL.PID FROM PLGoals1718 GL, players PL WHERE PL.PID = GL.Assister GROUP BY PL.PID

//Most recent 4 Games Goals SQL: SELECT COUNT (*), PL.PID, FROM PLGoals1718 GL, players PL WHERE (GL.Scorer = PL.PID AND GL.OG != 1) 
//      AND GL.ID IN (SELECT GM.GID FROMG PLGames1718 GM WHERE GM.GameWeek > ((SELECT MIN(GM1.GameWeek) FROM PLGames1718 GM1
//      WHERE Status = 'UP') -5) AND GM.GameWeek < (SELECT MIN(GM2.GameWeek) FROM PLGames1718 GM2 WHERE Status = 'UP')) 
//      GROUP BY PL.PID;

function tableHeader(pos){

    var table = '<table class="table-hover table-striped table-bordered table-responsive">';
    table += '<tr><th colspan=17><b>' + pos + '</b></th></tr>';
    table += "<tr>";
    table += "<th>Position</th>";
    table += "<th>Last Name</th>";
    table += "<th>First Name</th>";
    table += "<th>Team</th>";
    table += "<th>Cost</th>";
    table += "<th>Points</th>";
    table += "<th>Starts</th>";
    table += "<th>Sub-Ins</th>";
    table += "<th>Goals</th>";
    table += "<th>Assists</th>";
    table += "<th>Clean Sheets</th>";
    table += "<th>Goals Conceded</th>";
    table += "<th>Red Cards</th>";
    table += "<th>Saves</th>";
    table += "<th>Pens Missed</th>";
    table += "<th>PPG</th>";
    table += "<th>PPM</th>";
    table += "</tr>";

    console.log('built table header');
    return table;
}

//Builds table format for games page
function gamesHeader(GW){
    var table = '<table class="table-hover table-striped table-bordered table-responsive">';
    table += '<tr><th colspan=4><b>Gameweek ' + GW + '</b></th></tr>';
    table += "<tr>";
    table += "<th>Home Score</th>";
    table += "<th>Home Team</th>";
    table += "<th>Away Team</th>";
    table += "<th>Away Score</th>";
    table += "</tr>";

    return table;
}


//Builds an html formated table row by row using appropiate JSON
function buildPlayerTable(pos, players){
    var posJSON;
    var table = '';

    if(pos.match(/GK|DEF|MID|FOR/)){
        players.forEach(function(entry){
            if(entry.Pos == pos){
                table += '<tr>';
                table += '<td>' + entry.Pos + "</td>";
                table += '<td>' + entry.LastName + "</td>";
                table += '<td>' + entry.FirstName + "</td>";
                table += '<td>' + entry.TeamAbv + "</td>";
                table += '<td>' + entry.Cost + " m</td>";
                table += '<td>' + entry.Points + "</td>";
                table += '<td>' + entry.Starts + "</td>";
                table += '<td>' + entry.SubIns + "</td>";
                table += '<td>' + entry.Goals + "</td>";
                table += '<td>' + entry.Assists + "</td>";
                table += '<td>' + entry.CleanSheets + "</td>";
                table += '<td>' + entry.GoalsConceded + "</td>";
                table += '<td>' + entry.RedCards + "</td>";
                table += '<td>' + entry.Saves + "</td>";
                table += '<td>' + entry.PensMissed + "</td>";
                table += '<td>' + entry.PPG + "</td>";
                table += '<td>' + entry.PPM + "</td>";
                table += '</tr>';
            }
        });
    }else if(pos == 'OP'){
        players.forEach(function(entry){
            if(entry.Pos != 'GK'){
                table += '<tr>';
                table += '<td>' + entry.Pos + "</td>";
                table += '<td>' + entry.LastName + "</td>";
                table += '<td>' + entry.FirstName + "</td>";
                table += '<td>' + entry.TeamAbv + "</td>";
                table += '<td>' + entry.Cost + " m</td>";
                table += '<td>' + entry.Points + "</td>";
                table += '<td>' + entry.Starts + "</td>";
                table += '<td>' + entry.SubIns + "</td>";
                table += '<td>' + entry.Goals + "</td>";
                table += '<td>' + entry.Assists + "</td>";
                table += '<td>' + entry.CleanSheets + "</td>";
                table += '<td>' + entry.GoalsConceded + "</td>";
                table += '<td>' + entry.RedCards + "</td>";
                table += '<td>' + entry.Saves + "</td>";
                table += '<td>' + entry.PensMissed + "</td>";
                table += '<td>' + entry.PPG + "</td>";
                table += '<td>' + entry.PPM + "</td>";
                table += '</tr>';
            }
        });
    }else{
        players.forEach(function(entry){
            table += '<tr>';
            table += '<td>' + entry.Pos + "</td>";
            table += '<td>' + entry.LastName + "</td>";
            table += '<td>' + entry.FirstName + "</td>";
            table += '<td>' + entry.TeamAbv + "</td>";
            table += '<td>' + entry.Cost + " m</td>";
            table += '<td>' + entry.Points + "</td>";
            table += '<td>' + entry.Starts + "</td>";
            table += '<td>' + entry.SubIns + "</td>";
            table += '<td>' + entry.Goals + "</td>";
            table += '<td>' + entry.Assists + "</td>";
            table += '<td>' + entry.CleanSheets + "</td>";
            table += '<td>' + entry.GoalsConceded + "</td>";
            table += '<td>' + entry.RedCards + "</td>";
            table += '<td>' + entry.Saves + "</td>";
            table += '<td>' + entry.PensMissed + "</td>";
            table += '<td>' + entry.PPG + "</td>";
            table += '<td>' + entry.PPM + "</td>";
            table += '</tr>';
        });
    }
    //console.log('table: ' + table);
    return table;
}


/* GET home page. */
router.get('/', function(req, res, next) {
    var about = '';
    about += '<h1>Welcome To PiTeam</h1><br>';
    about += '<h3><p>'
    about += 'Hello! PiTeam is a custom statistics based node.js application built around the fantasy sports app iTeam aka FiT. ';
    about += 'The database is currently manually updated so please give it a few days for the most recent statistics and costs to be added in. ';
    about += 'This program is built and maintained by Kevin Trumble in my free time. For any inquiries email kevintrumble05@gmail.com';
    about += '</h3></p>'

    navbar = navbarjs.buildNav(0);

    res.render('index', { 
        nav : navbar,
        print: about
    });
});


router.get('/:id', function(req, res, next){
    if(req.params.id == 'Games'){
        var query1 = "CREATE VIEW IF NOT EXISTS games(GameWeek, HomeScore, HomeTeam, AwayTeam, AwayScore) AS SELECT GM.GameWeek, GM.HomeScore, TM.TeamName, TM2.TeamName, GM.AwayScore FROM PLteams1718 TM, PLteams1718 TM2, PLGames1718 GM WHERE GM.HomeTeam = TM.TID AND GM.AwayTeam = TM2.TID ORDER BY GM.GameWeek, GM.GID";
        var query2 = "SELECT * FROM games";
        var navbar = navbarjs.buildNav(2);
        var html = '';
        var GW = 0;

        let db = new sqlite3.Database('./databases/users.db', (err) => {
            if (err) {
                console.error(err.message);
            }else{
                console.log('Connected to the players database.');
            }
        });
        
        //Execute sql statements in synchronous fashion
        db.serialize(() => {

            //db.run("DROP VIEW games");
            db.run(query1);
    
            db.each(query2, function(err,row) {
                if (err) {
                    console.error(err.message);
                }
    
                if(GW < row.GameWeek){
                    GW = row.GameWeek;
                    if(GW != 1){
                        html += '</table><br>\n';
                    }
                    html += gamesHeader(GW);
                }

                //Format each Games stat into html table form
                html += "<tr>";
                //html += '<td>' + row.GameWeek + '</td>';
                if(row.HomeScore == null){
                    html += '<td>-</td>';
                    html += '<td>' + row.HomeTeam + '</td>';
                }else if(row.HomeScore > row.AwayScore){
                    html += '<td><b>' + row.HomeScore + '</b></td>';
                    html += '<td><b>' + row.HomeTeam + '</b></td>';
                }else{
                    html += '<td>' + row.HomeScore + '</td>';
                    html += '<td>' + row.HomeTeam + '</td>';
                }

                if(row.AwayScore == null){
                    html += '<td>' + row.AwayTeam + '</td>';
                    html += '<td>-</td>';
                }else if(row.AwayScore > row.HomeScore){
                    html += '<td><b>' + row.AwayTeam + '</b></td>';
                    html += '<td><b>' + row.AwayScore + '</b></td>';
                }else{
                    html += '<td>' + row.AwayTeam + '</td>';
                    html += '<td>' + row.AwayScore + '</td>';
                }
                    html += '</tr>';
        
            }, function(){
                html += "</table>";

                //Closes players database
                db.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Close the database connection.');
                });
                console.log('Rendered to page');

                res.render('index', { 
                    nav : navbar,
                    print: html 
                });
            });
        });
    //Compares id of URL against regex below since they use the same page template
    }else if(req.params.id.match(/Players|FOR|MID|DEF|GK/)){

        var activeVal = {'Players':1, 'FOR':6, 'MID':5, 'DEF':4, 'GK':3};
        //Builds navbar
        var navbar = navbarjs.buildNav(activeVal[req.params.id]);
        //Builds table header
        var html = tableHeader(req.params.id);

        var players = [];

        //Checks if this is the first time one of these pages has been loaded
        

        let db = new sqlite3.Database('./databases/players.db', (err) => {
            if (err) {
                console.error(err.message);
            }else{
                console.log('Connected to the players database.');
            }
        });
    
        db.each("SELECT * FROM players ORDER BY Points DESC", function(err,row) {
            if (err) {
                console.error(err.message);
            }
            var myObject = new Object();
    
            //Calculate Points per Game and Points per Million for each player
            var PPG = statsCalc.PPUnit(row.Points, (row.Starts + row.SubIns)).toFixed(2);
            var PPM = statsCalc.PPUnit(row.Points, row.Cost).toFixed(2);
    
            //Format each players stat into a JSON object
            myObject.PID = row.PID;
            myObject.Pos = row.Pos;
            myObject.LastName = row.LastName;
            myObject.FirstName = row.FirstName;
            myObject.TeamAbv = row.TeamAbv;
            myObject.Cost = row.Cost;
            myObject.Points = row.Points;
            myObject.Starts = row.Starts;
            myObject.SubIns = row.SubIns;
            myObject.Goals = row.Goals;
            myObject.Assists = row.Assists;
            myObject.CleanSheets = row.CleanSheets;
            myObject.GoalsConceded = row.GoalsConceded;
            myObject.RedCards = row.RedCards;
            myObject.Saves = row.Saves;
            myObject.PensMissed = row.PensMissed;
            myObject.PPG = PPG;
            myObject.PPM = PPM;

            players.push(myObject);

        }, function () {
            html += buildPlayerTable(req.params.id, players);
            html += '</table>';

            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                    console.log('Close the database connection.');
            });

            res.render('index', { 
                nav : navbar,
                print: html 
            });
        });
    }else if(req.params.id.match(/ARS|BHA|BOU|BUR|CHE|CRY|EVE|HUD|LEI|LIV|MNC|MUN|NEW|SOT|STK|SWA|TOT|WAT|WBA|WHU/)){
        var navbar = navbarjs.buildNav(7);        
        var logo = '<img src="/images/' + req.params.id + '.png" alt="' + req.params.id + ' logo" width=350px height=350px>';
        var GKtable = tableHeader('Goalkeepers');
        var PLtable = tableHeader('Outfield Players');
        var test = '';
        var players = [];

        let db = new sqlite3.Database('./databases/players.db', (err) => {
            if (err) {
                console.error(err.message);
            }else{
                console.log('Connected to the players database.');
            }
        });
    
        db.each("SELECT * FROM players WHERE TeamAbv = ? ORDER BY Points DESC", [req.params.id], function(err,row) {
            if (err) {
                console.error(err.message);
            }
            var myObject = new Object();
    
            //Calculate Points per Game and Points per Million for each player
            var PPG = statsCalc.PPUnit(row.Points, (row.Starts + row.SubIns)).toFixed(2);
            var PPM = statsCalc.PPUnit(row.Points, row.Cost).toFixed(2);
    
            //Format each players stat into a JSON object
            myObject.PID = row.PID;
            myObject.Pos = row.Pos;
            myObject.LastName = row.LastName;
            myObject.FirstName = row.FirstName;
            myObject.TeamAbv = row.TeamAbv;
            myObject.Cost = row.Cost;
            myObject.Points = row.Points;
            myObject.Starts = row.Starts;
            myObject.SubIns = row.SubIns;
            myObject.Goals = row.Goals;
            myObject.Assists = row.Assists;
            myObject.CleanSheets = row.CleanSheets;
            myObject.GoalsConceded = row.GoalsConceded;
            myObject.RedCards = row.RedCards;
            myObject.Saves = row.Saves;
            myObject.PensMissed = row.PensMissed;
            myObject.PPG = PPG;
            myObject.PPM = PPM;

            players.push(myObject);

        }, function () {
            GKtable += buildPlayerTable('GK', players);
            PLtable += buildPlayerTable('OP', players);
            GKtable += '</table>';
            PLtable += '</table>';

            db.close((err) => {
                if (err) {
                   console.error(err.message);
                }
                   console.log('Close the database connection.');
            });

            res.render('team', { 
                nav : navbar,
                TeamImage: logo,
                TeamStats: test,
                GKstats: GKtable,
                PLstats: PLtable
            });
        });
    }else if(req.params.id == 'pick'){
        var navbar = navbarjs.buildNav(8);

        var GKs = '';
        var DEFs = '';
        var MIDs = '';
        var FORs = '';
        var players = [];
        
        let db = new sqlite3.Database('./databases/players.db', (err) => {
            if (err) {
                console.error(err.message);
            }else{
                console.log('Connected to the players database.');
            }
        });
            
        db.each("SELECT * FROM players ORDER BY LastName", function(err,row) {
            if (err) {
                console.error(err.message);
            }
            var myObject = new Object();
            
            //Calculate Points per Game and Points per Million for each player
            var PPG = statsCalc.PPUnit(row.Points, (row.Starts + row.SubIns)).toFixed(2);
            var PPM = statsCalc.PPUnit(row.Points, row.Cost).toFixed(2);
        
            //Format each players stat into a JSON object
            myObject.PID = row.PID;
            myObject.Pos = row.Pos;
            myObject.LastName = row.LastName;
            myObject.FirstName = row.FirstName;
            myObject.TeamAbv = row.TeamAbv;
            myObject.Cost = row.Cost;
            myObject.Points = row.Points;
            myObject.Starts = row.Starts;
            myObject.SubIns = row.SubIns;
            myObject.Goals = row.Goals;
            myObject.Assists = row.Assists;
            myObject.CleanSheets = row.CleanSheets;
            myObject.GoalsConceded = row.GoalsConceded;
            myObject.RedCards = row.RedCards;
            myObject.Saves = row.Saves;
            myObject.PensMissed = row.PensMissed;
            myObject.PPG = PPG;
            myObject.PPM = PPM;
        
            players.push(myObject);
        
        }, function () {
        
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                    console.log('Close the database connection.');
            });

            GKs += '<button class="sidenav-drpdwn sidenav-active" id="GKBtn">GK</button>';
            GKs += '<div id="GKsDisp" class="sidenav-content">';
            GKs += '<div class="sidenav-sub">';
            GKs += '<ul class="selectPL">';
            players.forEach(function(entry){
                if(entry.Pos == 'GK'){
                    GKs += '<li class="pick" id="' + entry.PID + '"><a id="' + entry.Pos + entry.PID + '" class="select ' + entry.TeamAbv + '">' + entry.LastName + '</a></li>';
                }
            });
            GKs += '</ul></div></div>';
            
            DEFs+= '<button class="sidenav-drpdwn" id="DEFBtn">DEF</button>';
            DEFs += '<div id="DEFsDisp" class="sidenav-content">';
            DEFs += '<div class="sidenav-sub">';
            DEFs += '<ul class="selectPL">';
            players.forEach(function(entry){
                if(entry.Pos == 'DEF'){
                    DEFs += '<li class="pick" id="' + entry.PID + '"><a id="' + entry.Pos + entry.PID + '" class="select ' + entry.TeamAbv + '">' + entry.LastName + '</a></li>';
                }
            });
            DEFs += '</ul></div></div>';
            
            MIDs += '<button class="sidenav-drpdwn" id="MIDBtn">MID</button>';
            MIDs += '<div id="MIDsDisp" class="sidenav-content">';
            MIDs += '<div class="sidenav-sub">';
            MIDs += '<ul class="selectPL">';
            players.forEach(function(entry){
                if(entry.Pos == 'MID'){
                    MIDs += '<li class="pick" id="' + entry.PID + '"><a id="' + entry.Pos + entry.PID + '" class="select ' + entry.TeamAbv + '">' + entry.LastName + '</a></li>';
                }
            });
            MIDs += '</ul></div></div>';
            
            FORs += '<button class="sidenav-drpdwn" id="FORBtn">FOR</button>';
            FORs += '<div id="FORsDisp" class="sidenav-content">';
            FORs += '<div class="sidenav-sub">';
            FORs += '<ul class="selectPL">';
            players.forEach(function(entry){
                if(entry.Pos == 'FOR'){
                    FORs += '<li class="pick" id="' + entry.PID + '"><a id="' + entry.Pos + entry.PID + '" class="select ' + entry.TeamAbv + '">' + entry.LastName + '</a></li>';
                }
            });
            FORs += '</ul></div></div>';

        
            res.render('pick', {
                nav : navbar,
                GKs : GKs,
                DEFs : DEFs,
                MIDs : MIDs,
                FORs : FORs
            });
        });

       
    }else{
        console.log("Its still using index for users");
    }
});

module.exports = router;