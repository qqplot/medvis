import define1 from "./3f9363cf8e3cb899@512.js";

function _2(htl){return(
htl.html`<link rel='stylesheet' href='https://www.unpkg.com/@vizabi/shared-components@1.30.1/build/VizabiSharedComponents.css' />
<link rel='stylesheet' href='https://www.unpkg.com/@vizabi/bubblechart@3.16.0/build/bubblechart.css' />`
)}

function _3(chart){return(
chart("https://docs.google.com/spreadsheets/d/1kLB8jH3hX3nfdK3uusy_xXCe8PYChKqnYC9SyTuRtO4/edit?gid=0", "Sheet2", {  
  markers: {
    bubble: {
      encoding: {
        y: {data: {concept: "LEX"}}, 
        x: {data: {concept: "GDP"}, scale: {type: "log"}},
        size: {data: {concept: "POP"}}, 
        color: {data: {concept: "world_region"}}
      }
    }
  }
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const child1 = runtime.module(define1);
  main.import("chart", child1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["chart"], _3);
  return main;
}
