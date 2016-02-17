
import win from 'zero-lang/global';

import generateCompiler from './compile';
import generateRenderer from './render';

let compiler = generateCompiler();
let renderer = generateRenderer(compiler);

let main = {
    setOptions(compileOptions, renderOptions) {
        if (compileOptions) {
            compiler = generateCompiler(compileOptions);
        }

        if (renderOptions) {
            renderer = generateRenderer(compiler, renderOptions);
        }
    },

    compile(markdownString) {
        return compiler(markdownString);
    },

    render(container, markdownString) {
        renderer(container, markdownString);
    },
};

win.mpr = win.markedPlusRenderer = main;

export default main;
