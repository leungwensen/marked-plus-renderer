import emojiMap from 'emoji-map';
import katex from 'katex';
import marked from 'marked-plus';
import mermaid from 'mermaid';
import lang from 'zero-lang';
import htmlUtils from 'zero-text/html';
import sprintf from 'zero-fmt/sprintf';

import tmplCss from './template/css';
import tmplEmoji from './template/emoji';
import tmplFigure from './template/figure';
import tmplFlowchart from './template/flowchart';
import tmplJavascript from './template/javascript';
import tmplMath from './template/math';
import tmplMermaidGraph from './template/mermaid';
import tmplTaskListItem from './template/task-list-item';

let templateHelper = lang.extend({}, lang, htmlUtils);

export default function (newOptions) {
  let options = lang.extend({
    figcaption: true,
    breaks: false,
    pedantic: false,
    renderer: renderer,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    tables: true,
  }, newOptions);

  let Renderer = marked.Renderer;
  let RendererPrototype = Renderer.prototype;
  let renderer = new Renderer();
  let mermaidError;

  marked.__scriptsToLoad = [];
  marked.__linksToLoad = [];
  marked.__jsCodeToLoad = '';
  marked.__cssCodeToLoad = '';

  function add2arr(arr, items) {
    lang.each(items, function (item) {
      item = lang.trim(item);
      if (item && arr.indexOf(item) === -1) {
        arr.push(item);
      }
    });
  }

  mermaid.parseError = function (err/*, hash*/) {
    mermaidError = err;
  };

  renderer.listitem = function (text) { // list item
    if (!/^\[[ x]\]\s/.test(text)) { // normal list item
      return marked.Renderer.prototype.listitem(text);
    }

    return tmplTaskListItem({
      checked: /^\[x\]\s/.test(text),
      text: text.substring(3),
    }, templateHelper);
  };

  renderer.codespan = function (code) { // inline code
    if (/^\$.+\$$/.test(code)) { // inline math typesetting
      let raw = /^\$(.+)\$$/.exec(code)[1];
      let line = htmlUtils.unescape(raw);
      try {
        return katex.renderToString(line, {
          displayMode: false,
        });
      } catch (err) {
        return sprintf('<code>%s</code>', err);
      }
    }

    return RendererPrototype.codespan.apply(this, arguments);
  };

  renderer.code = function (code, lang, escaped, lineNumber) { // code block
    code = lang.trim(code);

    if (lang === 'markdown' || lang === 'md') {
      return RendererPrototype.code.apply(this, arguments);
    }

    // html injection
    if (lang === 'html+') {
      lang = 'html';
      return RendererPrototype.code.apply(this, arguments) + code;
    }

    if (lang === 'html-') {
      return code;
    }

    if (lang === 'js+' || lang === 'javascript+') {
      lang = 'javascript';
      marked.__jsCodeToLoad += ('\n' + code);
      return RendererPrototype.code.apply(this, arguments);
    }

    if (lang === 'js-' || lang === 'javascript-') {
      marked.__jsCodeToLoad += ('\n' + code);
      return '';
    }

    if (lang === 'css+' || lang === 'style+') {
      lang = 'css';
      marked.__cssCodeToLoad += ('\n' + code);
      return RendererPrototype.code.apply(this, arguments);
    }

    if (lang === 'css-' || lang === 'style-') {
      marked.__cssCodeToLoad += ('\n' + code);
      return '';
    }

    // load resources with link/source
    if (lang === 'script+') {
      lang = 'html';
      add2arr(marked.__scriptsToLoad, code.split(/\n/));
      return RendererPrototype.code.apply(this, arguments);
    }

    if (lang === 'script-') {
      add2arr(marked.__scriptsToLoad, code.split(/\n/));
      return '';
    }

    if (lang === 'link+') {
      lang = 'html';
      add2arr(marked.__linksToLoad, code.split(/\n/));
      return RendererPrototype.code.apply(this, arguments);
    }

    if (lang === 'link-') {
      add2arr(marked.__linksToLoad, code.split(/\n/));
      return '';
    }

    if (lang === 'math' || lang === 'katex') {
      let tex = '';
      lang.each(code.split(/\n\n/), function (line) {
        // next if we have two empty lines
        line = lang.trim(line);
        if (line.length > 0) {
          try {
            tex += katex.renderToString(line, {
              displayMode: true,
            });
          } catch (err) {
            tex += sprintf('<pre>%s</pre>', err);
          }
        }
      });

      return tmplMath({
        lineNumber,
        tex,
      }, templateHelper);
    }

    // mermaid
    if (
        lang === 'gantt' ||
        lang === 'sequence-diagram' ||
        lang.match(/^graph-(?:tb|bt|rl|lr|td);?$/)
    ) {
      if (lang === 'sequence-diagram') {
        code = 'sequenceDiagram\n' + code + '\n'; // empty line in the end or error
      } else if (lang === 'gantt') {
        code = 'gantt\n' + code;
      } else {
        code = lang.replace('-', ' ') + '\n' + code;
      }

      return tmplMermaidGraph({
        code,
        type: lang,
      }, templateHelper);
    }

    // flowchart
    if (lang === 'flowchart') {
      code = map(code.replace(/^\n/, '').split(/\n/), function (line) {
        // have to trim
        return lang.trim(line);
      }).join('\n');
      return tmplFlowchart({
        code,
      }, templateHelper);
    }

    return RendererPrototype.code.apply(this, arguments);
  };

  renderer.image = function (href, title, text) {
    return tmplFigure({
      href,
      text,
      figcaption: options.figcaption,
      title: title || '',
    }, templateHelper);
  };

  renderer.text = function (text) { // text span
    let words = text.split(' ');
    return map(words, function (word) {
      word = lang.trim(word);
      if (emojiMap[word]) {
        return tmplEmoji({
          emoji: emojiMap[word],
        }, templateHelper);
      }

      return word;
    }).join(' ');
  };

  marked.setOptions(options);

  return marked;
};
