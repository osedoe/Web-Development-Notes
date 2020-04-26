# 4. Lists

## 4.1. List Data Type

```python
names = ['Em', 'Tim', 'Jim']
names[2]        # 'Jim'

stuff = ['dog', 22, True, None]
stuff[-2]        # True

bidimensional_array = [['Canaries', 'Madrid'], ['Liverpool', 'Bristol']]
bidimensional_array[1]      # ['Liverpool', 'Bristol']
bidimensional_array[0][1]       # 'Madrid'
```

## 4.2. *Slice()* function

To get various values from a list we use `slice`.

```python
list_of_things = ['draw', 'chair', 'desk']

list_of_things[0:3]     # ['draw', 'chair', 'desk']
list_of_things[1:3]     # ['chair', 'desk']
list_of_things[:3]     # ['draw', 'chair', 'desk']
list_of_things[1:]     # ['chair', 'desk']
list_of_things[:]     # ['draw', 'chair', 'desk']
```

### 4.3. *Len()* function

The `len()` function returns the length or amount of values that there's in a list

```python
list_of_things = ['draw', 'chair', 'desk']

len(list_of_things)     # 3
```

## 4.4 List concatenation and list replication

The `+` operator can be used to concatenate lists as we would do with strings. And the `*` to replicate them

```python
numbers_list = [1, 2, 3]
letters_list = ['a', 'b', 'c']

number_list + letters_list      # [1, 2, 3, 'a', 'b', 'c']

numbers_list * 3        # [1, 2, 3, 1, 2, 3, 1, 2, 3] 
```

## 4.5. Using *for loops* in lists

```python
for i in range(len(random_list):
    print('Index: ' +  str(i) + ' is ' + str(random_list[i]))
```

## 4.6. Using *in* and *not* with lists

We can use these keywords to check whether a value is or not in a list

```python
numbers = [1, 2, 3]

5 in numbers        # False
10 not in number        # True
```

## 4.7. Multiple assignment / Tuple unpacking

```python
stuff_list = ['Spain', 'Vauxhall', 'cactus']
country, car, plant = stuff
```

## 4.8. Augmented assignment operators

These two are equivalent:

```python
age = age + 1

age += 1
```

| Augmented assignment statement | Equivalent assignment statement |
|--------------------------------|---------------------------------|
| age += 1                       | age = age + 1                   |
| age -= 1                       | age = age - 1                   |
| age *= 1                       | age = age * 1                   |
| age /= 1                       | age = age / 1                   |
| age %= 1                       | age = age % 1                   |

> The first two assignments can do string concatenation and string replication respectively

## 4.9. List methods

### Remove values

To remove a value from a list we use the `del` statement or the `remove` method.

```python
random_list = [5, 'Ana', True]

del random_list[1]
random_list     # [5, True]
```

```python
random_list = [5, 'Ana', True]

random_list.remove(True)
random_list     # [5, 'Ana']
```

> We will use `del` when we know the item's index.
  
> We will use `remove` when we know the item itself. 

### *Enumerate()* function with lists

Instead of using `range(len(stuff_list))` in a `for loop`, we could use the `enumerate()` function. 

On each iteration of a loop, this function will return two values:
- The index of the item in the list
- The item in the list itself

```python
animals = ['squirrel', 'magpie', 'fox]
for index, item in enumare(animals):
    print('Index: ' + str(index))
    print('Item: ' + item)
```

### *Random* module methods

This module has a few functions that accept lists for arguments.

- `random.choice(<list>)`. Return a random item from a list
- `random.shuffle(<list>)`.  Reorder the items in a list

### *Index()* method in a list

```python
cars = ['Vauxhall', 'Ford', 'Renaul']
cars.index('Ford')      # 1
cars.index('Fiat')      # Throws an error
```

### *Append()* & *insert()* methods in a list

`Append(<value>)` adds the argument to the end of a list

```python
numbers = [1, 2, 3]
numbers.append(4)
numbers     # [1, 2, 3, 4]
```

`Insert(<index>, <value>)` adds it to the specified index of a list

```python
numbers = [1, 2, 3]
numbers.insert(1, 'deal_breaker')
numbers     # [1, 'deal_breaker', 2, 3]
```

> Remember that these methods don't return the value, but modify the original list

### Sort() method 

This method will sort lists of strings or numbers.

If we pass a keyword argument of `reverse=True` to the sort method, it will sort it in reverse order.

```python
numbers = [5, 22, -10]
numbers.sort()
numbers     # [-10, 5, 22]
```

```python
things = ['cars', 'animals', 'food']
numbers.sort(reverse=True)
numbers     # ['food', 'car's, 'animals']
```

> We can't sort lists that have both values and numbers in it

This method uses 'ASCIIbetical order', uppercase letters come before lowercase. If we need to sort in alphabetical order we can change the `key` keyword with the `str.lower` value.

```python
things.sort(key=str.lower)
```

### *Reverse()* method

This method will reverse the order of the items in a list, modifying the original list since it returns None

```python
things.reverse()
```

## 4.10. Line continuation character

We use the \ character to tell the interpreter that the instruction we are on continues on the next line

```python
print('This line starts here ' + \
    'and finishes here')
```
