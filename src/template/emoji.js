export default function anonymous(data, helper
/**/) {
  data = data || {};helper = helper || {};var _e = helper.escape ? helper.escape : function (s) {return s;};var _s = '<span style="font-weight: normal !important;">' + (data.emoji == null ? '' : data.emoji) + '</span>';return _s;
};
