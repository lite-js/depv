import Component from './base';

export default new Component({
  markup() {
    return '<svg id="graph"></svg>';
  },
}).render('#canvas .inner');
