---
title: "Regular Expressions in JavaScript"   
spoiler: "RegExp Cheatsheet"  
tags: ["javascript", "regexp"]
slug: "regexp-js"
contentType: "notes"
published: true
---

# Regular Expressions

## Introduction

Regular Expressions are used to match string patterns.

They have proved being really useful to me, mostly when I'm going through competitive algorithm challenges, but I always
end up forgetting them. So I made a quick reference for it.

---

## Basics

### `[/pattern/flags].test([string])`

In JavaScript, we use the `/pattern/` syntax. We can use the **.test()** method, that returns `true` or `false`, to
check for those patterns inside a string.

```javascript
const str = 'Hello World';
const regex = /Hello/;
regex.test(str); // true
```

We use the `|` or `OR` operators to search for multiple patterns. We can even concatenate them like `/Human|Cat|Dog/`.

### `i` flag: Ignore case

To ignore the difference between uppercase and lowercase letters, we can use the flag `i`, as`/RegExp/i`.

### Method `[string].match(/pattern/)`

To **extract matches from the RegExp**, will use `.match()` on a string passing the RegExp as a parameter.

```javascript
const str = 'Abstract Chill';
str.match(/chill/i);
// Returns ['Chill']
```

### `g` flag: Find multiple matches

To search or extract a pattern more than just the first occurrence, we will add the `g` flag, like `/RegExp/g`

### Match characters inside a RegExp with `.`,`[]` and `-`

- `.` A period inside the RegExp will match any character `/hu./`.

- `[123]` The use of square brackets let us match any letter inside them as one option for a position or slot in the
  pattern.

- `-` The _hyphen_ is used to define a range of characters to match, like `[a-e]` or `[0-5]`.

```javascript
const pattern1 = /b[aeiou]g/;
// Will match 'bag', 'beg', 'big', 'bog', 'bug'
const pattern1 = /copy[1-9]/;
// Will match 'copy1', 'copy2', ..., 'copy9'

```

### `[^...]` Negate characters (invert rule)

When we want to match characters that are NOT the ones specified in the pattern, we will use the caret symbol inside
brackets followed by the group of characters.

```javascript
const patterm = /[^aeiou]/;
// Will match all characters that are NOT vowels
```

### `+` Matches a character that occurs _one or more times_

In this case, we will use the [+] sign to match characters that appear one or more times. If the occurrence happens
together, it will count as one match.

```javascript
const pattern = /a+/g;
const str1 = 'abc';
str1.match(pattern); // Returns ['a']
const str2 = 'aabc';
str2.match(pattern); // Returns ['aa']
// Where both returns are a single match
```

```javascript
const pattern = /a+/g;
const str1 = 'abab';
str1.match(pattern); // Returns ['a', 'a'] (two matches)
```

### `*` Match characters that occur _zero or more times_ with an asterisk

Same as the previous one, but with 0 or more matches.

```javascript
const pattern = /go*/;
const soccerWord = 'gooooooooal!';
const sentence1 = 'gut feeling';
const sentence2 = 'over the moon';
soccerWord.match(pattern); // ['goooooooo']
sentence1.match(pattern); // ['g']
sentence2.match(pattern); //
```

### Greedy and Lazy matching

- **Greedy** match: Finds _the longest possible_ bit of a string that fits the pattern and returns that.
- `?` **Lazy** match: Finds _the smallest possible_ part of the string.

RegEx are _greedy_ by default.  
If we wanted to do a _lazy_ matching, we will use the interrogation [?] mark.

```javascript
const testString = 'titanic';

const greedyPattern = /t[a-z]*i/;
testString.match(greedyPattern); // ['titani']

const lazyPattern = /t[a-z]*?i/;
testString.match(lazyPattern); // ['ti']
```

### `^...` Match beginning string patterns

If we put the caret symbol outside a character set (outside the square brackets []), we will **search for patterns at
the beginning of a string**.

```javascript
const testString = 'Ricky Martin';
const firstName = /^Ricky/; // As 'it begins with Ricky'
testString.test(firstName); // true
```

### `...$` Match ending string patterns with a dollar sign $

Opposite to the caret, we can use the dollar sign similarly to match the end of a string.

```javascript
const testString = 'Viva la vida loca';
const endingInLoca = /loca$/; // As 'it finished with 'loca''
testString.test(endingInLoca) // true
```

### `\w` Match _all letters and numbers_

There's a character class that can match all letters of the alphabet and numbers: `\w` being equivalent to `[A-Za-z0-9]`
, plus the underscore `_`.

