'use strict';
/* global d3 */

var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
var pollId = document.getElementById('pollId').value;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

d3.json(pollsApiUrl + "getresults?pollId=" + pollId, function(data){
        const svg = d3.select("svg");
        const margin = {top: 20, right: 20, bottom: 20, left: 20};
        const svgWidth = +svg.attr("width");
        const svgHeight = +svg.attr("height");
        const barGap = 5;
        const barWidth = ((svgWidth - margin.left - margin.right) - (data.pollVotes.length - 1) * (barGap)) / data.pollVotes.length;
        const maxVal = d3.max(data.pollVotes);
        const scale = d3.scaleLinear()
            .domain([0, maxVal])
            .range([margin.bottom, svgHeight - margin.top - margin.bottom]);
        
        svg.selectAll("rect")
            .data(data.pollVotes)
            .enter()
            .append("rect")
            .attr("x", (d, i) => margin.left + (i * (barWidth + barGap)))
            .attr("y", (d, i) => svgHeight - margin.bottom - scale(d))
            .attr("width", barWidth)
            .attr("height", (d, i) => scale(d))
            .attr("fill", "navy")
            .attr("class","chart-bar");
        
        svg.selectAll("text")
            .data(data.pollOptions)
            .enter()
            .append("text")
            .text((d, i) => alphabet[i] + " (" + data.pollVotes[i] + ")")
            .attr("x", (d, i) => margin.left + (i * (barWidth + barGap)))
            .attr("y", (d, i) => svgHeight - margin.bottom)
            .attr("class", "chart-text");
    });