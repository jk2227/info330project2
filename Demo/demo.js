var height = 400;
var width = 400;


// Circle Drawing Demo
var drag = d3.behavior.drag()
	.on("drag", dragging);

function dragging(d){
	var coords = d3.mouse(this);
	var circle = svg.select("circle");
	var x = coords[0];
	var y = coords[1];
	var r = Math.max(Math.sqrt(Math.pow(x - circle.attr("cx"), 2) + Math.pow(y - circle.attr("cy"),2)), 5)

	circle.attr("r",r)
		
}

var svg = d3.select("#demo1").append("svg")
	.attr("height", height)
	.attr("width", width)
	.call(drag)

svg.on("mousedown", function(){
	svg.select("circle").remove();
	var coords = d3.mouse(this);
	var x = coords[0];
	var y = coords[1];
	svg.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", 5)
})

svg.on("mouseup", function(){
	svg.select("circle")
		.style("fill","red")
})


// Hexbin Demo
var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80);

var points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

var color = d3.scale.linear()
    .domain([0, 20])
    .range(["orange", "steelblue"])
    .interpolate(d3.interpolateLab);

var svg2 = d3.select("#demo2").append("svg")
	.attr("height", height)
	.attr("width", width)


var hexbin = d3.hexbin()
    //.size([width, height])
    .radius(10);

svg2.append("g")
    .attr("clip-path", "url(#clip)")
  .selectAll(".hexagon")
    .data(hexbin(points))
  .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", hexbin.hexagon())
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("fill", "white")

svg2.selectAll(".hexagon").on("click", function(d){
	d3.select(this).style("fill", function(d) { return color(d.length); })
})
