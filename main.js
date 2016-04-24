
//function allows us to draw the court
//arguments: svg -- the svg object for us to append the court to
//           tutorial -- 1 if it is supposed to be the court introducting
//            the different shot regions, 0 otherwise 
function drawCourt(svg, tutorial) {
  //basket
  svg.append("circle")
    .attr("cx", xScale(0))
    .attr("cy", yScale(0))
    .attr("r", (xScale(7.5) - xScale(0)))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width",1);
  
  //backboard
  svg.append("line")
    .attr("x1", xScale(-30))
    .attr("y1", yScale(-7.5))
    .attr("x2", xScale(-30) + (xScale(60) - xScale(0)))
    .attr("y2", yScale(-7.5))
    .style("stroke-width",2)
    .style("stroke", "black");

  //the paint...
  //outer box
  svg.append("rect")
    .attr("x", xScale(-80))
    .attr("y",yScale(-47.5+190))
    .attr("width",xScale(160) - xScale(0))
    .attr("height",yScale(0) - yScale(190))
    .attr("fill", "none").attr("stroke", "black");

  //inner box
  svg.append("rect")
    .attr("x", xScale(-60))
    .attr("y", yScale(-47.5+190))
    .attr("width", xScale(120) - xScale(0))
    .attr("height", yScale(0) - yScale(190))
    .attr("fill", "none")
    .attr("stroke", "black");

  //3 point line; left corner
  svg.append("line")
    .attr("x1", xScale(-220))
    .attr("y1", yScale(-47.5+140))
    .attr("x2", xScale(-220))
    .attr("y2", yScale(-47.5+140) + (yScale(0) - yScale(140)))
    .style("stroke-width",2)
    .style("stroke", "black");

  //3 point line; right side
  svg.append("line")
    .attr("x1", xScale(220))
    .attr("y1", yScale(-47.5+140))
    .attr("x2", xScale(220))
    .attr("y2", yScale(-47.5+140) + (yScale(0) - yScale(140)))
    .style("stroke-width",2)
    .style("stroke", "black");
  
  //out of bounds lines for the court 
  svg.append("rect")
    .attr("x", xScale(-250))
    .attr("y", yScale(-47.5+470))
    .attr("width", xScale(500) - xScale(0))
    .attr("height", yScale(0) - yScale(470))
    .attr("fill", "none")
    .attr("stroke", "black");

  //drawing the arcs! 

  //this is the arc marking the restricted area
  var arc_restricted = d3.svg.arc()
    .innerRadius(xScale(40) - xScale(0))
    .outerRadius(xScale(40) - xScale(0))
    .startAngle(-90 * (Math.PI/180)) //converting from degs to radians
    .endAngle(Math.PI/2) //just radians

  svg.append("path")
    .attr("d", arc_restricted)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("transform", "translate("+xScale(0)+","+yScale(0)+")");

  //this is the arc on top of the free throw line
  var arc_top_ft = d3.svg.arc()
    .innerRadius(xScale(60) - xScale(0))
    .outerRadius(xScale(60) - xScale(0))
    .startAngle(-90 * (Math.PI/180)) //converting from degs to radians
    .endAngle(Math.PI/2) //just radians

  svg.append("path")
    .attr("d", arc_top_ft)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("transform", "translate("+xScale(0)+","+yScale(142.5)+")");

  //this is the arc on the bottom of the free throw line
  var arc_bottom_ft = d3.svg.arc()
    .innerRadius(xScale(60) - xScale(0))
    .outerRadius(xScale(60) - xScale(0))
    .startAngle(270 * (Math.PI/180)) //converting from degs to radians
    .endAngle(Math.PI/2) //just radians

  svg.append("path")
    .attr("d", arc_bottom_ft)
    .style("stroke-dasharray", ("5, 10"))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("transform", "translate("+xScale(0)+","+yScale(142.5)+")");

  //this is the arc marking the rest of the 3 point line
  var arc_three = d3.svg.arc()
    .innerRadius(xScale(237.5) - xScale(0))
    .outerRadius(xScale(237.5) - xScale(0))
    .startAngle(-68 * (Math.PI/180)) //converting from degs to radians
    .endAngle(68 * (Math.PI/180)) //just radians

  svg.append("path")
    .attr("d", arc_three)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("transform", "translate("+xScale(0)+","+yScale(0)+")")
    .style("stroke-width",2)
    .style("stroke", "black");

  //if the tutorial is 1, we add labels to the different regions
  //of the court 
  if(tutorial == 1) {

    //marking the above the break 3 point line
    var arc_above_the_break_3 = d3.svg.arc()
      .innerRadius(352)
      .outerRadius(372)
      .startAngle(-69 * (Math.PI/180)) //converting from degs to radians
      .endAngle(69 * (Math.PI/180)) //just radians

    svg.append("path")
    .attr("d", arc_above_the_break_3)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("transform", "translate("+xScale(1)+","+yScale(0)+")");

    svg.append("text").attr("x",325).attr("y",225).attr("font-size",15).text("Above the Break 3: anywhere beyond here!");

    //marking the restricted area
    var arc_restricted_label = d3.svg.arc()
      .innerRadius(70)
      .outerRadius(90)
      .startAngle(-90 * (Math.PI/180)) //converting from degs to radians
      .endAngle(Math.PI/2) //just radians

    svg.append("path")
    .attr("d", arc_restricted_label)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("transform", "translate("+xScale(0)+","+yScale(0)+")");

    
    svg.append("text").attr("x",355).attr("y",600).attr("font-size",15).text("Restricted Area: Between this arc and the basket!");

    svg.append("text").attr("x",105).attr("y",600).attr("font-size",15).text("Left Corner 3; behind this line!");

    svg.append("text").attr("x",735).attr("y",600).attr("font-size",15).text("Right Corner 3; behind this line!");

    //marking the paint (non-RA) area
    svg.append("rect").attr("x", xScale(-80)).attr("y",yScale(-47.5+190)).attr("width",xScale(160) - xScale(0)).attr("height",yScale(0) - yScale(190)).attr("fill", "none").attr("stroke", "blue");

    svg.append("text").attr("x",345).attr("y",450).attr("font-size",15).text("In the Paint (non-RA); in the blue box but not in the arc!");

    svg.append("text").attr("x",325).attr("y",375).attr("font-size",15).text("Mid-Range: in between the 3-pt line but outside the paint!");

    svg.append("text").attr("x",300).attr("y",75).attr("font-size",15).text("This red dot means the shot attempted at this location was not converted!");
    svg.append("circle").attr("cx",500).attr("cy",100).attr("r",3).attr("fill","red").attr('fill-opacity', 0.2);

    svg.append("text").attr("x",300).attr("y",150).attr("font-size",15).text("This blue dot means the shot attempted at this location was converted!");
    svg.append("circle").attr("cx",500).attr("cy",175).attr("r",3).attr("fill","blue").attr('fill-opacity', 0.2);

   svg.append("text").attr("x",300).attr("y",25).attr("font-size",15).text("Backcourt: shots attempted from the other half of the court!");


  }

} 
var drag = d3.behavior.drag()
  .on("drag", dragging);

