export default function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _e=helper.escape?helper.escape:function(s){return s;};var _s='<div class="flowchart"><script type="text/template" class="flowchart-code">'+(data.code==null?'':data.code)+'</script><div class="flowchart-graph"></div></div>';return _s;
};