function _1(md){return(
md`# Vizabi reading a csv file from google spreadsheets`
)}

function _url(Inputs){return(
Inputs.text({label: "url", value: "https://docs.google.com/spreadsheets/d/1kLB8jH3hX3nfdK3uusy_xXCe8PYChKqnYC9SyTuRtO4/edit?gid=0#gid=0"})
)}

function _3(url){return(
url
)}

function _sheet(Inputs){return(
Inputs.text({label: "sheet", value: "Sheet1"})
)}

function _5(chart,url,sheet){return(
chart(url, sheet)
)}

function _6(md){return(
md`# Integration code`
)}

function _chart(d3,html,BubbleChart,Vizabi,data_config,mobx,ui_config,en_url){return(
(url, sheet, custom) => {
  const placeholder = d3.select(html`<div style="height: 60vw"/>`).node()

  new BubbleChart.Base({
    Vizabi,
    model: Vizabi(data_config(url, sheet, custom)),
    ui: mobx.observable({}),
    default_ui: ui_config,
    locale: { placeholder, resolve: { "en": en_url } },
    layout: { placeholder },
    placeholder,
    options: {
      showLoading: true
    }
  });
  //cell must return a detatched DOM node so that observable can show it
  return placeholder;
}
)}

function _8(md){return(
md`# Chart config`
)}

function _data_config(deepmerge){return(
(url, sheet, custom = {}) => deepmerge({
  markers: {
    bubble: {
      data: { source: "data1" }
    }
  },
  dataSources: {
    data1: {
      path: url,
      sheet: sheet,
      timeInColumns: "",
      hasNameColumn: "",
      modelType: "google_csv",
      locale: "en"
    }
  }
}, custom)
)}

function _ui_config(){return(
{
  chart: {
    show_ticks: true,
    showForecast: false,
    showForecastOverlay: true,
    pauseBeforeForecast: true,
    endBeforeForecast: "2022",
    opacityHighlight: 1.0,
    opacitySelect: 1.0,
    opacityHighlightDim: 0.1,
    opacitySelectDim: 0.3,
    opacityRegular: 0.8,
    timeInBackground: false,
    timeInTrails: true,
    lockNonSelected: 0,
    numberFormatSIPrefix: true,
    panWithArrow: false,
    adaptMinMaxZoom: false,
    cursorMode: "arrow",
    zoomOnScrolling: false,
    superhighlightOnMinimapHover: true,
    whenHovering: {
      showProjectionLineX: true,
      showProjectionLineY: true,
      higlightValueX: true,
      higlightValueY: true
    },
    labels: {
      enabled: true,
      dragging: true,
      removeLabelBox: false
    },
    margin: {
      left: 0,
      top: 0
    },
    decorations: {
      "enabled": false,
      "xAxisGroups": {
      }
    },
    "data-warning": {
      doubtDomain: [],
      doubtRange: []
    },
    "tree-menu": {
    }
  },
  buttons: {
    buttons: ["colors", "find", "trails", "moreoptions", "presentation", "sidebarcollapse", "fullscreen"]
  },
  dialogs: {
    dialogs: {
      popup: ["colors", "find", "moreoptions"],
      sidebar: ["colors", "find", "size", "zoom"],
      moreoptions: ["opacity","speed","axes","size","colors","label","zoom","technical","repeat","presentation","about"]
    },
    find: {
      enableSelectShowSwitch: false,
      enableMarkerSpaceOptions: false,
    }
  }
}
)}

function _11(md){return(
md`# Import external files`
)}

function _Vizabi(require){return(
require("@vizabi/core@1.29.1")
)}

function _VizabiSharedComponents(require){return(
require("@vizabi/shared-components@1.40.0")
)}

function _BubbleChart(require){return(
require("@vizabi/bubblechart@4.1.4")
)}

function _en_url(FileAttachment){return(
FileAttachment("en.json").url()
)}

function _16(html)
{
  document.head.appendChild(html`<link rel='stylesheet'
    href='https://www.unpkg.com/@vizabi/shared-components@1.40.0/build/VizabiSharedComponents.css' />`);
  document.head.appendChild(html`<link rel='stylesheet'
    href='https://www.unpkg.com/@vizabi/bubblechart@4.1.4/build/bubblechart.css' />`);
  return "css imports"
}


function _17(md){return(
md`# Dependencies`
)}

async function _deepmerge(require){return(
(await require("lodash@4")).merge
)}

function _d3(require){return(
require("d3@6.7.0")
)}

function _mobx(require){return(
require('mobx@5.15.7/lib/mobx.umd.min.js')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["en.json", {url: new URL("https://raw.githubusercontent.com/qqplot/medvis/main/src/files/5e1daa45d19c9894b0a75d319d59677af3a4976f2fc016c647fef5d763bedce39bbcf107f15c5ad263acac238fcf32c724d59bffa18b32772736ae250cedd20a.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof url")).define("viewof url", ["Inputs"], _url);
  main.variable(observer("url")).define("url", ["Generators", "viewof url"], (G, _) => G.input(_));
  main.variable(observer()).define(["url"], _3);
  main.variable(observer("viewof sheet")).define("viewof sheet", ["Inputs"], _sheet);
  main.variable(observer("sheet")).define("sheet", ["Generators", "viewof sheet"], (G, _) => G.input(_));
  main.variable(observer()).define(["chart","url","sheet"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("chart")).define("chart", ["d3","html","BubbleChart","Vizabi","data_config","mobx","ui_config","en_url"], _chart);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("data_config")).define("data_config", ["deepmerge"], _data_config);
  main.variable(observer("ui_config")).define("ui_config", _ui_config);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("Vizabi")).define("Vizabi", ["require"], _Vizabi);
  main.variable(observer("VizabiSharedComponents")).define("VizabiSharedComponents", ["require"], _VizabiSharedComponents);
  main.variable(observer("BubbleChart")).define("BubbleChart", ["require"], _BubbleChart);
  main.variable(observer("en_url")).define("en_url", ["FileAttachment"], _en_url);
  main.variable(observer()).define(["html"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("deepmerge")).define("deepmerge", ["require"], _deepmerge);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("mobx")).define("mobx", ["require"], _mobx);
  return main;
}
