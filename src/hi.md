# Hi

<link rel="stylesheet" type="text/css" href="./inspector.css">
<div id="observablehq-bfc6a2c0"></div>

```js
import {Runtime, Library, Inspector} from "./components/runtime.js";
import define from "./components/index.js";
// new Runtime().module(define, Inspector.into("#observablehq-bfc6a2c0"));

const runtime = new Runtime();
const main = runtime.module(define, Inspector.into("#observablehq-bfc6a2c0"));

```
