function removeCards(){
  div = $(".player-cards");
  div.empty();
}

function playerCards(arr){
  div = $(".player-cards")
  arr.forEach(function(e,i,a){
    var card = makePlayerCard(e[3],202681)
    div.append(card)
  })
}

function makePlayerCard(name,id){
  var html = 
  "<div class='player-card'>" +
    "<img id='prof-pic' src='http://stats.nba.com/media/players/230x185/"+id+".png'>" +
    "<h1>" + name + "</h1>" +
    "<div class='stats'>" +
      "<h3>Pts: </h3>" +
      "<h3 class='pts'>12</h3>" +
      "<h3>Reb: </h3>" +
      "<h3 class='reb'>5.4</h3>" +
      "<h3>Asst: </h3>"
      "<h3 class='asst'>18.2</h3>" +
    "</div>" +
  "</div>" 

  return html
}