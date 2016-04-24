var $grid = $('.player-cards').masonry({
  itemSelector: '.player-card',
  columnWidth: 40,
  gutter: 10
});

function removeCards(){
  div = $(".player-cards");
  console.log(div.children())
  div.masonry( 'remove', div.children() )
  div.clear();
}

function addPlayerCards(arr){
  arr = sortShots(arr)
  var div = $(".player-cards")
  cards = []
  for(var key in arr){
    var card = makePlayerCard(key,202681,arr[key])
    cards.push(card)
  }
  console.log("dsfsd")
  var c = $(cards);
  $grid.append( c ).masonry( 'appended', c );

}

function makePlayerCard(name,id,shots){
  var elem = document.createElement('div');
  elem.innerHTML = 
  "<div class='flip-container player-card' ontouchstart='this.classList.toggle('hover');''>"+
    "<div class='flipper'>" + 
      "<div class='front' >" + 
        "<img src='http://stats.nba.com/media/players/230x185/201566.png'>"+
        "<span class='name'>"+name+"</span>" + 
      "</div>" + 
      "<div class='back'>" + 
        "<div class='stats'>"+
          "<p>Percent of total shots attempted here: </p>" + 
          "<p>Percent of shots in selected area made: </p>" + 
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
  players = {}
  arr.forEach(function(e,i,a){
    name = e[3]
    if(players[name] != undefined){
      players[name] += e[2]
    }
    else{
      players[name] = 0
    }
  });

  return players
}




