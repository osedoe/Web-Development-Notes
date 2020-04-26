# 2. Python basics

Various useful functions:

- str(): Will evaluate the string version of a number

- int(): Will evaluate to an integer number

- float(): Will evaluate to a float number

- print(): Duh!

- input(): 🤔 

## 2.1. Math operators

| Operator | Operation          | Example | Evaluates to... |
|----------|--------------------|---------|-----------------|
| **       | Exponent           | 2 ** 3  | 8               |
| %        | Modulus/remainder  | 22 % 8  | 6               |
| //       | Floored division   | 22 // 8 | 2               |
| /        | Division           | 22 / 8  | 2.75            |
| *        | Multiplication     | 3 * 5   | 15              |
| -        | Subtraction        | 5 - 2   | 3               |
| +        | Addition           | 2 + 2   | 4               |

## 2.2. Variables

Variables in Python are mutable and are declared as:

`car = 4`

## 2.3. Strings

-  String concatenation and replication

We use the plus sign to concatenate two strings.

```python
'Hello' + ' ' + 'world!' # 'Hello world!'
```

Also, we can use other operators to do further operations, like:

```python
'Hello' * 3 # 'HelloHelloHello'
``` 

## 2.4. Boolean values

Boolean values are named with a capital T or F, with the rest of the world in lowecase.

```python
bool = True
bool2 = False
```

## 2.5. Comparison or relational operators

| Operator | Meaning                  |
|----------|--------------------------|
| ==       | Equal to                 |
| !=       | Not equal to             |
| <        | Less than                | 
| >        | Greater than             | 
| <=       | Less than or equal to    |
| >=       | Greater than or equal to | 

## 2.6. Boolean operators

- `and`
- `or`
- `not`

## 2.7. Blocks

In Python, we group code in blocks through indentation.

3 rules:

1) Blocks begin when the indentation increases
2) Blocks can contain other blocks
3) Block end when the indentation decreases to zero or to a containing block's indentation
   
## 2.8. Conditional statements

- `If` statement:

```python
if job = 'developer':
    print('bug')
```

- `Else` statement:

```python
if job = 'developer':
    print('bug')
else: 
print('roam free')
``` 

- `Elif` statement:

```python
if job = 'developer':
    print('bug')
elif job = 'designer':
    print('paint')
```

> Python doesn't have a staight way of doing switch statements, so we can stack `elifs`... for now

## 2.9. While loop

```python
slot = 0
while slot < 10:
    print('Printing slot number ' + str(slot))
    slot = slot + 1
```

- While loops accept `break` statements to exit early from a loop

### Continue statements

Like `break` statements, but it tells the execution to jump back to the start of the loop and reevaluate the loop condition

## 2.10. For loop

```python
for i in range(5):
    print('value is ' + i) 
```

> We can use `break` and `continue` statements inside for loops too

### The range function 

This function can have up to three parameters:

- The first one is the start range, being inclusive
- The second one is the end range, being exclusive
- The third parameter is the step, this is, the amount that is increased on each iteration

## 2.11. Importing modules

```python
import random

for i in range(5): 
    print(random.randint(1, 10)
```

```python
import random, math
```

### From import statements

This is an alternative way of importing modules

```python
from random import *
```

## 2.12. *Sys.exit()* function

We can always end our program early with the `sys.exit()` function, just remember to import the sys module
