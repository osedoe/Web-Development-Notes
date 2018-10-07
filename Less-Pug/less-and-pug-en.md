# Pre-processors

## Less

LESS, SASS, SCSS, Stylus and PostCSS are different pre-processors.

## Project organization

We'll split the proyect into two directores: _src/_ and _dist/_.

Proyect/

- dist/  
- src/  
  - css/
    - Index.less
  - img/
  - index.pug

### Syntax

```terminal
$ lessc             # basic syntax
// Comment
```

The VSCode extension called **Easy-Less** let us declare on the css first line something to minify it.

```less
// out: index.min.css, compress: true;
```

Or we can do it through LESS with the flag _--compress_, creating the minified CSS.

**Note:** _The nesting works similar to SASS._

### LESS Variables

```less
@maincolor: blue;
>>>background-color: @maincolor;
```

### Mixins or functions

Where `mixin` is the name of the function and
`@color` the argument (although it's declared similar to a variable).

```less
.mixin(@color) {
    background-color: @color;
    margin: 20px;
    padding: 20px;
}
```

We can also declare default parameters inside the mixin like `@color: black, @marg: 20px`. If we had a few parameters inside the mixing but we would like to pass just an argument, we will just call it with that.

We can do some basic operations too:

```less
@ancho: 400px;
@color: #555;

.uno {
    width: @ancho \* 2;
}
```

### LESS Files Organization

```less
// Archivos LESS
@import “variables.less”;
@import “menu.css”;
// Archivos CSS
@import (css) “fonts.css”;
```

---

## Pug

**!** (Using Emmet)

```pug
doctype html
html(lang=”es”)
head
meta(charset=”UTF-8”)
title Documento
body
.padre
.clase Texto del div
```

### Installation

```terminal
npm install -f pug-lint       # Linter de pug
code --install-extension mrmlnc.puglint       # Extension de VSCode
npm install -g pug-cli        # Aunque más adelante no lo instalemos en global
pug index.pug
```