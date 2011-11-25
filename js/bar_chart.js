/*
   Most of this code is taken from the examples.
   mbostock examples are fantastic.
*/
function render_group_bar_chart(data, max, n_periods, periods, n_authors, authors) {
    var w = 600, h = 480, right_padding = 200
    x = d3.scale.linear().domain([max, 0]).range([h, 0]),
    y0 = d3.scale.ordinal().domain(d3.range(n_periods)).rangeBands([0, w], 0.2),
    y1 = d3.scale.ordinal().domain(d3.range(n_authors)).rangeBands([0, y0.rangeBand()]),
    z = d3.scale.category10();

    var vis = d3.select("#bar_all")
        .append("svg:svg")
        .attr("width", w + right_padding)
        .attr("height", h + 40)
        .append("svg:g")
        .attr("transform", "translate(10,10)");

    var g = vis.selectAll("g")
        .data(data)
        .enter().append("svg:g")
        .attr("fill", function(d, i) { return z(i); })
        .attr("transform", function(d, i) { return "translate(" + y1(i) + ",0)"; });

    var rect = g.selectAll("rect")
        .data(Object)
        .enter().append("svg:rect")
        .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
        .attr("width", y1.rangeBand())
        .attr("height", x)
        .attr("y", function(d) { return h - x(d); });

    g.attr("class", "commit_rect")
        .append("svg:title")
        .text(function(d, i) { return authors[i]; });

    /* add the labels for the periods */
    vis.selectAll("text.yaxis")
        .data(d3.range(n_periods))
        .enter().append("svg:text")
        .attr("class", "group")
        .attr("transform", function(d, i) { return "translate(" + y0(i) + ",0)"; })
        .attr("x", y0.rangeBand() / 2)
        .attr("y", h + 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(function(d, i) { return periods[i]; });

    vis.selectAll("legend.rect")
        .data(data)
        .enter().append("svg:rect")
        .attr("x", w)
        .attr("y", function(d, i) { return y0.rangeBand()/2 + i*12 })
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d, i) { return z(i); });

    vis.selectAll("legend.name")
        .data(data)
        .enter().append("svg:text")
        .attr("class", "group")
        .attr("x", w+12)
        .attr("y", function(d, i) { return y0.rangeBand()/2+i*12 })
        .attr("dy", ".71em")
        .attr("text-anchor", "left")
        .text(function(d, i) { return authors[i]; });

    vis.append("svg:line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", h)
        .attr("stroke", "black");

    /* bottom line */
    vis.append("svg:line")
        .attr("x1", 0)
        .attr("x2", w)
        .attr("y1", h)
        .attr("y2", h)
        .attr("stroke", "black");
}

function render_bar_chart(data, max, authors) {
    var w = 600, h = 480, right_padding = 200,
    data_period = get_data_from_period(),
    z = d3.scale.category10();

    var x = d3.scale.linear().domain([0, max]).range([0, w/2]);
    var y = d3.scale.ordinal().domain(data_period).rangeBands([0, h/2]);

    var chart = d3.select("#bar_period")
        .append("svg:svg")
        .attr("class", "chart")
        .attr("width", w+200)
        .attr("height", h*.6)
        .style("margin-left", "32px")
        .append("svg:g")
        .attr("transform", "translate(10,15)");

    chart.selectAll("line")
        .data(x.ticks(10))
        .enter().append("svg:line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", h*.5)
        .attr("stroke", "#ccc");

    chart.selectAll("text.rule")
        .data(x.ticks(10))
        .enter().append("svg:text")
        .attr("x", x)
        .attr("y", 0)
        .attr("dy", -3)
        .attr("text-anchor", "middle")
        .text(String);

    var rect = chart.selectAll("rect")
        .data(data_period)
        .enter().append("svg:rect")
        .attr("y", y)
        .attr("width", x)
        .attr("height", y.rangeBand())
        .attr("fill", function(d, i) { return z(i) });

    chart.selectAll("text.bar")
        .data(data_period)
        .enter().append("svg:text")
        .attr("class", "bar")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(String);


    rect.attr("class", "commit_rect")
        .append("svg:title")
        .text(function(d, i) { return authors[i]; });

    chart.append("svg:line")
        .attr("y1", 0)
        .attr("y2", h*.5)
        .attr("stroke", "#000");

    function get_data_from_period() {
        var tmp = [];
        for (var i=0; i<data.length; i++)
            tmp.push(data[i][period_idx]);
        return tmp;
    }
}
