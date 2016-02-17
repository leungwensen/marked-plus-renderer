# [marked-plus-renderer](http://leungwensen.github.io/marked-plus-renderer/)

[homepage](http://leungwensen.github.io/marked-plus-renderer/)

wrap [marked-plus](https://github.com/leungwensen/marked-plus) as a full-feature markdown renderer

## install

`npm install marked-plus-renderer --save`

## usage

### sample

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
    <link rel="stylesheet" href="$path/to/marked-plus-renderer/dist/libs.css">
</head>
<body>
    <div id="container" class="markdown-body"></div>
    <script src="$path/to/marked-plus-renderer/dist/libs.js"></script>
    <script src="$path/to/marked-plus-renderer/dist/renderer.js"></script>
    <script>
        fetch('$path/to/marked-plus-renderer/doc/features.md').then(function(markdownString){
            mpr.render(document.getElementById('container'), markdownString);
        });
    </script>
</body>
</html>
```

### use with npm

```shell
npm install marked-plus-renderer --save-dev
```

```html
<!--...-->
    <link rel="stylesheet" href="$path/to/marked-plus-renderer/dist/libs.css">
<!--...-->
    <script src="$path/to/marked-plus-renderer/dist/libs.js"></script>
    <script src="$path/to/main.js"></script>
<!--...-->
```

in `main.js`

```javascript
import mpr from 'marked-plus-renderer'; 

// your codes

mpr.render(container, markdownString);
```

## demo

* [features](./demo/features.html)

## features

- [x] all basic markdown features(headings, tables, etc.)
- [x] gfm-like check-list
- [x] code highlighting
- [x] definition list
- [x] footnote
- [x] graph
- [x] sequence diagram
- [x] gantt diagram
- [x] flowchart
- [x] latex math typesetting
- [x] emoji
- [x] html/js/css injection
