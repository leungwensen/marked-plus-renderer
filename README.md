# marked-plus

marked with a few more features

## why

to add a few more features that are missing in marked.

## install

`npm install marked-plus --save`

## usage

almost the same as [marked#usage](https://github.com/chjj/marked#usage), but with an extra option: `extra: true|false`

with the `extra: true` option, you enabled the following features:

### gfm-like check-lists

```
- [ ] unchecked
- [x] checked
```

### footnote

```
Here is a footnote[^footnote].

  [^footnote]: Here is the *text* of the **footnote**.
```

### definition list

```
Term 1
:   Definition 1

Term 2
:   This definition has a code block.

        code block
```

### toc (TODO)

```
[toc] [a](#a)
```

see [marked-plus-renderer](https://github.com/leungwensen/marked-plus-renderer) for more details.

if what you want is a full-feature markdown renderer, you can use [marked-plus-renderer](https://github.com/leungwensen/marked-plus-renderer) directly.
