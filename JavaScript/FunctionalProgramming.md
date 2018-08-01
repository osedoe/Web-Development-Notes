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
The idea is to avoid altering variables or objects, using functions and its arguments.

Inside the functions we tend to copy the variable or object we are going to manipulate [array].slice(0) will make a shallow copy of an array, for example.

### Slice() vs Splice()

**Splice** is useful when we want to remove certain items from an array keeping the others, but it has the problematic of altering the original array, which is contrary to our functional programming principles of avoiding mutation.

**Slice**, in the other ohand, does not mutate the original array, but it returns a new array that can be saved into a variable.

So using `slice()` instead of `splice()` helps avoid undesired mutation, and we should favour the use of the first one.