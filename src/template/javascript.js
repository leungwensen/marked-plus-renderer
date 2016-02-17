export default function anonymous(data, helper
/**/) {
    data = data || {};helper = helper || {};var _e = helper.escape ? helper.escape : function (s) {return s;};var _s = '<script async>' + (data.code == null ? '' : data.code) + '</script>';return _s;
};
