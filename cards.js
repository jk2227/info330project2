$(".player-cards").isotope({
  itemSelector: '.player-card',
  layoutMode: 'fitRows',
  getSortData : {
      area_odds : function ( elem ) {
        return parseFloat( $(elem).find('#area_odds').text(), 10 );
      },
      area_fg : function ( elem ) {
        return parseFloat( $(elem).find('#area_fg').text() );
      },
      season_pts : function ( elem ) {
        return parseFloat( $(elem).find('#season_pts').text() );
      },
      season_rbds : function ( elem ) {
        return parseFloat( $(elem).find('#season_rbds').text() );
      },
      season_assts : function ( elem ) {
        return parseFloat( $(elem).find('#season_assts').text() );
      }
    }
})

function removeCards(){
  div = $(".player-cards");
  eles = $(".player-card")
  div.isotope( 'remove', eles)
  div.isotope();
  div.empty()
}

function addPlayerCards(){
  removeCards()
  players = {}
  arr = sortShots(selectedShots)
  var div = $(".player-cards")
  cards = []
  for(var key in arr){
    var card = makePlayerCard(key,arr[key][2],arr[key][0],arr[key][1])
    cards.push(card)
  }
  var c = $(cards);
  $(".player-cards").append( c ).isotope( 'appended', c );
  sort('area_odds');
}

function sort(opt){
  $('.player-cards').isotope({ sortBy : opt, sortAscending : false});
}

function makePlayerCard(name,id,shots,attempts){
  var totalShots = players_map[id][6].length;
  var season_fg = players_map[id][2];
  var season_pts = players_map[id][5];
  var season_rbds = players_map[id][3];
  var season_assts = players_map[id][4];
  var area_fg = (shots/attempts * 100).toFixed(4);
  var area_odds = (attempts/totalShots * 100).toFixed(4);
  var season = $("#years").val().toString();
  console.log(season)
  var elem = document.createElement('div');
  elem.innerHTML = 

"<div class='flip-container player-card' ontouchstart='this.classList.toggle('hover');'>" +
    "<div class='flipper'>" +
      "<div class='front' >" +
        "<img src='http://stats.nba.com/media/players/230x185/"+id+".png'><br/><br/>"+
        "<span class='name'>"+name+"</span>" +
      "</div>" +
      "<div class='back'>" +
        "<div class='stats'>" +
          "<h3>Season Stats</h3>" +
          "<p>PTS: <span id='season_pts'>"+season_pts+"  </span> Rebounds: <span id='season_rbds'>"+season_rbds+"</span></p>"+
          "<p>ASSTS: <span id='season_assts'>"+season_assts+" </span> Field Goal %: <span id='season_fg'>"+season_fg+"</span></p>"+
          "<h3>Selected Area Stats</h3>" +
          "<p>Shot Odds: <span id='area_odds'>"+area_odds+"%</span><br/> Field Goal %: <span id='area_fg'>"+area_fg+"%</span></p>" +
        "</div>" +
        "<div class='buttons'>" +
          "<button type='button' id='makeCards' onclick='plotShots(svg,\""+season+"\","+id+")'>Full Season Heatmap</button>" +
        "</div>" +
      "</div>" +
    "</div>" +
"</div>"


  return elem
}


function sortShots(arr,opt){
  console.log(arr)
  arr.forEach(function(e,i,a){
    name = e[4]
    if(players[name] != undefined){
      players[name][0] += e[2]
      players[name][1] += 1
    }
    else{
      players[name] = [0,1,e[3]]
    }
  });

  return players
}

