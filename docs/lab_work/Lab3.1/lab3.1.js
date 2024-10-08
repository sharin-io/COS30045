var w = 1000;
var h = 1000;
var padding = 100;

var dataset = [
    [40, 20, 5],
    [480, 90, 15],
    [250, 50, 4],
    [100, 33, 8],
    [330, 95, 6],
    [410, 12, 14],
    [475, 44, 7],
    [25, 67, 8],
    [85, 21, 13],
    [220, 88, 9]
];

var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) {
        return d[0];
    }),
    d3.max(dataset, function (d) {
        return d[0];
    })])
    .range([padding, w - padding])

var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) {
        return d[1];
    }),
    d3.max(dataset, function (d) {
        return d[1];
    })])
    .range([padding, h - padding])

var svg = d3.select("body")
    .data(dataset)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("outline", "solid thin skyblue");

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
        return xScale(d[0]);
    })
    .attr("cy", function (d) {
        return yScale(d[1]);
    })
    .attr("r", 5)
    .attr("fill", function (d) {
        if (d[0] == 250) {
            return "red";
        } else {
            return "slategrey";
        }
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function (d) {
        return xScale(d[0]);
    })
    .attr("y", function (d) {
        return yScale(d[1]);
    })
    .style("font-style", "italic")
    .style("fill", d3.color("white"))
    .text(function (d) {
        return d[0] + ", " + d[1];
    });