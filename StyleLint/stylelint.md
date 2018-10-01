# StyleLint

```terminal
# Instalamos stylelint en nuestro proyecto
npm install --save-dev stylelint

# Instalamos configuracion estandar de StyleLink
npm install --save-dev stylelint-config-standard

# Comprobamos que este instalado correctamente
npx stylelint --version
>>> 9.6.0

# Creamos un archivo de configuracion para styleling
code .stylelintrc
```

`npx` sirve para buscar el comando en el propio proyecto.

Dentro del archivo .stylelintrc, escribimos

```json
{
	"extends": "stylelint-config-standard"
}
```

Ubna vez hecho esto, escribimos

`npx stylelint src/css/index.css`

tambien podemos modificar reglas:

```json
    "extends": "Stylelint-config-standard",
    "rules": {
        "selector-nested-pattern": "^&",
        "no-descending-specifity": null,
        "no-eol-whitespace": null,
        "declaration-empty-line-before": null
    }
```

```terminal
code --install-extension shinnn.stylelint
```
