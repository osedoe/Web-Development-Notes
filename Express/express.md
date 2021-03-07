# Express

## Initialization

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

Functions that takes a request object and either returns a response to the client or passes control to another middleare
function.

### Examples

As an example, both the _route handler function+ and `express.json()` are middlewares.

```javascript
// Route handler function  
...
('/'), (req, res) => {
    // ...
}
)
;

// express.json
app.use(Express.json());
```

This middleware will read the body of the request and if there's a JSON object and set it to `req.body`.

### Custom middlewares

The way to create a custom middleware is to wrap it with a _app.use_ function.

```javascript
app.use(function (req, res, next) {
    console.log('This is a middleware');
    next();
});
```

If we don't call `next()`, the function will never terminate the request.

Also, each middleware tends to be in a separate file or module.

### Other middlewares

**Url Enconded:**  
To pass information as _x-www-form-encoded.

```javascript
app.use(Express.urlencoded({ extended: true }));
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

### Third party middleware

[Third-party middleware](https://expressjs.com/en/resources/middleware.html})

**Research:**

-Helmet -Morgan

## Environments

This environment variable returns the type of environment of our application. By default, it returns undefined -but we
can set it to:

-Development -Testing -Staging -Production

```javascript
process.env.NODE_ENV // returns undefined by default
```

Another way is:

```javascript
app.get('env') // returns development by default
```

To set the environment variable we use `export`(OSX) or `set`(Windows).

```bash
export NODE_ENV=testing
```

## Configuration

We can use either [_rc_](https://www.npmjs.com/package/rc) or [_config_](https://www.npmjs.com/package/config).

For _config_, we will create a config folder with various json files that we can customize:

_Look up [documentation]()

`default.json:`

```json
{
  "name": "Movies App"
}

```

`development.json:`

```json
{
  "name": "Movies App - Development",
  "mail": {
    "host": "dev-mail-server"
  }
}
```

`production.json:`

```json
{
  "name": "Movies App - Production",
  "mail": {
    "host": "prod-mail-server"
  }
}
```

`custom-environment-variables.json:```

```json
{
  "mail": {
    "password": "app_password"
  }
}
```

## Debugging

The [Debug](https://www.npmjs.com/package/debug) module returns a function that receives an argument that we will use
for debugging.

```javascript
const startupDebugger = Debug('app:startup');
const dbDebugger = Debug('app:db');
// ...

startupDebugger('Morgan enabled...');
```

Here we have created various debugging functions but we don't always need it so we just can callit debug instead.

Then we are going to need to set up our environment variable.

```bash
export DEBUG=app:startup
# OR
export DEBUG=app:startup,app:db
# OR
export DEBUG=app:*
```

## Templating Engines

As we have seen, every time we do a request we get returned a JSON object, but there are cases where we need to return
an HTML page. In those cases, we will use **templating engines**.

The most famous ones are:

-Pug -Mustache -EJS

[NOT FINISHED...]
