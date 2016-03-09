import lang from 'zero-lang';
import marked from 'marked-plus';

let Renderer = marked.Renderer;
let renderer = new Renderer();

const DEFAULT_MARKED_OPTIONS = {
    breaks: false,
    pedantic: false,
    renderer: renderer,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    tables: true,
};

let plugins = [];

let main = {
    marked,
    renderer,
    setMarkedOptions(markedOptions) {
        marked.setOptions(lang.extend({}, DEFAULT_MARKED_OPTIONS, markedOptions));
    },
    compile(markdownString = '') {
    },
    render(container, markdownString = '') {
    },
    applyPlugin(marked, renderer) {
    }
};

let win = lang.global;
win.mpr = win.markedPlusRenderer = main;

export default main;
