// const _ = require('lodash');
const d3 = require('d3');
const {
  ipcRenderer,
} = require('electron');
const BBox = require('./lib/bbox');
const renderGraph = require('./lib/render-graph');
const deps2graph = require('./lib/deps2graph');

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
      });

    simulation.force('link').links(edges);
  });
  ipcRenderer.send('get-dependencies');
});
