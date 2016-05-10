export default function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _e=helper.escape?helper.escape:function(s){return s;};var _s='<div data-line="'+_e(data.lineNumber)+'">'+(data.tex==null?'':data.tex)+'</div>';return _s;
};