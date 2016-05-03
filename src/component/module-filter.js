import domEvent from 'zero-dom/event';
import domQuery from 'zero-dom/query';
import lang from 'zero-lang';

import Component from './base';
import event from '../event/global';
import markup from '../template/module-filter';
import menuItems from '../template/menu-items';

export default new Component({
  markup,

  reRenderInnerDom(data) {
    const me = this;
    me.innerDom.innerHTML = menuItems(data, lang);
    return me;
  },

  filter(query) {
    const me = this;
    // TODO if (query === someNode.name), show the dependent and dependencies of someNode
    const nodes = lang.filter(me.metaData.nodes, (node) => node.name.indexOf(query) > -1);
    me.rerenderInnerDom({
      nodes,
    });
    // TODO setTimeout
    event.emit('redraw-canvas', {
      nodes,
      edges: me.metaData.edges,
    });
    return me;
  },

  afterRendered() {
    const me = this;

    me.innerDom = domQuery.one('#module-filter-result');
    event.on('update-meta-data', (dependencies) => {
      me.metaData = dependencies;
      me.reRenderInnerDom(dependencies);
    });

    const queryDom = domQuery.one('#module-filter-query');
    domEvent.on(queryDom, 'change', () => {
      me.filter(queryDom.value);
    });
  },
}).render('#menu .inner');
