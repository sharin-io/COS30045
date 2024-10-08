// Set the dimensions and margins of the graph
var w = 800;
var h = 800;
var padding = 50;

// Define initial dataset
var dataset = [14, 5, 26, 23, 9, 29, 7, 35, 19];

// Set the maximum value for data generation
var maxValue = 25;

// Create scales
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([padding, w - padding])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h - padding, padding]);

// Create SVG element
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", d3.color("skyblue"));

// Create x-axis
var xAxis = d3.axisBottom(xScale);
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

// Create y-axis
var yAxis = d3.axisLeft(yScale);
svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// Add y-axis label
svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", padding / 2)
    .attr("x", -(h / 2))
    .text("Value");

// Function to update the bars on the chart
function updateBars(data) {
    // Update scales
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data)]);

    // Update x-axis
    svg.select(".x-axis").transition().duration(500).call(xAxis);

    // Update y-axis
    svg.select(".y-axis").transition().duration(500).call(yAxis);

    // Join new data
    var bars = svg.selectAll("rect")
        .data(data);

    // Update bars
    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) { return yScale(d); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return h - padding - yScale(d); })
        .attr("fill", "brown");

    // Remove old bars
    bars.exit().remove();

    // Update text labels
    var labels = svg.selectAll(".bar-label")
        .data(data);

    labels.enter()
        .append("text")
        .attr("class", "bar-label")
        .merge(labels)
        .transition()
        .duration(500)
        .attr("x", function (d, i) { return xScale(i) + xScale.bandwidth() / 2; })
        .attr("y", function (d) { return yScale(d) - 5; })
        .attr("text-anchor", "middle")
        .text(function (d) { return d; });

    labels.exit().remove();
}

// Initial chart creation
updateBars(dataset);

// Function to generate a new dataset
function generateDataset(numValues, maxValue) {
    var data = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        data.push(newNumber);
    }
    return data;
}

// D3 event handler for the button
d3.select("button").on("click", function () {
    var newDataset = generateDataset(dataset.length, maxValue);
    updateBars(newDataset);
});