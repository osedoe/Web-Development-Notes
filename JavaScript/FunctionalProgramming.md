# Functional Programming Principles

Functional programming has three main goals:

- Isolated functions
- Pure functions (same input returns same output)
- Functions with limited side effects

## Avoid mutation

One of the principles of functional programming is inmutability.

```javascript
const fixedValue = 4;

function incrementer(value) {
    return value + 1;
}

incrementer(fixedValue);
```

In this case we are avoiding the mutation of **fixedValue** by providing an argument to a function.