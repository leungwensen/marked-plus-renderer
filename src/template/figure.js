export default function anonymous(data, helper
/**/) {
  data = data || {};helper = helper || {};var _e = helper.escape ? helper.escape : function (s) {return s;};var _s = '<figure><img src="' + _e(data.href) + '" alt="' + _e(data.text) + '" title="' + _e(data.title) + '"/>';if (data.figcaption) { _s += '<figcaption>' + _e(data.text) + '</figcaption>';} _s += '</figure>';return _s;
};
