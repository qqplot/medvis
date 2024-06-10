import * as Plot from "npm:@observablehq/plot";

async function fetchData() {
  const response = await fetch('https://api.example.com/covid/historical/30days'); // 예시 API URL
  const rawData = await response.json();
  const data = rawData.map(day => ({
    date: day.date,
    value: day.deaths
  }));
  return data;
}

async function renderPlot() {
  const data = await fetchData();
  const plot = DailyPlot(data, {
    width: 800,
    height: 400,
    marginLeft: 40,
    title: "Daily COVID-19 Deaths in the Last 30 Days"
  });
  document.getElementById('plot').appendChild(plot);
}

renderPlot();
