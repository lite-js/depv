import domData from 'zero-dom/data';
import domEvent from 'zero-dom/event';
import domQuery from 'zero-dom/query';
import lang from 'zero-lang';

import Component from './base';
import event from '../event/global';
import markup from '../template/module-filter';
import menuItems from '../template/menu-items';
import getRelatedModules from '../util/get-related-modules';

export default new Component({
  markup,

  renderInnerDom(data) {
    const me = this;
    me.innerDom.innerHTML = menuItems(data, lang);
    return me;
  },

  filter(query) {
    const me = this;
    let isModuleName = false;
    const nodes = [];

    lang.each(me.metaData.nodes, (node) => {
      if (node.name.indexOf(query) > -1) {
        nodes.push(node);
      }
      if (node.name === query) {
        isModuleName = true;
      }
    });
    return {
      nodes,
      isModuleName,
      edges: me.metaData.edges,
    }
  },

  reRender(query) {
    const me = this;
    const meta = me.filter(query);
    me.renderInnerDom(meta);
    return me;
  },

  reDraw(query) {
    const me = this;
    const meta = me.filter(query);
    let nodes = [];
    if (meta.isModuleName) {
      nodes = getRelatedModules(query, me.metaData);
    } else {
      nodes = meta.nodes;
    }
    event.emit('redraw-canvas', lang.extend(meta, {
      nodes,
    }));
    return me;
  },

  afterRendered() {
    const me = this;
    me.innerDom = domQuery.one('#module-filter-result');
    event.on('update-meta-data', (dependencies) => {
      me.metaData = dependencies;
      me.renderInnerDom(dependencies);
    });

    const queryDom = domQuery.one('#module-filter-query');
    domEvent.on(queryDom, 'input', () => {
      me.reRender(queryDom.value);
    });
    domEvent.on(queryDom, 'change', () => {
      me.reDraw(queryDom.value);
    });
    domEvent.on(me.innerDom, 'click', '.pure-menu-item', (e) => {
      const delegateTarget = e.delegateTarget;
      queryDom.value = domData.get(delegateTarget, 'name');
      me.reRender(queryDom.value);
      me.reDraw(queryDom.value);
    });
  },
}).render('#menu .inner');
