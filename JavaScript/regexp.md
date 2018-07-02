# Regular Expressions

## Introduction

Regular Expressions are used to match string patterns.

They have proved being really useful, mostly when I'm going throught competitive algorithm challenges, but I always end up forgetting them.

---

## Basics

### [/pattern/].test([String])

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

### Match characters inside a RegExp with `.`,`[]` and `-`

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
str.test(pattern); // True
```

### Match ending string patterns with a dollar sign $

Opposite to the caret, we can use the dollar sign in a similar way to match the end of a string.

```javascript
const str = "Viva la vida loca";
const pattern = /
```

### Match all letters and numbers

There's a character class that can match all letters of the alphabet and numbers: `\w` being equivalent to `[A-Za-z0-9]`. But including the underscore `_` too.

```javascript
let longHand = /[A-Za-z0-9_]+/;
let shortHand = /\w+/;
```

### Match everything but letters and numbers -> `\w` or `\W`

If we want to find the opposite of alphanumerics, we use `\W` (note the capital W is used as the opposite).

So, `\W` is the same as `[^A-Za-z0-9_]`.

### Match all numbers -> `\d`

The shortcut to look for digit characters is `\d`, being eqaul to `[0-9].`

### Match all non-numbers -> `\D`

The shortcut this time, is obviously `\D`, being equivalent to `[^0-9]`.

### Match whitespace -> `\s`

We can search for whitespace using `\s`. Matching also return, tab, form feed, and new line characters.

### Match non-whitespace characters -> `\S`

We use the the shortcut `\S`.

### Specify Upper and Lower number of matches

We know we can use the plus sign `+` to look for one or more characters.  
And the asterisk `*` to look for zero or more characters.

But when we want to specify the quantity we will use curly brackets `{` and `}`. defining the minimum and maximum times we want it to appear in the pattern.

For example, to match only the letter `a` appearing between 3 and 5 times in the string **"ah"**, the regex will look like `/a{3,5}h/` .

### Specify only the Lower number of matches

If we want to specify just the lower number of matches, we will just omit the the second parameter like `/ha{3,}h/`, that will match the string "hah" with the letter **a** appearing at least 3 times.

### Specify the exact number of matches

We can specify the number of matches we want if we just put one number inside the curly brackets, like `/ha{3}h/`.

### Check for all or none

We can check the possible existence of an element with a question mark `?`. This checks for azero or one of the preceding element, or being said element _optional_.

```javascript
const american = "color";
const british = "colour";
const pattern = /colou?r/;
pattern.test(american); // true
pattern.test(british); // true
```

### Positive and negative lookahead

**Lookaheads** are patterns that tell JavaScript to look ahead in your string to check for patterns further along. This can be useful when you want to search for multiple patterns over the same string.

There's two types:

* **Positive:** It will look to make sure the element in the search pattern is there, but won't actually match it. It's used as `(?=...)` where the `...` is the required part that is not matched.
* **Negative:** It will look to make sure the element in the search pattern is not there. A negative lookahead is used as `(?!...)` where `...` is the pattern that you do not want to be there. The rest of the pattern is returned if the negative part is not present.

```javascript
// Positive lookahead
let quit = "qu";
let quRegex = /q(?=u)/;
quit.match(quRegex); // returns ["q"]

//Negative lookahead
let noquit = "qt";
let qRegex = /q(?!u)/;
noquit.match(qRegex); // returns ["q"]
```

A more practical use of the **lookaheads** is to check two or more patterns in one string.

```javascript
// This will look for between 3 and 6 characters and at least one number
let password = "abc123";
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // returns true
```

### Reuse patterns using capture groups

There's going to be patterns that occur multiple times in a string. Instead of manually repeat a regex, we can search for repeat substrings using **capture groups**.

Parentheses `(` and `)` are used to find repeat substrings, putting the regex of the pattern that is going to repeat in between those.

To specify where that repeat string will appear, we will use backslash `\` and a `number`. This number strats at 1 and increases with each additional capture group you use.

```javascript
// Match any word that occurs twice separated by a space
let repeatStr = "regex regex";
let repeatRegex = /(\w+)\s\1/;
repeatRegex.test(repeatStr); // returns true
repeatStr.match(repeatRegex); // returns ["regex regex", "regex"]
```

Using **.match()** will return an array with the string it matches, along with its capture group.

### Search and replace

We can use `[String].replace([param1], [param2])` to look for a pattern and replace it.
**Param1** is the regex you want to search for, and **param2** the string to replace or a function.

You can also access capture groups in the replacement string with dollar signs `$`, like:

```javascript
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1'); // returns "Camp Code"
```