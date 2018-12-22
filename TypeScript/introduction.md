# TypeScript

There's two ways of getting TypeScript:

- Via `npm`
- Or via VSCode plugins.

## Introduction

If we create a `*.ts` file, we can translate it into plain JavaScript with the command:

```zsh
tsc test.ts
# Will create a test.js file in the same directory
```

### Type annotations

Types are ways of record the intended data structure of a function or a variable.

We can find the most common types you would expect in any language:

### Boolean

The most basic datatype

```typescript
let truth: boolean = true;
let dare: boolean = false;
```

### number

All numbers in typescript are floating point values.

```typescript
let integer: number = 10;
let float: number = 5.2;
```

### String

String data type is used to textual data types. It supports double quotes, single quotes or backticks.

```typescript
let greet: string = 'Hello!';
```

### Array

Array types can be written in two ways.

```typescript
// Use the type of the element followed by []
let list1: number[] = [1, 2, 3];
// Use a generic array type: Array<elemType>
let list2: Array<number> = [1, 2, 3];
```

### Tuple

Tuple types allow you to express an **array** where the type of a spacific number of elements in it are known, but **not need to be the same kind**.

```typescript
let tuple: [string, number];
x = ['lalala', 5];
```

TypeScript will check the type of each element and allow or forbid operations or access on it.

If the access is on an element outside the set, a **union type** is used:

```typescript
x[3] = 'world'; // x[3] will be the type string | number
console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'
x[6] = true; // Error, 'boolean' isn't 'string | number'
```

---

In the following example we are defining that the parameteres of the _sum_ function are numbers.

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```