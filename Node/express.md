# Express

## Initialization

```javascript
import Express from 'express';
// Or: const Express = require('express');
const app = Express();
```

## HTTP requests

- Get
- Post
- Put
- Delete

```javascript
app.get('[route]', (request, response) => {
    // code
})

// where [route] is the url like '/api/movies/:userId/:token'
```

## Parameters

**Route parameters**:  
Route parameters are used for esential or required values.  
To access the route parameters we use:

```javascript
req.params.[param]
// So for the previous route example:
req.params.userId
req.params.token
```

**Query string parameters**:  
*Query string* parameters are used to provide aditional data for the backend services.  
To access query string params, for example, for an url like `/api/movies?sortBy=name`:

Input:

```javascript
req.query
```

Output:

```json
{
    sortBy: "year"
}
```

**Body object**:

```javascript
req.body
```

## Middleware / Middleware function

Functions that takes a request object and either returns a response to the client or passes control to another middleare function.

### Examples

As an example, both the _route handler function+ and `express.json()` are middlewares.

```javascript
// Route handler function  
...('/'), (req, res) => {
    // ...
});

// express.json
app.use(Express.json());
```

This middleware will read the body of the request and if there's a JSON object and set it to `req.body`.

### Custom middlewares

The way to create a custom middleware is to wrap it with a _app.use_ function.

```javascript
app.use( function(req, res, next) {
    console.log('This is a middleware');
    next();
});
```

If we don't call `next()`, the function will never terminate the request.

Also, each middleware tends to be in a separate file or module.

### Other middlewares

**Url Enconded:**  
To pass information as _x-www-form-encoded_.

```javascript
app.use(Express.urlencoded({extended: true}));
```

**Static:**  
We use it to serve static files.

```js
app.use(Express.static('public'));
```

We are going to put all our static files here. and can access through:
`localhost:3000/example.txt` as long as it's in the public folder at root level.

We can also specify a virtual path as:

```javascript
app.use('static', Express.static('public'));
// Outputs: localhost:3000/static/example.txt
```

## Environments

-Development
-Testing
-Staging
-Production

There's two ways:

- Through `process.env.NODE_ENV`: Returns undefined if not set
- `app.get('env')`: Returns 'development' by defualt

We can set different envitronments to do certain things only in specific ones.

If, for example, we want to use morgan only in development environment:

```javascript
if (app.get('env') === 'development') {
    app.use(Morgan('tiny'));
}
```

## Configuration

It's common to store configuration files in each environment.  
We either can use [rc](https://www.npmjs.com/package/rc) or [config](https://www.npmjs.com/package/config) from **Npm**.  
We will import it as usual:

```javascript
import Config from 'config';
```

First we will create a `config/` folder and a `default.json` and `development.json` files for default and development configuration parameters.

```json
{
    "name": "App"
    "mail": {
        "host": "prod-mail-server"
    }
}
```

```json
{
    "name": "App - Development"
}
```

The way to access these properties is:

```javascript
Config.get('name');
Config.get('mail.host');
```

When we want to store sensitive data, we will store it in environment variables. If we set up an _app_password_ EV, we can access it doing the following.

First we will create inside `config/` a `custom-environment-variables.json` file:

```json
{
  "mail": {
    "password": "app_password"
  }
}
```

Then we simply use:

```javascript
Config.get('mail.password');
```

## Debugging

Instead of console logging our whole app, we can use a package called `debug` to debug our application, and we can set the debugging level (amount of information displayed) or type though an environment variable.

The debug module returns a function that we will call with an argument that will be a namespace that we define for debugging.

```javascript
import Debug from 'debug';
const startupDebugger = Debug('app:startup');
const dbDebugger = Debug('app:db');
```

Then all we have to do is replace the _.log_'s with out custom function:

```javascript
startupDebugger('Morgan enabled...');
```

Now all we have left to do is set our environment variable **DEBUG** to the parameters we have passed.

```bash
export DEBUG=app:startup
# Or
export dEBUG=app:startup,app:db
export DEBUG=app:*
```

We can also set the EV at the time of running our app

```bash
DEBUG=app:Db nodemon index.js
```

## Templating engines

So far we have always returned JSON objects, but we can also return HTML markup, doing so with a templating engine.

There's a few, like  `pug`, `handlebars`, etc.

To use **pug**:

```javascript
// We don't need to require or import it this way
app.set('view engine', 'pug');
// Optional param to overwrite the default templates path ('./views/')
app.set('views', './templates');
```

_index.pug_

```pug
html
    head
        title= title
    body
        h1= message
```

Now, in our get endpoint, we will render out template in a render method.  
As the first parameter, we will pass the name of our file inside the template folder, and second an object with the parameters defined.

```javascript
app.get('/', (req, res) => {
    res.render('index', {title: 'My App', message: 'Hello'});
});
```

## Database integration

[Express options](https://expressjs.com/en/guide/database-integration.html)

To work with a specific database, we just need to install the driver and follow the steps to conenct and then interact with said database.

## Structure application

We should split our endpoints depending of their use or domain field.  
For that, we will have to adapt the new file that we will want to import to our index as:

```javascript
const router = Express.Router();

```

Replacing _app_ for _router_ and exporting it at the end. And now back in our `index.ts`:

```javascript
import { coursesRoute } from './../routes/courses'
app.use('/api/courses', coursesRoute);
```

The first argument being a path, and the second our imported module. In this way, we are telling Express that everything that goes through that route has to be pointed to the `courses.ts` file.

Now in our `courses.ts` we can remove the path of our route that we pointed before for each route.