// Function that is called every time the mouse is dragged
function dragging(d){
  // Mouse coords to calculate circle radius
  var coords = d3.mouse(this);
  var x = coords[0];
  var y = coords[1];

  var circle = svg.select(".selection"); // Circle element that we will get and alter attributes from
  var cx = circle.attr("cx");
  var cy = circle.attr("cy");
  var r = Math.max(Math.sqrt(Math.pow(x - circle.attr("cx"), 2) 
    + Math.pow(y - circle.attr("cy"),2)), 10) // Distance formula


  circle.attr("r",r)

  // Get all hexes, see if they are within a radius of the circle, color them if they are
  var hexs = d3.selectAll(".hexagon").filter(function(d){
    var hex = d3.select(this);
    var hexX = d3.transform(hex.attr("transform")).translate[0];
    var hexY = d3.transform(hex.attr("transform")).translate[1];
    var distance = Math.sqrt(Math.pow((hexX - cx),2) + Math.pow((hexY - cy),2))

    if (distance <= r){
      hex.style("fill", "black")
      selectedShots = selectedShots.concat(hex.data()[0]) //add shots to selected shot list 
    }
  })      
}

// clears selected list and resets the colors of the hexes
function clearSelection(){
  selectedShots = [];
  d3.selectAll(".hexagon").filter(function(d){
    var hex = d3.select(this);
    hex.style("fill", function(d){
        var makes = 0.;
        d.forEach(function(shot){
          makes += shot[2];
        })
        return color(makes/d.length)
      })
  })
}

