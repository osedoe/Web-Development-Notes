# Jest

![Jest-logo]('./../img/jest.png')

## Introduction

There's different ways of testing software, but we are going to focus on unit testing here.
This tests must be:

1. Fast
2. Limited range (small amount of asserts)
3. No dependencies (DBs, networks, etc)
4. Hav to work as documentation too
5. "Binaries" -either they fail or not-
6. Without an specific order

## Install

As usual we will begin with a `npm install --save-dev jest`. Although I'd recommend installing it globally too.

## The core

Now that we are good to go, we must define how to write tests. There's four ways:

```javascript
it(name, fn, timeout): // Standard version
// 'test' and 'it' are the same
test(name, fn, timeout); // Jest way

test.only(name, fn, timeout); // Run ONLY this test

test.skip(name. fn, tiemout); // NOT run this test
```

Once we know the different types, let's see the basic syntax:

```javascript
// Basic test (it has a default timeout of 5s)
test("This is a test", () => {
	// Testing
});

// Test where we set the timeout
test(
	"This is a test with timeout",
	() => {
		// We are testing something that has to be faster than 1s to pass
	},
	1000
);
```

## Grouping tests

Usually we won't just write A test, but a few of them testing different features of our piece of code, as well as with different cases.

So, we will usually write it as:

```javascript
describe('Mi test group', () => {
    test('Test case C-1, () => {});

    describe('We are testing feature A', () => {
        test('Test case A-1 checking X', () => {});
        test('Test case A-2 checking Y', () => {});
        test('Test case A-3 checking Z', () => {});
    });

    describe('We are testing feature B', () => {
        test('Test case B-1 checking J', () => {});
        test('Test case B-2 checking K', () => {});
    });
});
```

## Defining steps to do before tests

We use two different keyword to define actions to execute before the test (initialize something, for example):

- `beforeAll(fn, timeout)`
- `beforeEach(fn, timeout)`

```javascript
describe('Mi group test with before', () => {
    beforeAll(() => { /* This fn will execute at teh beginning of the defined tests */});

    test('Test case C-1', () => {});

    describe('Trying feature W', () => {
        beforeEach(() => {
            /* This is going to execute before each of the next cases */
        }):
        test('Test case A-1', () => {});
        test('Test case A-2', () => {});
        test('Test case A-3', () => {});
    });
});
```

## Defining steps to do after the tests

- `afterAll(fn, timeout)`
- `afterEach(fn, timeout)`

```javascript
describe('Mi test group', () => {
    afterAll(() => { /* This is going to run after all the test */ });

    test('Test case C-1', () => {});

    describe('Trying feature W', () => {
        afterEach(() => {
            /* This is going to execute after each of the next cases */
        }):
        test('Test case A-1', () => {});
        test('Test case A-2', () => {});
        test('Test case A-3', () => {});
    });
});
```

## Writing the actual tests

// Expect -NOT FINISHED-