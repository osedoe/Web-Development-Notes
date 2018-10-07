# PostCSS

It's a pre-processor, post-processor and transformer system that will take our CSS and change it through JavaScript.

```terminal
$ npm install -g postcss postcss-cli
$ npm install -g autoprefixer
// Although we should not install it globally.
$ postcss index.css --no-map -u autoprefixer
// OR
$ postcss index.css --no-map -u autoprefixer -o index.out.css // Saves the file at index.out.css
```

We will use it to concatenate PostCSS plugins that will transform our CSS.

## Help

```terminal
postcss --help
```

[PostCSS Parts](https://www.postcss.parts/)
It's the page for PostCSS plugins.

If we have a doubt about how to use one, we can try with a GitHub search like _"awesome [something]"_.

`*.pcss` is the PostCSS extension, although it can read `*.css`.

## Famous Plugins

- Autoprefixer
- Clean-css
- Stylelint
- Postcss-preset-env (pack of plugins)

### PostCSS Terminal parameters

The configuration file in PostCSS is `.postcssrc`. It should go on the root folder of the project. Here we will keep all our plugin configurations. Instead of having to use `-u [plugin-name]` like we saw above.

```terminal
$ postcss src/css/index.pcss            # original postcss file
            --watch                     # watches for changes (same as sass)
            --verbose                   # It will tell us everything is doing under the hood
            --no-map                    # Omits creating the source map
            --config .                  # Creates the config file in the current directory (.postcssrc)
            -o dist/css/index.min.css   # .css file
```

## Initialization

As we saw, first thing we need to do is to install the plugins.

```terminal
npm init -y
npm install --save-dev postcss-easy-import postcss-mixins postcss-preset-env postcss-font-magician autoprefixer postcss-clean
```

Then, we will create the `.postcssrc` file through terminal

[NOT FINISHED]
