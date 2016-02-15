import lang from 'zero-lang';
import domAttr from 'zero-dom/attr';
import domQuery from 'zero-dom/query';
import domStyle from 'zero-dom/style';
import mermaid from 'mermaid';
import flowchart from 'mermaid';

const each = lang.each;
const destroy = lang.destroy;

let win = lang.global;
let doc = win.document;
let body = doc.body;
let head = doc.getElementsByTagName('head')[0];

let flowchartOptions = {
  x: 0,
  y: 0,
  'line-width': 2,
  'line-length': 40,
  'text-margin': 10,
  'font-size': 14,
  'font-color': 'black',
  'line-color': 'grey',
  'element-color': 'grey',
  fill: 'lightyellow',
  'yes-text': 'yes',
  'no-text': 'no',
  'arrow-end': 'block',
  scale: 1,
};
let flowchartInstanceCache = [];

function renderFlowcharts(scope) {
  /*
   * scope is a node with structure like:
   *     <div class="flowchart">
   *         <div class="flowchart-graph"></div>
   *         <script class="flowchart-code">{%= code %}</script>
   *     </div>
   */
  each(flowchartInstanceCache, function (instance) {
    destroy(instance);
  });

  flowchartInstanceCache = [];
  each(domQuery.all('.flowchart', scope), function (container, index) {
    setTimeout(function () { // for optimizing markdown rendering
      try {
        var codeElement = domQuery.one('.flowchart-code', container);
        var graphElement = domQuery.one('.flowchart-graph', container);
        var diagram = flowchart.parse(codeElement.innerHTML);
        diagram.drawSVG(graphElement, flowchartOptions);
        flowchartInstanceCache.push(diagram);
      } catch (e) {
        console.log(e);
      }
    }, 50 * (index + 1));
  });
}

function renderMermaidGraphs(scope) {
  /*
   * scope is the node to render in
   */
  scope = scope || document.body;
  var count = 0;
  each(domQuery.all('.mermaid', scope), function (graph, index) {
    count++;
    setTimeout(function () { // for optimizing markdown rendering
      try {
        mermaid.initialize(null, graph);
      } catch (e) {
        console.log(e);
      }
    }, 50 * (index + 1));
  });

  setTimeout(function () {
    // fix GANTT diagrams (width of lanes is not set correctly) {
    var ganttGraphs = domQuery.all('.mermaid[data-type=gantt] svg', scope);
    each(ganttGraphs, function (svg) {
      var lanes = domQuery.all('g rect.section');
      each(lanes, function (lane) {
        domAttr.set(lane, 'width', domStyle.get(svg, 'width'));
      });
    });

    // }
  }, 50 * (count + 2));
}

function loadJsFiles(files, index) {
  index = index || 0;
  if (files[index]) {
    var element = doc.createElement('script');
    domAttr.set(element, 'type', 'text/javascript');
    domAttr.set(element, 'async', 'true');
    domAttr.set(element, 'src', files[index]);
    element.onload = element.onreadystatechange = function () {
      if (index < (files.length - 1)) {
        loadJsFiles(files, index + 1);
      }
    };

    body.appendChild(element);
  }
}

function loadLinkFiles(files, index) {
  index = index || 0;
  if (files[index]) {
    var element = doc.createElement('link');
    domAttr.set(element, 'type', 'text/css');
    domAttr.set(element, 'async', 'true');
    domAttr.set(element, 'rel', 'stylesheet');
    domAttr.set(element, 'href', files[index]);
    element.onload = element.onreadystatechange = function () {
      if (index < (files.length - 1)) {
        loadLinkFiles(files, index + 1);
      }
    };

    head.appendChild(element);
  }
}

function loadJsCode(code) {
  var element = doc.createElement('script');
  domAttr.set(element, 'type', 'text/javascript');
  element.innerHTML = code;
  body.appendChild(element);
}

function loadCssCode(code) {
  var element = doc.createElement('style');
  domAttr.set(element, 'type', 'text/css');
  element.innerHTML = code;
  head.appendChild(element);
}

export default function (compiler, newRenderOptions = {}) {
  lang.extend(flowchartOptions, newRenderOptions.flowchart);
  if (newRenderOptions.mermaid) {
    mermaid.initialize(newRenderOptions.mermaid);
  }

  return function (container, markdownString = '') {
    container.innerHTML = compiler(markdownString);

    renderMermaidGraphs(container); // render mermaid graphs
    renderFlowcharts(container);    // render flowcharts

    loadCssCode(compiler.__cssCodeToLoad);
    loadLinkFiles(compiler.__linksToLoad);
    loadJsCode(compiler.__jsCodeToLoad);
    loadJsFiles(compiler.__scriptsToLoad);
  };
};
