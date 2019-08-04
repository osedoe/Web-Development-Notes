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
To pass information as _x-www-form-encoded.

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
