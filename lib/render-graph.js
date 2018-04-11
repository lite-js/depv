// const filterGraph = require('./filter-graph');
const ctxUtils = require('./context-utils');
const renderEdges = require('./render-edges');
const renderNodes = require('./render-nodes');

let animateReqForNodes;
let animateReqForEdges;

module.exports = (nodesCtx, edgesCtx, interactingCtx, graph, bbox, graphBBox, canvasBBox, m, ignoreEdges) => {
  if (animateReqForNodes) {
    window.cancelAnimationFrame(animateReqForNodes);
  }
  if (animateReqForEdges) {
    window.cancelAnimationFrame(animateReqForEdges);
  }
  ctxUtils.clear(nodesCtx, canvasBBox);
  ctxUtils.clear(edgesCtx, canvasBBox);
  ctxUtils.clear(interactingCtx, canvasBBox);

  // filtering

  console.log(graph);

  if (!ignoreEdges) {
    // animateReqForEdges = window.requestAnimationFrame(() => {
    console.time('draw edges');
    renderEdges(graph.edges, edgesCtx, m);
    console.timeEnd('draw edges');
    // });
  }
  // animateReqForNodes = window.requestAnimationFrame(() => {
  console.time('draw nodes');
  renderNodes(graph.nodes, nodesCtx, m);
  console.timeEnd('draw nodes');
  // });
};
