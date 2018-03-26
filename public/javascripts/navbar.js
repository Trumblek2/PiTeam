function buildNav(page){
    
    var active = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
    
    active[page] = ' ngate-active';

    var navbar = '';
    navbar += '<nav class="ngate-main">\n';
    navbar += '<div class="logo"><a href="/">PiTeam</a></div>';
    navbar += '<ul>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[1] + '" href="/Players">Players</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[2] + '" href="/Games">Games</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[3] + '" href="/GK">GK</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[4] + '" href="/DEF">DEF</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item team' + active[5] + '"href="/MID">MID</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[6] + '" href="/FOR">FOR</a>\n';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<button class="ngate-drpdwn' + active[7] + '" id="teamsBtn" href="#">Teams</button>';
    navbar += '<div id="teamsDisp" class="ngate-content">';
    navbar += '<div class="ngate-sub">';
    navbar += '<ul>';
    navbar += '<li><a href="/ARS" id="001">Arsenal</a></li>';
    navbar += '<li><a href="/BHA" id="002">Brighton And Hove Albion</a></li>';
    navbar += '<li><a href="/BOU" id="003">Bournemouth</a></li>';
    navbar += '<li><a href="/BUR" id="004">Burnley</a></li>';
    navbar += '<li><a href="/CHE" id="005">Chelsea</a></li>';
    navbar += '<li><a href="/CRY" id="006">Crystal Palace</a></li>';
    navbar += '<li><a href="/EVE" id="007">Everton</a></li>';
    navbar += '<li><a href="/HUD" id="008">Huddersfield Town</a></li>';
    navbar += '<li><a href="/LEI" id="009">Leicester City</a></li>';
    navbar += '<li><a href="/LIV" id="010">Liverpool</a></li>';
    navbar += '<li><a href="/MNC" id="011">Manchester City</a></li>';
    navbar += '<li><a href="/MUN" id="012">Manchester United</a></li>';
    navbar += '<li><a href="/NEW" id="013">Newcastle United</a></li>';
    navbar += '<li><a href="/SOT" id="014">Southampton</a></li>';
    navbar += '<li><a href="/STK" id="015">Stoke City</a></li>';
    navbar += '<li><a href="/SWA" id="016">Swansea City</a></li>';
    navbar += '<li><a href="/TOT" id="017">Tottenham Hotspur</a></li>';
    navbar += '<li><a href="/WAT" id="018">Watford</a></li>';
    navbar += '<li><a href="/WBA" id="019">West Bromwich Albion</a></li>';
    navbar += '<li><a href="/WHU" id="020">West Ham United</a></li>';
    navbar += '<ul>';
    navbar += '</div>';
    navbar += '</div>';
    navbar += '</li>';
    navbar += '<li>';
    navbar += '<a class="ngate-item' + active[8] + '" href="/pick">Pick a Team</a>\n';
    navbar += '</li>';
    navbar += '<li class="login">';
    navbar += '<a class="ngate-item' + active[9] + '" href="/users/login">Login</a>\n';
    navbar += '</li>';
    navbar += '<li class="login">';
    navbar += '<a class="ngate-item' + active[10] + '" href="/users/register">Register</a>\n';
    navbar += '</li>';
    navbar += '</ul>\n';
    navbar += '</div>\n';
    navbar += '</nav>\n';
    
    console.log('built navbar');
    
    return navbar;
}

module.exports.buildNav = buildNav;