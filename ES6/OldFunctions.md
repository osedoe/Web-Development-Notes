# Functions in JavaScript

## Quick Review

### Function Declaration / Named Functions

Creates a function to be called later in the code. Since you need to call it later on, we need to give it a name.

```javascript
function area(width, height) {
  return width * height;
}
area(3, 4);
```

### Function Expression

When we put a function when the interpreter expects an expression. The name is usually omitted, although not mandatory. When this happens, they are called **Anonymous Functions**.

```javascript
const area = function(width, area) {
  return width * height;
};

area(3, 4);
```

**\*Note:** In this type of functions, you can't call the function before it's declared.\*

### IIFE or Immediately Invoked Function Expressions

They lack of a name and are executed _on-the-go_.

```javascript
const area = (function() {
  const width = 3;
  const height = 2;
  return width * height;
})();
```

Pay attention to the conglomerate of parentheses. The "()" executes the function straight away after been declared. And the last ")" finishes wrapping the whole thing that we opened before the keyword _function_.

[Go back to ES6](ES6.md)
