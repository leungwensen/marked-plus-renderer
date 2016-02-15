
import generateCompiler from './compile';
import generateRenderer from './render';

let compiler = generateCompiler();
let renderer = generateRenderer();

export default {
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

