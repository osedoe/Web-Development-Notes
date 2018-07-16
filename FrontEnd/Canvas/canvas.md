# Canvas

## Starting with Canvas

To start using the canvas API, the first thing we need to do is define a `canvas` element.

```html
<canvas id="canv" width="480" height="320"></canvas>
```

It's worth noting that defining the size of the canvas in pixels will break the pixel ratio, so if later on you want to build a 50x50 square it won't be a perfect square.

After that we jump into our javascript file and reference the `canvas` element, as well as a `context` variable, to store what we are going to draw inside:

```javascript
const canvas = document.getElementById('canv');
const ctx = canvas.getContext("2d");
```

Using other arguments inside the `canvas.getContext()` method, we can use 3d graphics through webGL.

---

## Drawing

To draw figures we will use the `Context` reference we mentioned before.

Each figure will start with `.beginPath()` and end with `.endPath()`. And in the middle we will draw and paint the desired shape.

We can use different methods to draw shapes:

### Rect()

To draw rectangles or squares we will use `.rect()`, passing it certain paramenters.

```javascript
ctx.rect(x, y, width, height);
// Where X and Y specifies the coordinates
```

```javascript
ctx.beginPath();
ctx.rect(0, 0, 50, 50);
ctx.stroke();
ctx.closePath();
```

### Arc()

To draw circles we use `.arc()` with the following parameters:

```javascript
ctx.arc(x, y, radius, startAngle, endAngle, directionOfDrawing);
// directionOfDrawing is optional, being false for clockwise [default], or true for anti-clockwise
```

```javascript
ctx.beginPath();
ctx.arc(95, 50, 40, 0,2*Math.PI);
ctx.stroke();
```

## Painting

### Fill()

We use the method `fill()` along the `fillStyle` property to paint the shapes.

```javascript
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
```

### Stroke()

Other option is to use the `stroke()` method with `strokeStyle`, to trace shapes instead of filling it.

```javascript
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
```

---

There's another method that we can use: `fillRect()`, which will draw a rectangle and fill it at the same time, taking the form:

```javascript
ctx.fillRect(x, y, width, height);
```