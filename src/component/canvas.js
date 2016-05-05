/**
 * canvas component.
 * @module component/canvas
 * @see module:api/fetch-dependencies
 * @see module:component/base
 * @see module:component/canvas
 * @see module:component/canvas/add-edges
 * @see module:component/canvas/add-nodes
 * @see module:component/canvas/draw
 * @see module:component/canvas/get-center-point
 * @see module:component/canvas/get-node-id
 * @see module:component/canvas/highlight-nodes
 * @see module:component/canvas/highlight-nodes
 * @see module:component/canvas/process-edges-meta
 * @see module:component/canvas/process-nodes-meta
 * @see module:component/canvas/query-d3-nodes
 * @see module:component/canvas/query-nodes
 * @see module:component/canvas/style-edges
 * @see module:component/canvas/style-nodes
 * @see module:component/canvas/transition
 * @see module:component/canvas/unhighlight-nodes
 * @see module:event/global
 * @see module:page-loading
 * @see module:store/dependencies
 * @see module:template/canvas
 */

import domQuery from 'zero-dom/query';

import Component from './base';
import fetchDependencies from '../api/fetch-dependencies';
import event from '../event/global';
import dependenciesStore from '../store/dependencies';

// api implements
import addEdges from './canvas/add-edges';
import addNodes from './canvas/add-nodes';
import draw from './canvas/draw';
import getCenterPoint from './canvas/get-center-point';
import getNodeId from './canvas/get-node-id';
import highlightNodes from './canvas/highlight-nodes';
import markup from '../template/canvas';
import processEdges from './canvas/process-edges-meta';
import processNodes from './canvas/process-nodes-meta';
import queryD3Nodes from './canvas/query-d3-nodes';
import queryNodes from './canvas/query-nodes';
import styleEdges from './canvas/style-edges';
import styleNodes from './canvas/style-nodes';
import transition from './canvas/transition';
import unhighlightNodes from './canvas/unhighlight-nodes';

export default new Component({
  // constants
  CLASSNAME: {
    nodeHighlight: 'node-highlight',
  },
  NS: {
    node: '__node_',
  },

  // properties
  d3EdgeById: {},
  d3NodeById: {},
  edgeById: {},
  nodeById: {},

  // apis
  addEdges,
  addNodes,
  draw,
  getCenterPoint,
  getNodeId,
  highlightNodes,
  markup,
  processEdges,
  processNodes,
  queryD3Nodes,
  queryNodes,
  styleEdges,
  styleNodes,
  transition,
  unhighlightNodes,

  // aop
  afterRendered() {
    /**
     * cache dom elements, draw graph, bind dom events, global events, etc.
     * @function
     */
    const me = this;
    me.canvasDom = domQuery.one('#canvas');

    fetchDependencies({
      query: window.CONFIG,
    }).then((dependencies) => {
      dependenciesStore.set('nodes', dependencies.nodes);
      dependenciesStore.set('edges', dependencies.edges);
      dependenciesStore.set('dependencies', dependencies);
      event.emit('update-module-list');
      me.draw(dependencies);
      window.pageLoading.hideLoading();
    });

    event.on('redraw-canvas', (data) => {
      window.pageLoading.executeDuringLoading(() => {
        me.draw(data);
      });
    });

    event.on('highlight-nodes', (query) => {
      me.unhighlightNodes();
      me.highlightNodes(query);
    });
  },
}).render('#canvas');
