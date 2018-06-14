# Regular Expressions

## Introduction

Regular Expressions are used to match string patterns.

They have proved being really useful, mostly when I'm going throught competitive algorithm challenges, but I always end up forgetting them.

---

## Basics

### /pattern/

In JavaScript, we use the `/pattern/` syntax. And we can use the **.test()** method, that returns true or false, to check for those patterns inside a string.

```javascript
const str = "Hello World";
const regex = /Hello/;
regex.test(str); // True
```

We can also use the **|** or **OR** operator to search for multiple patterns. We can even concatenate it like `/Human|Cat|Dog/`.

### Flag "i"

To ignore the difference between uppercase and lowercase letters, we can use the flag `i`, as`/RegExp/i`.

### Method [String].match(/pattern/)

To extract matches from the RegExp, will use `.match()` on a String passing the RegExp as a parameter.

```javascript
const str = "Abstract Chill";
str.match(/chill/i);
// Returns ["Chill"]
```

### Flag "g"

To make that search/extraction of a pattern be more than once or the first coincidence, we will add the `g` flag, like `/RegExp/g`

### Match characters inside a RegExp with . [] -

* A period inside the RegExp will match any character `/hu./`.

* The use of square brackets `[]` let us match any letter inside them as one option for a position or slot in the pattern.

```javascript
const pattern = /b[aeiou]g/;
// Will match "bag", "beg", "big", "bog", "bug"
```

* Using the _hyphen_ "-": It's used to define a range of characters to match -looking like `[a-e]` or `[0-5]`.

### Negated characters with a caret ^ inside a character set

When we want to match characters that are NOT the ones specifies, we will use the caret [^] symbol.

```javascript
const patterm = /[^aeiou]/;
// Will match all characters that are not vowels
```

### Match characters that occur one or more times +

In this case, we will use the [+] symbol for matching characters that appear one or more times.
If the occurence happens together, it will count as one match.

```javascript
const pattern = /a+/g;
const str1 = "abc";
str1.match(pattern); // Returns ["a"]
const str2 = "aabc";
str2.match(pattern); // Returns ["aa"]
// Where both returns are a single match
```

```javascript
const pattern = /a+/g;
const str1 = "abab";
str1.match(pattern); // Returns ["a", "a"] (two matches)
```

### Match characters that occur zero or more times

Same as the previous one, but with with 0 or more matches. We will use an asterisk [*] symbol.

```javascript
const pattern = /go*/;
const soccerWord = "gooooooooal!";
const gPhrase = "gut feeling";
const oPhrase = "over the moon";
soccerWord.match(goRegex); // Returns ["goooooooo"]
gPhrase.match(goRegex); // Returns ["g"]
oPhrase.match(goRegex); //
```

### Greedy and lazy match

Greedy match finds the longest possible bit of a string that fits the pattern and returns that.
Lazy match, on the other hand, finds the smallest possible part of the string.

RegEx are _greedy_ by default, but if we wanted to do a _lazy_ matching, we will use the interrogation [?] mark.

```javascript
const pattern1 = /t[a-z]*i/;
const pattern2 = /t[a-z]*?i/;
const str = "titanic";
str.match(pattern1); // Returns ["titani"]
str.match(pattern2); // Returns ["ti"]
```

### Match beginning string patterns with a caret ^

If we put the caret symbol outside a character set (outside the square brackets []), we will search for patterns at the beginning of a string.

```javascript
const str = "Ricky Martin";
const pattern = /^Ricky/
str.match(pattern); // True
```