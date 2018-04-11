// const Quadtree = require('./quadtree');
// const transform = require('./transform2d');

// let quadTree;

// function boundsFromNode(node, m) {
//   const r = node.radius;
//   const r2 = r * 2;
//   const { x, y } = transform.applyPoint(node, m);
//   return {
//     x: x - r,
//     y: y - r,
//     w: r2,
//     h: r2,
//   };
// }

// module.exports = function filterGraph(nodes, edges, bbox, graphBBox, canvasBBox/* , m */) {
//   console.time('filtering graph');
//   let nodesFiltered = nodes;
//   let edgesFiltered = edges;
//   console.log(`nodes: ${nodesFiltered.length}; edges: ${edgesFiltered.length}`);
//   // filter nodes beyond canvas
//   if (bbox.width < graphBBox.width || bbox.height < graphBBox.height) {
//     nodesFiltered = nodesFiltered.filter(node => bbox.isPointInside(node));
//   }

//   if (!nodes[0].isLeaf) {
//     // filter overlapping nodes
//     quadTree = new Quadtree(canvasBBox, 10);
//     const nodes2draw = [];
//     for (let i = (nodesFiltered.length - 1); i >= 0; i -= 1) { // filter from largest nodes
//       const node = nodesFiltered[i];
//       const bounds = boundsFromNode(node, m);
//       if (!quadTree.isOverlapping(bounds)) {
//         nodes2draw.push(node);
//         quadTree.insert(bounds);
//       }
//     }
//     nodesFiltered = nodes2draw.reverse();
//   }

//   const nodeIds = {};
//   nodesFiltered.forEach((node) => {
//     nodeIds[node.id] = true;
//   });
//   edgesFiltered = edgesFiltered.filter(edge => nodeIds[edge.source] && nodeIds[edge.target]);

//   console.log(`nodes: ${nodesFiltered.length}; edges: ${edgesFiltered.length}`);
//   console.timeEnd('filtering graph');
//   return {
//     nodes: nodesFiltered,
//     edges: edgesFiltered,
//   };
// };
