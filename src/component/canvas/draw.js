/**
 * canvas.draw(data) implement.
 * @module component/canvas/draw
 * @see module:component/canvas
 * @see module:component/canvas/add-edges
 * @see module:component/canvas/add-nodes
 * @see module:component/canvas/process-edges-meta
 * @see module:component/canvas/process-nodes-meta
 * @see module:component/canvas/transition
 */

import d3 from 'd3';
import dagreD3 from 'dagre-d3';
import domStyle from 'zero-dom/style';
import {
  each,
  extend,
  isArray,
} from 'zero-lang';

export default function draw(data) {
  /**
   * drawing the graph.
   * @function
   * @param {object} data - data of dependencies.
   * @return {object} canvas - canvas context.
   */
  const me = this;
  const d3Svg = me.d3Svg = d3.select('svg#graph');
  const renderer = me.renderer = dagreD3.render();
  const oldDrawNodes = renderer.createNodes();
  const oldDrawEdges = renderer.createEdgePaths();

  // @FIXME
  d3Svg.attr('height', domStyle.get(me.canvasDom, 'height'));

  if (data && isArray(data.nodes) && isArray(data.edges)) {
    const graph = me.graph = new dagreD3.graphlib.Graph().setGraph({});

    // setting graph
    graph.graph().ranksep = 240;
    graph.graph().nodesep = 40;

    me.processNodes(data.nodes);
    me.processEdges(data.edges);

    me.nodeById = {};
    each(data.nodes, (node) => {
      me.nodeById[node.id] = node;
    });
    me.edgeById = {};
    each(data.edges, (edge) => {
      me.edgeById[edge.id] = edge;
    });

    me.addNodes(data.nodes);
    me.addEdges(data.edges);

    me.d3NodeById = {};
    renderer.createNodes((selection, g, shapes) => {
      const svgNodes = oldDrawNodes(selection, g, shapes);
      each(svgNodes[0], (u) => {
        const d3Node = me.d3NodeById[u.id] = d3.select(u);
        const node = me.nodeById[u.id];
        if (node.classname) {
          d3Node.classed(node.classname, true);
        }
        d3Node.attr('id', me.NS.node + node.id);
      });
      return svgNodes;
    });

    me.d3EdgeById = {};
    renderer.createEdgePaths((selection, g, arrows) => {
      const svgEdges = oldDrawEdges(selection, g, arrows);
      each(svgEdges[0], (e) => {
        const d3Edge = me.d3EdgeById[e.id] = d3.select(e);
        const edge = me.edgeById[e.id];
        if (edge.classname) {
          d3Edge.classed(edge.classname, true);
        }
      });
      return svgEdges;
    });

    // avoiding layout thrashing
    const d3G = me.d3G = d3Svg.select('g');
    d3G.attr('transform', 'translate(0, 0)scale(1)');

    renderer(d3G, graph);

    const zoomed = () => {
      d3G.attr('transform', `translate(${d3.event.translate})scale(${d3.event.scale})`);
    };
    me.zoom = d3.behavior.zoom().scaleExtent([0.03, 3]).on('zoom', zoomed);
    d3Svg.call(me.zoom);

    me.styleNodes();
    me.styleEdges();

    me.transition(extend({
      duration: 200,
    }, me.getCenterPoint()));
  }

  return me;
}
