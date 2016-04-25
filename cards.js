$(".player-cards").isotope({
  itemSelector: '.player-card',
  layoutMode: 'fitRows',
  getSortData : {
      attempts : function ( elem ) {
        return parseInt( $(elem).find('#attempts').text(), 10 );
      },
      made : function ( elem ) {
        return parseFloat( $(elem).find('#made').text() );
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
}

function sort(opt){
  console.log("fdsa")
  $('.player-cards').isotope({ sortBy : opt, sortAscending : false});
}

function makePlayerCard(name,id,shots,attempts){
  var elem = document.createElement('div');
  elem.innerHTML = 
  "<div class='flip-container player-card' id='"+id+"' ontouchstart='this.classList.toggle('hover');''>"+
    "<div class='flipper'>" + 
      "<div class='front' >" + 
        "<img src='http://stats.nba.com/media/players/230x185/"+id+".png'>"+
        "<span class='name'>"+name + "</span>" + 
      "</div>" + 
      "<div class='back'>" + 
        "<div class='stats'>"+
          "<p>Shots Attempted: </p>" +
          "<p id='attempts'>" + attempts + "</p>" + 
          "<p>Shots made: </p>" + 
          "<p id='made'>" + shots + "</p>" + 
        "</div>" + 
        "<div class='buttons'>"+
          "" + 
        "</div>" + 
      "</div>" + 
    "</div>" + 
  "</div>"; 


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

