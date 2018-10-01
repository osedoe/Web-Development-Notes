# NPM

Gestor de paquetes de NodeJS

## Repaso

Normalmente los proyectos en los servidores Debian se guardan en `/var/www/` en la carpeta _html_, la cual renombraremos con el nombre del dominio.

## Inicializacion

```terminal
# Nos colocamos en el raiz de nuestro proyecto
cd /var/www/html

npm init
npm init -y     # Omite asistente


# Se creara archivi package.json con la configuracion del proyecto
cat package.json
```

En la pagina de [npm](https://npmjs.com) se pueden encontrar todos los paquetes que se pueden instalar a través de npm.
O a través de la terminal con `npm search [paquete]`

```terminal
npm search postcss
npm s [paquete]
npm search --long [paquete]
```

## Instalación

```terminal
# Instala un paquete en el proyecto
npm install postcss
```

El `package.json` es el fichero que contiene la información.  
El `package-lock.json` controla el primer paquete.  
Y por último, `node_modules/` en donde se guardan los paquetes.

## Instalación avanzada

```terminal
# Instala un paquete de forma global en el sistema
npm install --global postcss-cli
npm i -g [paquete]

# Instala un paquete de produccion en el proyecto (def)
npm install --save-prod lodash-es
npm i -P [paquete]

# Instala un paquete de desarrollo en el proyecto
npm install --save-dev postcss
npm i -D [paquete]

# Desinstala un paquete del proyecto (de forma local)
## Si usamos el flag --global podemos desinstalarlo de forma global
npm uninstall postcss
npm rm [paquete]
```

**Package.json:**

Si tuviesemos ya un archivo `package.json`, podemos hacer un `npm install` para instalar todos los modulos que describe dicho _json_.

**Formas de instalar paquetes:**

Si no especificamos nada, se descarga la última versión disponible.

Podemos especificar la version como `[paquete]*@7.0.2`.

---

Podemos comprobar lo desactualizado que están los paquetes a través de

```terminal
npm outdated
```

Y para actualizar:

```terminal
npm update
```

## Scripts en npm

En el package.json podemos definir scripts:

```js
{
    ...
    "scripts": {
        "help": "echo Mensaje de ayuda",
        "css": "lessc src/css/index.less -o dist/css/index.css",
        "js": "babel src/js/index.js --presets babel-preset-end -o dist/js/index.es5.js",
        "clean": "rm -rf .cache dist package-lock.json"
    }
    ...
}
```

Y para ejecutar el script concreto

```terminal
npm run css
```

## Alternativa a NPM

Yarn Node Package Manager

```terminal
yarn init
yarn add [paquete]
yarn upgrade [paquete]
yarn remove [paquete]
```