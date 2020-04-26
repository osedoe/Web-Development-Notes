# 3. Functions

```python
def cheer(name):
    sentence = 'hi ' + name
    return sentence


def displaySum(number_one, number_two):
    result = number_one + number_two
    print(str(result))


print(cheer('Ose'))

displaySum(3, 4)
```

## 3.1. None Value

```python
None
```

- Equivalent to `null` or `undefined` in JS.
- Must be written with capital N. 
- When a function lacks of a `return` statement, it will return `None`

## 3.2. Keyword arguments

The arguments of a function tend to be defined by the order they appear, their position.

Keyword arguments get defined or identified by a word (keyword) that we place just before on the argument word itself, when we call a function.  

They tend to be used as optional parameters.

```python
print('Hello')

# It removes the default newline character that gets added at the end of each print function
print('Hello', end='')
print('World') # HelloWorld
 
# Changes the separator when printing various elements
print('Adam', 'Lily', 'Laura', sep=', ') # Adam, Lily, Laura 
```

## 3.3. Global statement

If we need to modify a global variable from within a function, we will use the global statement.

In the code below we will set the global variable list to None.
 
```python
def clearList:
    global list # Indicates that we are using the global variable list instead of creating a new one
    list = None # Re-assign said varaible to None


list = [5, 7, 9]
``` 

> Bear in mind that using this will make the function non-pure 

## 3.4. Exception Handling

The way to handle errors in Python is through `try` and `except` statements.

- `try` 

```python
# This function doesn't handle possible errors
def invalidFunction(divideBy):
    return 42 / divideBy


print(invalidFunction(2))
print(invalidFunction(12))
print(invalidFunction(0))
print(invalidFunction(1))


# But this one does
def validFunction(divideBy):
    try:
        return 42 / divideBy
    except ZeroDivisionError:
        print('Error: Invalid argument')


print(validFunction(2))
print(validFunction(12))
print(validFunction(0))
print(validFunction(1))
```
