import Component from './base';
import markup from '../template/canvas';
import fetchDependencies from '../api/fetch-dependencies';

export default new Component({
  markup,
  afterRendered() {
    fetchDependencies({
      query: window.CONFIG,
    }).then((dependencies) => {
      console.log(dependencies);
    });
  },
}).render('#canvas .inner');
