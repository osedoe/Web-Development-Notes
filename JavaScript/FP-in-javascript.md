---
title: "Functional programming 101"   
spoiler: "Review of some basic concepts of Functional Programming (FP)"  
tags: ["javascript", "notes", "functional programming"]
slug: "ES6-new-features"
contentType: "notes"
published: true
---

# Functional Programming Principles

Functional programming postulate the following goals when writing code:

Functions mus be:
 - Isolated
 - Pure (same input returns same output)
 - Have limited side effects

## Avoid mutation

One of the principles of functional programming is immutability.

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

---

## Currying

**Currying is the act of refactoring one function that takes more than one argument into a _Higher-Order Function_ (HOC) that returns a series of functions each accepting only one argument and only evaluating once we receive our last argument.**

The **arity** of a function is the number of arguments it requires. It can be:

- 1: Unary
- 2: Binary
- 3: Ternary
- 4: Quaternary
- ...

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

### Advantages of Currying

It seems hard at first to find a clear advantage to currying, moreover if we are new to FP. But in the long run it gets easier to reuse abstract fuctions, as well as abstract different implementations.

---

## Pointfree programming

One easy way to simplify and reduce the amount of bugs we have in our code is to avoid passing anonymous functions with interim variables.

There's a lot of methods in JavaScript that tend to have a callback function, like `reduce`, `filter`, `map` or `sort`, taht depend on a second function to evaluate itself.

If we enclose this callbacks in a different function and reference it, this is, a named function -we are making use of what is called **pointfree programming**.

Its advantages are:

- Legibility
- Less bugs
- Being able to unit tests those functions

```javascript
// Passing an anonymous function
[].map(function(value) {
  return value++;
});
// Or...
[].map(value => value++);

// With named functions
const plusOne = value => value++;
[].map(plusOne);
```

---

## Composition

Functional composition is an act or mechanism to combine simple functions to build more complicated ones. The output of one will become the input of the next one, and so on.

It works the same as composition in _mathematics_ -the result of each function is passed as the argument to the next one.

Usually, you will want to wrap one function inside another one.

```javascript
const result = addTwo(timesThree(23));
```

The larger the amount of functions we want to compose, the harder it's going to get to read.

A solution to this is to create a **compose** function:

```javascript
const compose = (...fns) => value => fns.reduceRight((acc, fn) => fn(acc), x);

const timesThreeThenAddTwo = compose(addTwo, timesThree));
```

The opposite of `compose` is **pipe**, which will read from outside to inside, or better said, fron _left to right_.

```javascript
const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), x);

// Hence to do 'timesThreeThenAddTwo'...
const timesThreeThenAddTwo = pipe(timesThree, addTwo));
```