var height = 800;
var width = 800;
var svg = d3.select("#court_area")
  .attr("height", height)
  .attr("width", width)
  .call(drag);

var selectedShots=[];

var padding = 15;
var xScale = d3.scale.linear()
  .domain([-250, 250])
  .range([padding, width - padding]);

var yScale = d3.scale.linear()
  .domain([-50, 470])
  .range([height - padding, 0]);

drawCourt(svg, 0);

// Initialized season players map and players map
var season_players_map;
var players_map;

// Color scale for hexes
var color = d3.scale.linear()
    .domain([0, 1])
    .range(["orange", "steelblue"])
    .interpolate(d3.interpolateLab);

var hexbin = d3.hexbin()
    .radius(5)

// Import all data from the json
d3.json("dictionary.json", function(error, result) { 

      season_players_map = JSON.parse(result);
      plotShots(svg, "2015-16");
});

// Arguments:
//     season = selected season
//     svg = svg adding elements to

//     Creates hexbins using imputed season and global data initialized above.
//     Creates clicking events for hexbins
function plotShots(svg, season) {
  players_map = season_players_map[season];
  var shots = [];
  for (var key in players_map) {
  	if(players_map.hasOwnProperty(key)) {
  		shots = shots.concat(players_map[key][3])
    }
  }

  svg.append("g")
    .attr("clip-path", "url(#clip)")
    .selectAll(".hexagon")
      .data(hexbin(shots))
    .enter().append("path")
      .attr("class", "hexagon")
      .attr("d", hexbin.hexagon(7.5))
      .attr("transform", function(d) { 
        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; })
      .style("fill", function(d){ // color hexes based on average shot
        var makes = 0.;
        d.forEach(function(shot){
          makes += shot[2]
        })
        return color(makes/d.length)
      })

//Keep This for testing hexbins
  // for(var i = 0; i < shots.length; i++) {
  //  svg.append("circle")
  //   .attr("cx",xScale(shots[i][0]))
  //   .attr("cy",yScale(shots[i][1]))
  //   .attr("r",.7)
  //   .attr("fill","black")
  //   .attr('fill-opacity', 1);

  //   }

  // Select or deselect shots if clicked on
  svg.selectAll(".hexagon").on("mousedown", function(d){
    if (d3.select(this).style("fill") == "rgb(0, 0, 0)"){
      d3.select(this).style("fill", function(d){
        var makes = 0.;
        d.forEach(function(shot){
          makes += shot[2]
          // Remove shots from selected list of shots
          var index = selectedShots.indexOf(shot);
          index >= 0 && selectedShots.splice(index,1)
        })
        return color(makes/d.length)
      })
    }
    else{
      addPlayerCards(d)
      d3.select(this).style("fill", "rgb(0, 0, 0)")
    }
  })
}


// Create a new circle and then have dragging() handle the rest of the math for 
// selecting hexbins
/*svg.on("mousedown", function(){
  svg.select(".selection").remove();
  var coords = d3.mouse(this);
  var x = coords[0];
  var y = coords[1];
  svg.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 0)
    .attr("class", "selection")
    .style("opacity",0)

})*/

// Call clear selection when button is clicked.
d3.select("#clearSelection").on("click", function(d){
  clearSelection();
  removeCards()
})


