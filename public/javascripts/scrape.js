var request = require('request');
var cheerio = require('cheerio');

var teamURLs = ['afc-bournemouth/349', 'arsenal/359', 'brighton-and-hove-albion/331', 'burnley/379', 'chelsea/363', 'chrystal-palace/384', 
                'everton/368', 'huddersfield-town/335', 'leicester-city/375', 'liverpool/364', 'manchester-city/382', 
                'manchester-United/360', 'newcastle-united/361', 'southampton/376', 'stoke-city/336', 'swansea-city/318', 
                'tottenham-hotspur/367', 'watford/395', 'west-bromwich-albion/383', 'west-ham-united/371'];


request('http://www.espnfc.com/club/afc-bournemouth/349/squad', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('div.responsive-table-content').each(function(i, element){
      console.log($(this) + '\n');
    })
    //console.log(html);
  }
});

/*

URL = 'http://www.espnfc.com/club/' + teamURLs[i] + '/squad';

afc-bournemouth/349
arsenal/359
brighton-and-hove-albion/331
burnley/379
chelsea/363
chrystal-palace/384
everton/368
huddersfield-town/335
leicester-city/375
liverpool/364
manchester-city/382
manchester-United/360
newcastle-united/361
southampton/376
stoke-city/336
swansea-city/318
tottenham-hotspur/367
watford/395
west-bromwich-albion/383
west-ham-united/371
*/