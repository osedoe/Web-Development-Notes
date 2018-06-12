# Regular Expressions

Regular Expressions are used to match string patterns.

They have proved being really useful, mostly when I'm going throught competitive algorithm challenges, but I always end up forgetting them.

In JavaScript, we use the `/pattern/` syntax. And we can use the **.test()** method, that returns true or false, to check for those patterns inside a string.

```javascript
const str = "Hello World";
const regex = /Hello/;
regex.test(str); // true
```

We can also use the **|** or **OR** operator to search for multiple patterns. We can even concatenate it like `/Human|Cat|Dog/`.

To ignore the difference between uppercase and lowercase letters, we can use the flag `i`, as`/RegExp/i`.

To extract matches from the RegExp, will use `.match()` on a String passing the RegExp as a parameter.

```javascript
const str = "Abstract Chill";
str.match(/chill/i);
// Returns ["Chill"]
```

To make that search/extraction of a pattern be more than once or the first coincidence, we will add the `g` flag, like `/RegExp/g`

A period inside the RegExp will match any character `/hu./`.

The use of square brackets let us match any letter inside them as one option for a position or slot in the pattern.

`/b[aeiou]g/` will match _"bag"_, _"beg"_, _"big"_, _"bog"_, _"bug"_.
