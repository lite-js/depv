import declare from 'zero-oop/declare';
import domStyle from 'zero-dom/style';
import domConstruct from 'zero-dom/construct';
import {
  extend,
  difference,
} from 'zero-lang';

export default declare({
  data: {},
  markup() {
    return '<div class="base-component"></div>';
  },
  constructor(option) {
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
    // 组件初始化
  },
  show() {
    const me = this;
    domStyle.show(me.outerDom);
    me.hidden = false;
    return me;
  },
  hide() {
    const me = this;
    domStyle.hide(me.outerDom);
    me.hidden = true;
    return me;
  },
  toggle() {
    const me = this;
    return me.hidden ? me.show() : me.hide();
  },
  afterRendered() {
    // 组件渲染完成
  },
  render(parent, position) {
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
    let me = this;
    if (me.parent) {
      me.parent.children = difference(me.parent.children, [me]);
    }
    domConstruct.destroy(me.outerDom);
    me = null;
  },
});
