---
title: "Testing 101"   
spoiler: "Review of some basic concepts of testing in JS with Jest"  
tags: ["javascript", "testing", "jest"]
slug: "testing-in-js"
contentType: "notes"
published: false
---

# Jest

## Introduction

There are different ways of testing software, but we are going to focus on unit testing here.

This tests must be:

1. Fast
2. Limited range (small amount of asserts)
3. No dependencies (DBs, networks, etc)
4. Hav to work as documentation too
5. _Binaries_ -either they fail or not-
6. Without a specific order

## Installation

We will begin with a `npm install --save-dev jest`, although I'd recommend installing it globally too.

## The core

Now that we are good to go, we must define how to write tests. Each test consist at least from a _it_ or _test_ function
that will consist of:

- The **name of the test**, where wi will explain what we will be testing without incurring in technical details (as
  close to the business or logic side of the problem as possible)
- A **callback function**. where we will place our code
- A _timeout_ value that **by default is 5 seconds** and will dictate after how long the test will result in failing due
  its duration

```javascript
// Basic syntax for the test in hand 
it(name, fn, optionalTimeout);
test(name, fn, optionalTimeout);

// Run ONLY this test
fit(name, fn, optionalTimeout);
test.only(name, fn, optionalTimeout);

// DON'T run this test
xit(name, fn, optionalTimeout);
test.skip(name.fn, optionalTimeout);

// TODO test
it.todo(name, fn, optionalTimeout);
```

Once we know the different types, let's see the basic syntax:

```javascript
test("Should be the descriptive name of a test" +
    " that should sort of look like a user story", () => {
    // ...
});

// Test where we set the timeout
test("Should be a test with timeout", () => {
    // We are testing something that has to be 
    // faster than 1s to pass
}, 1000);
```

## Grouping tests

Usually we won't just write one test but a few, testing different features of our piece of code and cases.

So, we will usually write it as:

```javascript
describe('Mi test group', () => {
    test('Should test case C-1', () => {
        // ...
    });

    describe('Feature A', () => {
        test('Should test case A-1 checking X', () => {
            // ...
        });

        test('Should test case A-2 checking Y', () => {
            // ... 
        });

        test('Should test case A-3 checking Z', () => {
            // ...
        });
    });

    describe('Feature B', () => {
        test('Should test case B-1 checking J', () => {
            // ...
        });

        test('Should test case B-2 checking K', () => {
            // ...
        });
    });
});
```

## Defining preparations before we run the tests

We use two different keyword to define actions to execute before the test (initialize something, for example):

- `beforeAll(fn, timeout)`
- `beforeEach(fn, timeout)`

```javascript
describe('Mi group test with before', () => {
    beforeAll(() => {
        // This fn will execute at the 
        // beginning of the defined tests
    });

    test('Should test case C-1', () => {
        // ...
    });

    describe('Trying feature W', () => {
        beforeEach(() => {
            // This is going to execute
            // before each of the next cases
        });

        test('Should test case A-1', () => {
            // ...
        });

        test('Should test case A-2', () => {
            // ...
        });

        test('Should test case A-3', () => {
            // ...
        });
    });
});
```

## Defining steps to take after the tests

- `afterAll(fn, timeout)`
- `afterEach(fn, timeout)`

```javascript
describe('Mi test group', () => {
    afterAll(() => {
        // This is going to run after all the test
    });

    test('Should test case C-1', () => {
        // ...
    });

    describe('Trying feature W', () => {
        afterEach(() => {
            // This is going to execute after each of the next cases
        });

        test('Should test case A-1', () => {
            // ...
        });

        test('Should test case A-2', () => {
            // ...
        });

        test('Should test case A-3', () => {
            // ...
        });
    });
});
```

