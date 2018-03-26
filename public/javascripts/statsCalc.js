//Calculates a player Points per some unit
function PPUnit (Points, Unit) {
    if(Unit === 0){
        return 0;
    }else{
        var ppu = Points / Unit;
        return ppu;
    }
}

//Used by taking in player stats to calculate their point total 
function CalcPoints (Starts, SubIns, Goals, Assists, CleanSheets, RedCards, Saves, PensMissed, PensSaved){
    var Points = 0;

    Points += 2 * Starts;
    Points += SubIns;
    Points += 5 * Goals;
    Points += 3 * Assists;
    Points += 5 * CleanSheets;
    Points += -5 * RedCards;
    
    if(Saves % 2 == 0){
        Points += Saves / 2;
    }else{
        Points += (Saves - 1) / 2;
    }

    Points += -3 * PensMissed;
    Points += 5 * PensSaved;

    return Points;
}

//Take input from a scrape (hopefully implemented soon) and build an array of player stats for easy update
function PrepDBEntry(Pos, Starts, SubIns, Goals, Assists, CleanSheets, RedCards, Saves, PensMissed, PensSaved) {
    var player = [Pos];

    var Points = CalcPoints(Starts, SubIns, Goals, Assists, CleanSheets, RedCards, Saves, PensMissed, PensSaved);
    player.push(Points);
    
    player.push(Starts, SubIns, Goals, Assists);

    if(Pos == 'GK' || Pos == 'DEF'){
        player.push(CleanSheats, RedCards, Saves, PensMissed, PensSaved);
    }else{
        player.push(0, RedCards, 0, PensMissed, 0);
    }

    return player;
}



//Export functions for calculations
module.exports.PPUnit = PPUnit;
module.exports.CalcPoints = CalcPoints;
module.exports.PrepDBEntry = PrepDBEntry;