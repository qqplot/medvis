// import {require} from "npm:d3-require";
// const d3 = await require("d3@6");

// // set the dimensions and margins of the graph
// const margin = {top: 10, right: 20, bottom: 30, left: 50},
//     width = 500 - margin.left - margin.right,
//     height = 420 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

// //Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(data) {

//   // Add X axis
//   const x = d3.scaleLinear()
//     .domain([0, 12000])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   const y = d3.scaleLinear()
//     .domain([35, 90])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add a scale for bubble size
//   const z = d3.scaleLinear()
//     .domain([200000, 1310000000])
//     .range([ 4, 40]);

//   // Add a scale for bubble color
//   const myColor = d3.scaleOrdinal()
//     .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
//     .range(d3.schemeSet2);

//   // -1- Create a tooltip div that is hidden by default:
//   const tooltip = d3.select("#my_dataviz")
//     .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("background-color", "black")
//       .style("border-radius", "5px")
//       .style("padding", "10px")
//       .style("color", "white")

//   // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
//   const showTooltip = function(event, d) {
//     tooltip
//       .transition()
//       .duration(200)
//     tooltip
//       .style("opacity", 1)
//       .html("Country: " + d.country)
//       .style("left", (event.x)/2 + "px")
//       .style("top", (event.y)/2+30 + "px")
//   }
//   const moveTooltip = function(event, d) {
//     tooltip
//       .style("left", (event.x)/2 + "px")
//       .style("top", (event.y)/2+30 + "px")
//   }
//   const hideTooltip = function(event, d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .join("circle")
//       .attr("class", "bubbles")
//       .attr("cx", d => x(d.gdpPercap))
//       .attr("cy", d => y(d.lifeExp))
//       .attr("r", d => z(d.pop))
//       .style("fill", d => myColor(d.continent))
//     // -3- Trigger the functions
//     .on("mouseover", showTooltip )
//     .on("mousemove", moveTooltip )
//     .on("mouseleave", hideTooltip )

//   })


import {require} from "npm:d3-require";
const d3 = await require("d3@6");

// Set the dimensions and margins of the graph
const margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom,
    timeBarHeight = 20;

// Append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);



// Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then(function(data) {
d3.csv("https://raw.githubusercontent.com/qqplot/qqplot.github.io/main/data/simulated_time_series_data.csv").then(function(data) {    

  // Parse dates and sort data
  data.forEach(d => {
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
  });
  data.sort((a, b) => a.date - b.date);

  // Unique dates for the scrubber
  const dates = Array.from(new Set(data.map(d => +d.date)));
  dates.sort(d3.ascending);

  // Add X axis
  const x = d3.scaleLinear()    
    .domain([0, 12000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  const myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet2);


  // Play/Pause button
  let playing = false;
  const playButton = d3.select("#playButton")
    .on("click", function() {
      playing = !playing;
      if (playing) {
        playButton.text("Pause");
        playAnimation();
      } else {
        playButton.text("Play");
        clearInterval(animation);
      }
    });

  // Scrubber (slider) to control the time
  const scrubber = d3.select("#scrubber")
      .attr("min", 0)
      .attr("max", dates.length - 1)
      .attr("value", 0)
      .attr("step", 1)
      .on("input", function() {
        const dateIndex = dates[+this.value];
        updateChart(new Date(dateIndex));
      });




  // Create a tooltip div that is hidden by default
  const tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // Functions for tooltip behavior
  const showTooltip = function(event, d) {
    d3.select('.tooltip') // D3를 사용하여 tooltip div를 다시 선택
      .transition()
      .duration(200)
      .style("opacity", 1); // 투명도 전환을 완료한 후 HTML 내용을 설정
    d3.select('.tooltip')
      .html("Country: " + d.country + "<br>GDP per Capita: " + d.gdpPercap + "<br>Life Expectancy: " + d.lifeExp + "<br>Population: " + d.pop)
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY - 28) + "px");
  }
  const moveTooltip = function(event, d) {
    d3.select('.tooltip')
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY - 28) + "px");
  }
  const hideTooltip = function(event, d) {
    d3.select('.tooltip')
      .transition()
      .duration(200)
      .style("opacity", 0);
  }

// Function to update the chart for a given date
function updateChart(currentDate) {
    const currentDateData = data.filter(d => +d.date === +currentDate);

    const bubbles = svg.selectAll(".bubble")
      .data(currentDateData, d => d.country);

    bubbles.enter()
      .append("circle")
        .attr("class", "bubble")
        .attr("cx", d => x(d.gdpPercap))
        .attr("cy", d => y(d.lifeExp))
        .attr("r", d => z(d.pop))
        .style("fill", d => myColor(d.continent))
        // -3- Trigger the functions
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )
      .merge(bubbles)
        .transition()
        .duration(1000)
        .attr("cx", d => x(d.gdpPercap))
        .attr("cy", d => y(d.lifeExp))
        .attr("r", d => z(d.pop))
        .style("fill", d => myColor(d.continent))
        ;
    bubbles.exit().remove();
  }



  let animation; // To store interval ID
  function playAnimation() {
    let value = +scrubber.property("value");

    animation = setInterval(() => {
      value++;
      if (value >= dates.length) {
        playButton.text("Play");
        value = 0; // Reset to start
        clearInterval(animation);
        playing = false;
        updateChart(new Date(dates[value]));
      }
      scrubber.property("value", value);
      updateChart(new Date(dates[value]));
    }, 1500);
  }

});
