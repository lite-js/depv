import domQuery from 'zero-dom/query';
import lang from 'zero-lang';

import Component from './base';
import event from '../event/global';
import markup from '../template/module-filter';
import menuItems from '../template/menu-items';

export default new Component({
  markup,
  afterRendered() {
    const me = this;
    me.innerDom = domQuery.one('#module-filter-result');
    event.on('update-nodes', (nodes) => {
      me.innerDom.innerHTML = menuItems({
        nodes,
      }, lang);
    });
  },
}).render('#menu .inner');
