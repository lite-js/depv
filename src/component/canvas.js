import domQuery from 'zero-dom/query';

import Component from './base';
import fetchDependencies from '../api/fetch-dependencies';

// api implements
import addEdges from './canvas/add-edges';
import addNodes from './canvas/add-nodes';
import draw from './canvas/draw';
import getCenterPoint from './canvas/get-center-point';
import getNodeId from './canvas/get-node-id';
import markup from '../template/canvas';
import processEdges from './canvas/process-edges-meta';
import processNodes from './canvas/process-nodes-meta';
import queryNodes from './canvas/query-nodes';
import styleEdges from './canvas/style-edges';
import styleNodes from './canvas/style-nodes';
import transition from './canvas/transition';

export default new Component({
  // properties
  NS: {
    node: '__node_',
  },
  d3EdgeById: {},
  d3NodeById: {},
  edgeById: {},
  edges: [],
  nodeById: {},
  nodes: [],

  // apis
  addEdges,
  addNodes,
  draw,
  getCenterPoint,
  getNodeId,
  markup,
  processEdges,
  processNodes,
  queryNodes,
  styleEdges,
  styleNodes,
  transition,

  // aop
  afterRendered() {
    const me = this;
    me.outerDom = domQuery.one('#canvas');
    fetchDependencies({
      query: window.CONFIG,
    }).then((dependencies) => {
      me.draw(dependencies);
    });
  },
}).render('#canvas');
