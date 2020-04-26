# Functions

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

## None Value

```python
None
```

- Equivalent to `null` or `undefined` in JS.
- Must be written with capital N. 
- When a function lacks of a `return` statement, it will return `None`

## Keyword arguments

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
