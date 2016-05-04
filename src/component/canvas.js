import domQuery from 'zero-dom/query';

import Component from './base';
import fetchDependencies from '../api/fetch-dependencies';
import event from '../event/global';

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
    const me = this;
    me.outerDom = domQuery.one('#canvas');

    fetchDependencies({
      query: window.CONFIG,
    }).then((dependencies) => {
      event.emit('update-meta-data', dependencies);
      me.draw(dependencies);
      window.pageLoading.hideLoading();
    });

    event.on('redraw-canvas', (data) => {
      me.draw(data);
    });
    event.on('highlight-nodes', (query) => {
      me.unhighlightNodes();
      me.highlightNodes(query);
    });
  },
}).render('#canvas');
