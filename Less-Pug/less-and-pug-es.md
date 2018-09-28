# Preprocesadores

## Less

LESS, SASS, SCSS, Stylus, PostCSS son diferentes pre-procesadores.

Dividiremos ahora el proyecto en dos directorios: _src/_ y _dist/_.

Proyecto/

- dist/  
- src/  
  - css/
    - Index.less
  - img/
  - index.pug

### Less syntax

```terminal
$ lessc             # basic syntax
// Comment
```

La ext de vscode de **easy-less** nos permite leer la primera línea y hacer lo que decimos:

```less
// out: index.min.css, compress: true;
```

O podemos hacerlo a través de less con el flag **--compress**.
En este caso, nos crea dicho archivo css minificado.

_El anidado es similar al SASS._

### Variables en less

```less
@maincolor: blue;
>>>background-color: @maincolor;
```

### Mixins o funciones

Aquí mixin es el nombre de la función y color es el argumento (que no 'variable', aunque se declaren igual).

```less
.mixin(@color) {
    background-color: @color;
    margin: 20px;
    padding: 20px;
}
```

También se le pueden poner parámetros por defecto dentro de la función tal que... `@color: black, @marg: 20px`. Si tuviésemos varios argumentos dentro de una función pero sólo quisiéramos declarar uno, simplemente lo nombramos.

También se pueden hacer operaciones:

```less
@ancho: 400px;
@color: #555;

.uno {
    width: @ancho \* 2;
}
```

### Organización de archivos LESS

```less
// Archivos LESS
@import “variables.less”;
@import “menu.css”;
// Archivos CSS
@import (css) “fonts.css”;
```

---

## Pug

**!** (Usando Emmet)

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

### Instalacion

Podemos instalar el linter de pug **pug-lint**

```terminal
npm install -f pug-lint       # Linter de pug
code --install-extension mrmlnc.puglint       # Extension de VSCode
npm install -g pug-cli        # Aunque más adelante no lo instalemos en global
pug index.pug
```