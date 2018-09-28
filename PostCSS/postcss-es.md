# Post CSS

Es un pre-procesador, post-procesador y transformador.  
Es un sistema que mediante js coge tu css y lo cambia.

```terminal
$ npm install -g postcss postcss-cli
$ npm install -g autoprefixer

$ postcss index.css --no-map -u autoprefixer
// OR
$ postcss index.css --no-map -u autoprefixer -o index.out.css // Guarda en archivo
```

Lo usaremos para encadenar plugins de PostCSS que transforman nuestro CSS

```terminal
postcss --help
```

PostCSS parts es la pagina para plugins
(buscar 'awesome something') para readmes de todo en GitHub.

\*.pcss es la extension de postcss

## Plugins

-   Autoprefixer: Siempre
-   Clean-css : minifica y optimiza (siempre al final)
-   StyleLint: Linter de CSS
-   Postcss-preset-env: Es un pack de plugins.

## Parametros de CSS

Comandos para transformar codigo PostCSS a CSS, utilizando diferentes plugins mencionados en el fichero _`.postcssrc`_.

```terminal
$ postcss src/css/index.pcss            # PostCSS original
            --watch                     # Vigila cambios
            --verbose                   # Avisa de todo
            --no-map                    # No genera source map
            --config .                  # Config en carpeta actual (.postcssrc)
            -o dist/css/index.min.css   # Archivo .css final
```

## Inicializacion

Primero instalamos los plugins, y luego lo cargaremos rellenando el archivo _.ppostcssrc_.

```terminal
$ npm init -y
$ npm install --save-dev postcss-easy-import
$ npm install --save-dev postcss-mixins
```

Con

```code
{
    "plugins": {
        "postcss-easy-import": {
            "prefix": "_",
            "extensions": [".pcss", ".css"]
        },
        "postcss-mixins": true;
    }
}
```

[NOT FINISHED]
