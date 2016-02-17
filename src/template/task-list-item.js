export default function anonymous(data, helper
/**/) {
    data = data || {};helper = helper || {};var _e = helper.escape ? helper.escape : function (s) {return s;};var _s = '<li class="task-list-item"><input type="checkbox" disabled ';if (data.checked) { _s += ' checked ';} _s += '>' + (data.text == null ? '' : data.text) + '</li>';return _s;
};
