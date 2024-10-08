// Set the width and height of the SVG
var w = 1000;
var h = 1000;
// Set padding to create margins
var padding = 100;
// Define the dataset: each subarray contains [x, y, z] values
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
// Create x-scale
var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) { return d[0]; }), // Min x value
    d3.max(dataset, function (d) { return d[0]; })]) // Max x value
    .range([padding, w - padding]); // Output range
// Create y-scale
var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) { return d[1]; }), // Min y value
    d3.max(dataset, function (d) { return d[1]; })]) // Max y value
    .range([h - padding, padding]); // Output range (flipped for SVG)

// Create x-axis
var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);

// Create y-axis
var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5);

// Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("outline", "solid thin black");

// Create circles
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) { return xScale(d[0]); }) // x-coordinate
    .attr("cy", function (d) { return yScale(d[1]); }) // y-coordinate
    .attr("r", 5) // radius
    .attr("fill", function (d) {
        // Color the circle red if x-value is 250, otherwise yellow
        if (d[0] == 250) {
            return "red";
        } else {
            return "yellow";
        }
    });

// Add text labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function (d) { return xScale(d[0]); }) // x-position of text
    .attr("y", function (d) { return yScale(d[1]) - 10; }) // y-position of text, slightly above the point
    .style("font-style", "italic")
    .style("fill", "white") // Changed from white to black for better visibility
    .style("font-size", "12px") // Added for better readability
    .text(function (d) { return d[0] + ", " + d[1]; }); // Text content

// Add x-axis
svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("fill", "white");

// Add y-axis
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)
    .selectAll("text")
    .style("fill", "white");

// Add x-axis label
svg.append("text")
    .attr("transform", "translate(" + (w / 2) + " ," + (h - padding / 3) + ")")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("X-axis");

// Add y-axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", padding / 2)
    .attr("x", 0 - (h / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Y-axis");