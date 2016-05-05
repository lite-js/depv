/**
 * Component constructor.
 * @module component/base
 * @see module:component/canvas
 * @see module:component/module-filter
 */

import declare from 'zero-oop/declare';
import domStyle from 'zero-dom/style';
import domConstruct from 'zero-dom/construct';
import {
  extend,
  difference,
} from 'zero-lang';

export default declare({
  /**
   * the initialize data for markup function.
   * @object
   */
  data: {},

  markup(/* data */) {
    /**
     * markup function to generate dom structure for the component.
     * @function
     * @param {object} data - data used in markup rendering
     * @return {string} html string for rendering component
     */
    return '<div class="base-component"></div>';
  },

  constructor(option) {
    /**
     * creating a component with dom structure, and life cycle management.
     * @param {function} option.markup - markup function to generate dom structure for the component.
     * @param {function} option.data - the initialize data for markup function.
     * @param {function} option.init - which will run right after the Component instance created.
     * @param {function} option.afterRendered - which will run after component rendered.
     */
    const me = this;
    extend(me, option);
    const data = extend({}, me.data, {
      localeMsg: window.LOCALE_MSG, // add all locale messages to render templates
    });
    me.outerDom = domConstruct.toDom(me.markup(data));
    me.innerDom = me.outerDom;
    me.children = [];
    me.init();
  },

  init() {
    /**
     * which will run right after the Component instance created.
     * @function
     */
    // 组件初始化
  },

  show() {
    /**
     * show component dom structure.
     * @function
     */
    const me = this;
    domStyle.show(me.outerDom);
    me.hidden = false;
    return me;
  },

  hide() {
    /**
     * hide component dom structure.
     * @function
     */
    const me = this;
    domStyle.hide(me.outerDom);
    me.hidden = true;
    return me;
  },

  toggle() {
    /**
     * toggle the visibility of the component dom structure.
     * @function
     */
    const me = this;
    return me.hidden ? me.show() : me.hide();
  },

  afterRendered() {
    /**
     * which will run after component rendered.
     * @function
     */
    // 组件渲染完成
  },

  render(parent, position) {
    /**
     * render component.
     * @function
     * @param {string|component|element} parent - the parent component or dom element or selector of a dom element.
     * @param {string} position - one of [before/after/only/replace/first/last], default is last.
     * @return {component} component context.
     */
    const me = this;
    if (me.rendered) {
      return me;
    }
    parent = parent || window.document.body;
    if (parent.innerDom && parent.children) {
      domConstruct.place(me.outerDom, parent.innerDom, position);
      me.parent = parent;
      parent.children.push(me);
    } else {
      domConstruct.place(me.outerDom, parent, position);
    }
    me.rendered = true;
    me.afterRendered();
    return me;
  },

  destroy() {
    /**
     * destroy component.
     * @function
     */
    let me = this;
    if (me.parent) {
      me.parent.children = difference(me.parent.children, [me]);
    }
    domConstruct.destroy(me.outerDom);
    me = null;
  },
});
