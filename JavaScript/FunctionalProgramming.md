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

### Concat() vs Push()

If we compare both methods, we see that the **push** method mutates the original array while with **concat** we are returning a new array. So we should favour the use of `concat()` instead of `push()`.

---

## Reduce

`Array.prototype.reduce()` is the most general and useful of all array operations. We can solve almost any array processing problem with this method.

That's the main difference with `map()` `filter()`, since **they do not allow interaction between different elements of the array**.

### Every() and Some()

Other useful functional methods are `every()` that will check that every element in an array satisfies a condition passed as a callback, or `some()`, that will check if at least one element satisfies a condition.

Both methods return booleans.

## Currying

The **arity** of a function is the number of arguments it requires.

Therefore, **currying** is converting a function that requires *N* number of arguments or arity, into *N* functions with arity 1. It could be defined as well as restructuring a function so it takes one argument, then returns another function that takes the next argument, and so on.

```javascript
// Un-curried function
function unCurried(x, y) {
  return x + y;
}

// Curried function
function curried(x) {
  return function(y) {
    return x + y;
  }
}
curried(1)(2)       // Returns 3
```

```javascript
// Fat arrow version
const curry = x => y => x + y;

const tres = curry(1)(2);      // 3
```

```javascript
// Call a curried function in parts:
var funcForY = curried(1);
console.log(funcForY(2));        // Prints 3
```

**Partial application** can be described as applying a few arguments to a function at a time and returning another function that is applied to more arguments.

```javascript
//Impartial function
function impartial(x, y, z) {
  return x + y + z;
}
var partialFn = impartial.bind(this, 1, 2);
partialFn(10); // Returns 13
```
