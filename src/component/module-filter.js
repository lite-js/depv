/**
 * module filter component.
 * @module component/module-filter
 * @see module:component/base
 * @see module:component/canvas
 * @see module:event/global
 * @see module:store/dependencies
 * @see module:template/menu-items
 * @see module:template/module-filter
 * @see module:utils/get-related-modules
 */

import domData from 'zero-dom/data';
import domEvent from 'zero-dom/event';
import domQuery from 'zero-dom/query';
import lang from 'zero-lang';

import Component from './base';
import event from '../event/global';
import markup from '../template/module-filter';
import menuItems from '../template/menu-items';
import getRelatedModules from '../util/get-related-modules';
import dependenciesStore from '../store/dependencies';

export default new Component({
  markup,

  renderInnerDom(data) {
    /**
     * re-render the inner dom of the module filter component
     * @function
     * @param {object} data - data to render inner dom.
     * @return module filter context
     */
    const me = this;
    me.innerDom.innerHTML = menuItems(data, lang);
    return me;
  },

  filter(query) {
    /**
     * filter nodes according to the query.
     * @function
     * @param {string} query - searching query.
     * @return {object} nodes, isModuleName, edges.
     */
    let isModuleName = false;
    const nodes = [];

    lang.each(dependenciesStore.get('nodes'), (node) => {
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
      edges: dependenciesStore.get('edges'),
    };
  },

  reRender(query) {
    /**
     * re-render module filter according to the query.
     * @function
     * @param {string} query - searching query.
     * @return module filter context
     */
    const me = this;
    const meta = me.filter(query);
    me.renderInnerDom(meta);
    event.emit('highlight-nodes', me.queryDom.value);
    return me;
  },

  reDraw(query) {
    /**
     * re-draw canvas according to the query.
     * @function
     * @param {string} query - searching query.
     * @return module filter context
     */
    const me = this;
    const meta = me.filter(query);
    let nodes = [];
    if (meta.isModuleName) {
      nodes = getRelatedModules(query);
    } else {
      nodes = meta.nodes;
    }
    event.emit('redraw-canvas', lang.extend(meta, {
      nodes,
    }));
    event.emit('highlight-nodes', me.queryDom.value);
    return me;
  },

  afterRendered() {
    /**
     * cache dom elements, bind dom events, global events, etc.
     * @function
     */
    const me = this;
    me.innerDom = domQuery.one('#module-filter-result');
    event.on('update-module-list', () => {
      me.renderInnerDom(dependenciesStore.get('dependencies'));
    });

    const queryDom = domQuery.one('#module-filter-query');
    me.queryDom = queryDom;

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
