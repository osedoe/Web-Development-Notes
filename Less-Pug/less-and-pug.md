# Less

LESS, SASS, SCSS, Stylus, PostCSS son diferentes pre-procesadores.

Dividiremos ahora el proyecto en dos directorios: src/ y dist/
Proyecto
Dist/
Src/
Css/
Index.less
Img/
index.pug

Less syntax
$ lessc

// Comment

La ext de vscode de easy-less nos permite leer la primera línea y hacer lo que decimos:
// out: index.min.css, compress: true;
O podemos hacerlo a través de less con el flag --compress.
En este caso, nos crea dicho archivo css minificado.

El anidado es similar al SASS.

Variables en less
@maincolor: blue; >>> background-color: @maincolor;

Mixins, clases ‘inception’ o funciones.

// Aquí mixin es el nombre de la función y color es el argumento (no variable)
.mixin(@color) {
background-color: @color;
margin: 20px;
padding: 20px;
}

También se le pueden poner parámetros por defecto dentro de la función tal que... @color: black, @marg: 20px. Si tuviésemos varios argumentos dentro de una función pero sólo quisiéramos declarar uno, simplemente lo nombramos.

También se pueden hacer operaciones
@ancho: 400px;
@color: #555;

.uno {
Width: @ancho \* 2;
}

Organización de archivos LESS
// Archivos LESS
@import “variables.less”;
@import “menu.css”;
// Archivos CSS
@import (css) “fonts.css”;

Pug
! (Usando Emmet)

doctype html
html(lang=”es”)
head
meta(charset=”UTF-8”)
title Documento
body
.padre
.clase Texto del div

Instalacion

# Opcional, un linter

$ npm install -f pug-lint
$ code --install-extension mrmlnc.puglint

# Más adelante, no se instala como global

$ npm install -g pug-cli
$ pug index.pug
