# MongoDB

- Lift a docker with mongo

```zsh
docker run  - d
            - p 27017:27017
            - v ~/Desktop/mongo- data:/data/db
            mongo
```

- Check port 27017 (mongo default)

```zsh
netstat ao | grep 27017
```

- Create a database or use it

```zsh
use db_name
```

- View databases

```zsh
show databases
```

- Create collection

```zsh
db.createCollection('movies')
```

- Insert

```zsh
db.movies.insert({ "name": "matrix" })
```

- Find

```zsh
db.movies.find({name: 'matrix'})
```

- Find all

```zsh
db.movies.find({})
```

- Shot it prettier

```zsh
db.movies.find({name: 'Matrix'}).pretty()
```

- Update

```zsh
db.movies.update({name: 'The Matrix'}, {name: 'NuevoMatrix'})
```

- Add or update a field (set)

```zsh
db.movies.update({name: 'pepito'}, {$set: {like: true}})
```

- Remove

```zsh
db.movies.remove({name: 'Matrix'})
```

- Count

```javascript
const movies = await movie
    .count();
```

## New Methods

- .insertOne()
- .insertMany()
- .deleteOne()
- .deleteMany()

## Other Methods

```javascript
/*
queryParams for pagination:
    /api/courses?pageNumber=2&pageSize=10
*/

const courses = await Course
    .limit(number) // Limits results
    .skip((pageNumber - 1) * pageSize) // Implements pagination
```

## Operators

### Comparison Operators

- **`eq`:** (equal)
- **`ne`:** (not equal)
- **`gt`:** (greater than)
- **`gte`:** (greater than or equal to)
- **`lt`:** (less than)
- **`lte`:** (less than or equal to)
- **`in`:**
- **`nin`:** (not in)

```javascript
// examples
const courses = await Course
    .find({ price: { $gte: 10, $lte: 20 } })
    .find({ price: { $in: [10, 15, 20] } });
```

### Logical Operators

- **`and`**
- **`or`**

```javascript
    .find({ price: { $gte: 10, $lte: 20 } })
    .or([ {author: 'Ose'}, { active: true } ])
    .and([ ]);
```

## Regular Expressions

```javascript
    .find({ name: /pattern/ });
```
