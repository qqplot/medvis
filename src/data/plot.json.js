const startDate = new Date("2020-03-13"); // 시작 날짜 설정

async function fetchDataForDate(date) {
  const formattedDate = date.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
  const url = `https://covid-api.com/api/reports/total?date=${formattedDate}&iso=USA`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  const data = await response.json();
  return data.data;
}

async function fetch30DaysData() {
  let data = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    const dailyData = await fetchDataForDate(date);
    data.push({
      date: dailyData.date,
      deaths: dailyData.deaths,
      deaths_diff: dailyData.deaths_diff,
      confirmed: dailyData.confirmed,
      confirmed_diff: dailyData.confirmed_diff,
      active: dailyData.active,
      active_diff: dailyData.active_diff,
      recovered: dailyData.recovered,
      recovered_diff: dailyData.recovered_diff,
      fatality_rate: dailyData.fatality_rate
    });
  }
  return data;
}



async function displayData() {
  try {
    const covidData = await fetch30DaysData();
    console.log(covidData);
    process.stdout.write(JSON.stringify(covidData));
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

displayData();
