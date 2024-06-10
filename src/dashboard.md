---
theme: dashboard
title: COVID-19 Global Dashboard
toc: false
---

# Global COVID-19 Statistics 🌍

```js
const data = FileAttachment("./data/plot.json").json();
```

```js
display(
    const plot = DailyPlot(data, {
    width: 800,
    height: 400,
    marginLeft: 40,
    title: "Daily COVID-19 Deaths in the Last 30 Days"
  });
);
```
Data Source: [COVID-19 API](https://covid-api.com/api/)


이 코드 블록은 COVID-19 전역 통계를 실시간으로 시각화합니다. 국가별 데이터를 표시하려면 API 엔드포인트를 변경하고, 해당 국가 코드를 사용하여 데이터를 필터링해야 할 것입니다. Observable에서 자바스크립트 코드를 통해 비동기적으로 데이터를 로드하고, 플롯을 사용하여 시각적으로 표현할 수 있습니다.