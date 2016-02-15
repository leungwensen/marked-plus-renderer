export default function anonymous(data, helper
/**/) {
  data = data || {};helper = helper || {};var _e = helper.escape ? helper.escape : function (s) {return s;};var _s = '<div class="mermaid" data-type="' + _e(data.type) + '">' + (data.code == null ? '' : data.code) + '</div>';return _s;
};
