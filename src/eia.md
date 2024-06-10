---
theme: dashboard
---

# COVID 19 grid

```js
// Import components
import {top5BalancingAuthoritiesChart1, top5BalancingAuthoritiesChart2, top5BalancingAuthoritiesChart3} from "./components/charts.js";
import {balancingAuthoritiesLegend, balancingAuthoritiesMap} from "./components/map.js";
```

```js
//
// Load data snapshots
//

// Balancing authority demand
// const baHourlyDemand = FileAttachment("data/eia-ba-hourly.csv").csv({typed: true});

const covid = FileAttachment("data/preprocessed_all.csv").csv({typed: true});

//
// Spatial data (country, states, BA locations)
//

// US states
const us = FileAttachment("data/us-states.json").json();
const nation = us.then((us) => us.features.find(({id}) => id === "nation"));
const statemesh = us.then((us) => us.features.find(({id}) => id === "statemesh"));

// Balancing authority representative locations
const eiaPoints = FileAttachment("data/preprocessed_all.csv").csv({typed: true});
```

```js
// const baHourlyClean = baHourlyDemand
//   .map((d) => ({
//     "Date": timeParse(d.period).toLocaleString("en-us", {month: "short", day: "2-digit", hour: "2-digit"}),
//     "Balancing authority": d.ba,
//     "Abbreviation": d.baAbb,
//     "Type": "Demand",
//     "Value (GWh)": d.value / 1000
//   }));
const baHourlyClean = covid
  .map((d) => ({
    "Date": timeParse(d.time).toLocaleString("en-us", {month: "short", day: "2-digit"}),
    "Confirmed": d.Confirmed,
    "Infected": d.Infected,
    "Fatality": d.Fatality
  }));
```

```js
// Most recent hour for each BA
// const baHourlyAll = d3.range(0, hoursBackOfData + 1).map((hour) => d3.rollup(baHourlyDemand, (d) => d[hour]?.value, d => d["ba"]));
const baHourlyAll = d3.range(0, hoursBackOfData + 1).map((hour) => d3.rollup(covid, (d) => d[hour]?.Confirmed, d => d["country"]));
const baHourlyCurrent = baHourlyAll[hoursAgo];
const baHourlyLatest = baHourlyAll[0];

const baHourlyAll2 = d3.range(0, hoursBackOfData + 1).map((hour) => d3.rollup(covid, (d) => d[hour]?.Infected, d => d["country"]));
const baHourlyCurrent2 = baHourlyAll2[hoursAgo];

const baHourlyAll3 = d3.range(0, hoursBackOfData + 1).map((hour) => d3.rollup(covid, (d) => d[hour]?.Fatality, d => d["country"]));
const baHourlyCurrent3 = baHourlyAll3[hoursAgo];

```

```js
// Top 5 BAs by demand
function computeTopDemand(baHourly) {
  return Array
    .from(baHourly, ([name, value]) => ({name, value}))
    .sort(((a, b) => b.value - a.value))
    .slice(0, 5);
}
const top5LatestDemand = computeTopDemand(baHourlyCurrent);
const maxDemand = d3.max(baHourlyAll.map((demand) => computeTopDemand(demand)[0].value));
const top5LatestDemand2 = computeTopDemand(baHourlyCurrent2);
const maxDemand2 = d3.max(baHourlyAll2.map((demand) => computeTopDemand(demand)[0].value));
const top5LatestDemand3 = computeTopDemand(baHourlyCurrent3);
const maxDemand3 = d3.max(baHourlyAll3.map((demand) => computeTopDemand(demand)[0].value));
```

```js
// Percent change for most recent 2 hours of data by BA
// const baHourlyChange = d3.rollup(baHourlyDemand, (d) => ((d[hoursAgo]?.value - d[hoursAgo + 1]?.value) / d[hoursAgo]?.value) * 100, (d) => d["ba"] );
const baHourlyChange = d3.rollup(covid, (d) => ((d[hoursAgo]?.Infected - d[hoursAgo + 1]?.Infected) / d[hoursAgo]?.Infected) * 100, (d) => d["country"] );
```

```js
// Date/time format/parse
// const timeParse = d3.utcParse("%Y-%m-%dT%H");
const timeParse = d3.utcParse("%Y/%m/%d");
const hourFormat = d3.timeFormat("%-I %p");

// Configure hours ago input
const MS_IN_AN_HOUR = 1000 * 60 * 60 * 24;
// const hours = [...new Set(baHourlyDemand.map(d => d.period))].map(timeParse);
const hours = [...new Set(covid.map(d => d.time))].map(timeParse);
const [startHour, endHour] = d3.extent(hours);
const hoursBackOfData = Math.ceil(Math.abs(endHour - startHour) / (MS_IN_AN_HOUR)) - 1;
const hoursAgoInput = Inputs.range([hoursBackOfData, 0], {step: 1, value: 0, width: 150});
const hoursAgo = Generators.input(hoursAgoInput);
hoursAgoInput.querySelector("input[type=number]").remove();
```

```js
// Get current date in readable format
const formatDate = d3.utcFormat("%B %d, %Y");
const currentHour = new Date(endHour.getTime() - hoursAgo * MS_IN_AN_HOUR);
const currentDate = d3.timeFormat("%-d %b %Y")(currentHour);
```

```js
function centerResize(render) {
  const div = resize(render);
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
  return div;
}
```

<div class="grid grid-cols-4">
  <div class="card grid-colspan-2 grid-rowspan-3">
    <h2>Change in Growth Rate from previous days</h2>
    <figure style="max-width: none;">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h1 style="margin-top: 0.5rem;">${currentDate}</h1>
        <div style="display: flex; align-items: center;">
          <div>-${hoursBackOfData} days</div>
          ${hoursAgoInput}
          <div style="padding-left: 0.5rem;">now</div>
        </div>
      </div>
      ${centerResize((width) => balancingAuthoritiesMap({
        baHourlyChange,
        baHourlyLatest,
        eiaPoints,
        nation,
        statemesh,
        width
      }))}
      ${centerResize((width) => balancingAuthoritiesLegend(width))}
    </figure>
  </div>
  <div class="card grid-colspan-2">
    <h2>Top 5 Confirmed by demand on ${currentDate}</h2>
    ${resize((width, height) => top5BalancingAuthoritiesChart1(width, height, top5LatestDemand, maxDemand))}
  </div>
  <div class="card grid-colspan-2">
    <h2>Top 5 Newly Infected on ${currentDate}</h2>
    ${resize((width, height) => top5BalancingAuthoritiesChart2(width, height, top5LatestDemand2, maxDemand2))}
  </div>
  <div class="card grid-colspan-2">
    <h2>Top 5 Fatality on ${currentDate}</h2>
    ${resize((width, height) => top5BalancingAuthoritiesChart3(width, height, top5LatestDemand3, maxDemand3))}
  </div>
</div>

<div class="card" style="padding: 0;">
  ${Inputs.table(baHourlyClean, {rows: 16})}
</div>



<!-- <div class="small note">This page reenvisions parts of the US Energy Information Administration’s <a href="https://www.eia.gov/electricity/gridmonitor/dashboard/electric_overview/US48/US48">Hourly Electric Grid Monitor</a>. Visit <a href="https://www.eia.gov/electricity/gridmonitor/about">About the EIA-930 data</a> to learn more about data collection and quality, the US electric grid, and balancing authorities responsible for nationwide electricity interchange.</p> -->
