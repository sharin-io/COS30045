var dataset = [14, 5, 26, 3, 9];
d3.select("body").selectAll("p")
    .dataset(dataset)
    .enter()
    .append("p")
    .text(function (d) {
        searchResult = "Joe watched " + d + " cat videos today.";
        if (d > 10) {
            return "Warning: " + searchResult;
        } else {
            return searchResult;
        }
    });