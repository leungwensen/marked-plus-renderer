# marked-plus-renderer

wrap marked-plus as a full-feature markdown renderer

## install

`npm install marked-plus-renderer --save`

## usage

### sample (demo/features.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
    <link rel="stylesheet" href="../dist/libs.css">
    <style>
    </style>
</head>
<body>
    <div id="container" class="markdown-body"></div>
    <script src="../dist/libs.js"></script>
    <script src="../dist/renderer.js"></script>
    <script src="./jquery.js"></script>
    <script>
        var container = document.getElementById('container');
        $.get('../doc/features.md', function(markdownString){
            mpr.render(container, markdownString);
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
    <link rel="stylesheet" href="../dist/libs.css">
<!--...-->
    <script src="path/to/marked-plus-renderer/dist/libs.js"></script>
    <script src="path/to/main.js"></script>
<!--...-->
```

in `main.js`

```javascript
import mpr from 'marked-plus-renderer'; 

// codes

mpr.render(container, markdownString);
```

## features

### all basic markdown features(headings, tables, etc.)

### gfm-like check-list

### definition list

### footnote

### graph

### sequence diagram

### gantt diagram

### flowchart

### latex math typesetting

### emoji

### html/js/css injection