```javascript
const tediousWay = /[A-Za-z0-9_]+/;
const easierWay = /\w+/;
```

### Match _everything BUT letters and numbers_ (CAPITAL === NEGATIVE)

If we want to find the opposite of alphanumerics, we use `\W` (note the capital W is used as the opposite).

`\W` is the same as `[^A-Za-z0-9_]`.

### `\d` Match _all numbers_

The shortcut to look for DIGIT CHARACTERS is `\d`, being equal to `[0-9].`

### `\D` Match _all non-numbers_

The shortcut this time, is obviously `\D`, being equivalent to `[^0-9]`.

### `\s` Match _whitespace_

We can search for whitespace using `\s`. It will also match _return_, _tab_, _form feed_, and _new line_ characters.

### `\S` Match _non-whitespace characters_

It will match everything that is not whitespace.

### `{n,n}` Specify _upper and lower times that a match can occur_

We know we can use the plus sign `+` to look for _one or more characters_.  
We also know that the asterisk `*` is used to look for _zero or more characters_.

When we want to specify the quantity we will use curly brackets `{` and `}`. defining the minimum and maximum times we
want it to appear in the pattern.

For example, to match only the letter `a` appearing between 3 and 5 times in a string, the regex will look
like `/a{3,5}h/` .

### `{n,}` Specify _only the lower number_ of matches

If we want to specify just the lower number of matches, we will just omit the second parameter like `/ha{3,}h/`, that
will match the string with the letter **a** appearing at least 3 times.

### `{n}` Specify the _exact number_ of matches

We can specify the number of matches we want if we just put one number inside the curly brackets, like `/ha{3}h/`.

### `..?` Check for _zero or one_ (optional)

We can check the possible existence of an element with a question mark `?`. This checks for a zero or one of the
preceding element.

```javascript
const american = 'color';
const british = 'colour';
const pattern = /colou?r/;
pattern.test(american); // true
pattern.test(british); // true
```

### Positive and negative lookahead _(check two or more patterns in one string)_

**Lookaheads** are patterns that _look ahead_ in your string to check for patterns further along. This can be useful
when _you want to search for multiple patterns over the same string_.

There are two types:

- **Positive:** It will look to make sure the element in the search pattern is there, but won't actually match it. It's
  used as `(?=...)` where the `...` is the required part that is not matched.
- **Negative:** It will look to make sure the element in the search pattern is not there. A negative lookahead works
  as `(?!...)` where `...` is the pattern that you do not want to be there. The rest of the pattern is returned if the
  negative part is not present.

```javascript
// Positive lookahead
const quit = 'qu';
const quRegex = /q(?=u)/;
quit.match(quRegex); // ['q']

// Negative lookahead
const noquit = 'qt';
const qRegex = /q(?!u)/;
noquit.match(qRegex); // ['q']
```

A more practical use of the **lookaheads** is to check two or more patterns in one string, like `/(?=GROUP1)(?=GROUP2)/`

```javascript
// This will look for between 3 and 6 characters and at least one number
let password = 'abc123';
let checkPass = /(?=\w{3,6})(?=\D*\d)/;
checkPass.test(password); // returns true
```

### `(...)` _Reuse patterns_ using capture groups

There's going to be patterns that occur multiple times in a string. Instead of manually repeat a regex, we can search
for repeated substrings using **capture groups**.

Parentheses `(` and `)` are used to find repeated substrings, putting the regex of the pattern that is going to repeat
in between those.

To specify where that repeat string will appear, we will use backslash `\` and a `number`. This number starts at 1 and
increases with each additional capture group you use.

```javascript
// Match any word that occurs twice separated by a space
let repeatStr = 'regex regex';
let repeatRegex = /(\w+)\s\1/; // Here (\w+) is the first group,
                               // then we match whitespace with \s 
                               // and reuse the first group with \1
repeatRegex.test(repeatStr); // true
repeatStr.match(repeatRegex); // ['regex regex', 'regex']
```

As we can see in the last line above, using **.match()** will return an array with the _string it matches_, along with
its _capture group_.

### Search and replace

We can use `[string1].replace([pattern1], [string2])` to look for a pattern and replace it.
**pattern1** is the regex you want to search for, and **string2** the string to replace or a function.

You can also access capture groups in the replacement string with dollar signs `$n`, like:

```javascript
const cities = 'Bristol Liverpool';
const matchTwoWordsWithAWhiteSpace = /(\w+)\s(\w+)/;
const newStringWithWordsInverted = '$2 $1';
cities.replace(matchTwoWordsWithAWhiteSpace, newStringWithWordsInverted);
// 'Liverpool Bristol'
```
