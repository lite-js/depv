import Component from './base';
import markup from '../template/canvas';

export default new Component({
  markup,
  afterRendered() {
  },
}).render('#canvas .inner');
