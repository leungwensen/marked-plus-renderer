import emojiMap from 'emoji-map';
import katex from 'katex-all';
import marked from 'marked-plus';
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
  let Renderer = marked.Renderer;
  let RendererPrototype = Renderer.prototype;
  let renderer = new Renderer();

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

  renderer.code = function (code, language, escaped, lineNumber) { // code block
    code = lang.trim(code);
    language = language || '';

    if (language === 'markdown' || language === 'md') {
      return RendererPrototype.code.apply(this, arguments);
    }

    // html injection
    if (language === 'html+') {
      language = 'html';
      return RendererPrototype.code.apply(this, arguments) + code;
    }

    if (language === 'html-') {
      return code;
    }

    if (language === 'js+' || language === 'javascript+') {
      language = 'javascript';
      marked.__jsCodeToLoad += ('\n' + code);
      return RendererPrototype.code.apply(this, arguments);
    }

    if (language === 'js-' || language === 'javascript-') {
      marked.__jsCodeToLoad += ('\n' + code);
      return '';
    }

    if (language === 'css+' || language === 'style+') {
      language = 'css';
      marked.__cssCodeToLoad += ('\n' + code);
      return RendererPrototype.code.apply(this, arguments);
    }

    if (language === 'css-' || language === 'style-') {
      marked.__cssCodeToLoad += ('\n' + code);
      return '';
    }

    // load resources with link/source
    if (language === 'script+') {
      language = 'html';
      add2arr(marked.__scriptsToLoad, code.split(/\n/));
      return RendererPrototype.code.apply(this, arguments);
    }

    if (language === 'script-') {
      add2arr(marked.__scriptsToLoad, code.split(/\n/));
      return '';
    }

    if (language === 'link+') {
      language = 'html';
      add2arr(marked.__linksToLoad, code.split(/\n/));
      return RendererPrototype.code.apply(this, arguments);
    }

    if (language === 'link-') {
      add2arr(marked.__linksToLoad, code.split(/\n/));
      return '';
    }

    if (language === 'tex-math' || language === 'katex' || language === 'math') { // will use mathjax instead later?
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
        language === 'gantt' ||
        language === 'sequence' ||
        language.match(/^graph-(?:tb|bt|rl|lr|td);?$/i)
    ) {
      if (language === 'sequence') {
        code = 'sequenceDiagram\n' + code + '\n'; // empty line in the end or error
      } else if (language === 'gantt') {
        code = 'gantt\n' + code;
      } else {
        code = language.replace('-', ' ') + '\n' + code;
      }

      return tmplMermaidGraph({
        code,
        type: language,
      }, templateHelper);
    }

    // flowchart
    if (language === 'flowchart') {
      code = lang.map(code.replace(/^\n/, '').split(/\n/), function (line) {
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
    return lang.map(words, function (word) {
      word = lang.trim(word);
      if (emojiMap[word]) {
        return tmplEmoji({
          emoji: emojiMap[word],
        }, templateHelper);
      }

      return word;
    }).join(' ');
  };

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

  marked.setOptions(options);

  return marked;
};
