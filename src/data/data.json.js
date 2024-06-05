import {require} from "npm:d3-require";
const d3 = await require("d3@5");

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv")

const longitude = -122.47;
const latitude = 37.80;

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

// const station = await json("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv");
// const forecast = await json(station.properties.forecastHourly);

const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv");

process.stdout.write(JSON.stringify(data));

