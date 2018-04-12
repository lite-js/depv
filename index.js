const _ = require('lodash');
const d3 = require('d3');
const {
  ipcRenderer,
} = require('electron');
const BBox = require('./lib/bbox');
const deps2graph = require('./lib/deps2graph');
const distance = require('./lib/distance');
const queryNodeByPoint = require('./lib/query-node-by-point');
const renderGraph = require('./lib/render-graph');
const transform = require('./lib/transform2d');
const ctxUtils = require('./lib/context-utils');
const renderDashedRect = require('./lib/render-dashed-rect');
const renderNodes = require('./lib/render-nodes');
const renderEdges = require('./lib/render-edges');

// dom
const $loading = $('#loading');
const $canvas = $('#canvas');
const $edgesCanvas = $('#edges-canvas');
const $interactingCanvas = $('#interacting-canvas');

// size
let width = 800;
let height = 450;

function adjustCanvasSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  $canvas.attr('width', width);
  $canvas.attr('height', height);
  $edgesCanvas.attr('width', width);
  $edgesCanvas.attr('height', height);
  $interactingCanvas.attr('width', width);
  $interactingCanvas.attr('height', height);
}

adjustCanvasSize();

// ctx
const nodesCtx = $canvas[0].getContext('2d');
const edgesCtx = $edgesCanvas[0].getContext('2d');
const interactingCtx = $interactingCanvas[0].getContext('2d');

// $(window).resize(adjustCanvasSize);

const canvasBBox = new BBox({
  x: 0,
  y: 0,
  width,
  height,
});
let bbox;
let graphBBox;
let m;
let mode = 'dragging';
let mainCursor = 'move';
$('html,body').css('cursor', mainCursor);

function highlightNode(node, edges) {
  ctxUtils.clear(interactingCtx, canvasBBox);
  if (node) {
    $canvas.css({ opacity: 0.45 });
    $edgesCanvas.css({ opacity: 0 });
    let nodes2draw = [node];
    const edges2draw = edges.filter((edge) => {
      if (edge.source !== node && edge.target !== node) {
        return false;
      }
      const sNode = edge.source;
      const tNode = edge.target;
      nodes2draw = _.union([sNode, tNode], nodes2draw);
      return true;
    });
    console.log(edges2draw, nodes2draw);
    nodes2draw.sort((a, b) => a.radius - b.radius);
    renderEdges(edges2draw, interactingCtx, m, 0.9);
    renderNodes(nodes2draw, interactingCtx, m, 0.9, true);
  } else {
    $edgesCanvas.css({ opacity: 1 });
    $canvas.css({ opacity: 1 });
  }
}

$(document).ready(() => {
  ipcRenderer.on('dependencies', (evt, deps) => {
    if (!deps) {
      ipcRenderer.send('get-dependencies');
    }
    const { nodes, edges, nodeById } = deps2graph(deps);
    console.log(deps, nodes, edges);
    const simulation = d3.forceSimulation()
      .force('collide', d3.forceCollide().radius(d => d.radius + 50))
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink().id(d => d.id))
      .force('center', d3.forceCenter(canvasBBox.width / 2, canvasBBox.height / 2));

    $loading.hide();

    simulation.nodes(nodes)
      .on('tick', () => {
        renderGraph(
          nodesCtx, edgesCtx, interactingCtx,
          { nodes, nodeById, edges },
          canvasBBox, canvasBBox, canvasBBox,
          canvasBBox.getMatrixToBBoxWithoutSkewing(canvasBBox),
        );
      })
      .on('end', () => {
        graphBBox = BBox.fromPoints(nodes).scaleByCenter(1.2);
        bbox = graphBBox;
        m = graphBBox.getMatrixToBBoxWithoutSkewing(canvasBBox);
        renderGraph(
          nodesCtx, edgesCtx, interactingCtx,
          { nodes, nodeById, edges },
          bbox, graphBBox, canvasBBox,
          m,
        );

        let prevNode;
        let dragging = false;
        let startPoint;
        let startPagePoint;
        const minRadius = 10;
        $canvas.on('mousemove', _.debounce((e) => {
          const point = transform.getOriginPointFromMouseEvent($canvas[0], e, m);
          if (dragging) {
            if (mode === 'dragging') {
              bbox = bbox.clone().translate(startPoint.x - point.x, startPoint.y - point.y);
              m = bbox.getMatrixToBBoxWithoutSkewing(canvasBBox);
              renderGraph(
                nodesCtx, edgesCtx, interactingCtx,
                { nodes, nodeById, edges },
                bbox, graphBBox, canvasBBox, m,
              );
            } else if (mode === 'select') {
              renderDashedRect(startPoint, point, interactingCtx, m);
            }
          } else {
            let matched = false;
            queryNodeByPoint(nodes, point, m[0], (node) => {
              $('html,body').css('cursor', 'pointer');
              highlightNode(node, edges);
              prevNode = node;
              matched = true;
            });
            if (!matched && prevNode) {
              $('html,body').css('cursor', mainCursor);
              highlightNode();
            }
          }
        }));
        $canvas.on('mousedown', (e) => {
          startPoint = transform.getOriginPointFromMouseEvent($canvas[0], e, m);
          startPagePoint = {
            x: e.pageX,
            y: e.pageY,
          };
          dragging = true;
        });
        $canvas.on('mouseup', (e) => {
          dragging = false;
          ctxUtils.clear(interactingCtx, canvasBBox);
          const point = transform.getOriginPointFromMouseEvent($canvas[0], e, m);
          if (distance(startPagePoint, { x: e.pageX, y: e.pageY }) >= minRadius) {
            if (mode === 'dragging') {
              bbox.translate(startPoint.x - point.x, startPoint.y - point.y);
              m = bbox.getMatrixToBBoxWithoutSkewing(canvasBBox);
              renderGraph(
                nodesCtx, edgesCtx, interactingCtx,
                { nodes, nodeById, edges },
                bbox, graphBBox, canvasBBox, m,
              );
            } else {
              bbox = BBox.fromPoints([startPoint, point]);
              m = bbox.getMatrixToBBoxWithoutSkewing(canvasBBox);
              bbox = canvasBBox.clone().invertMatrix(m); // keep proportion of x and y the same
              renderGraph(
                nodesCtx, edgesCtx, interactingCtx,
                { nodes, nodeById, edges },
                bbox, graphBBox, canvasBBox, m,
              );
            }
          }
        });
        const zoomingStep = 0.1;
        $canvas.on('mousewheel', (e) => {
          const delta = Math.max(-1, Math.min(1, e.originalEvent.wheelDelta));
          bbox.scaleByPoint(transform.getOriginPointFromMouseEvent($canvas[0], e, m), 1 + delta * zoomingStep);
          m = bbox.getMatrixToBBoxWithoutSkewing(canvasBBox);
          renderGraph(
            nodesCtx, edgesCtx, interactingCtx,
            { nodes, nodeById, edges },
            bbox, graphBBox, canvasBBox, m,
          );
          e.preventDefault();
        });
      });
    simulation.force('link').links(edges);
  });
  ipcRenderer.send('get-dependencies');

  $('.svg-icon').click(function switchMode() {
    $('.svg-icon').removeClass('active');
    $(this).addClass('active');
    mode = $(this).data('mode');
    if (mode === 'dragging') {
      mainCursor = 'move';
    } else if (mode === 'select') {
      mainCursor = 'crosshair';
    }
  });
});
