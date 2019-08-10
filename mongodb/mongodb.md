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
...
    .find({ price: { $gte: 10, $lte: 20 } })
    .or([ {author: 'Ose'}, { active: true } ])
    .and([ ]);
```

```javascript
...
    .find({
        $or: [
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ]
    })
```

## Regular Expressions

```javascript
...
    .find({ name: /pattern/ });
```

## Steps to connect to mongoose (with TS)

- **Step 1:** Connect to db

```typescript
import * as Mongoose from 'mongoose';

// Connect to the database
Mongoose
    .connect('mongodb://localhost/<database-name>', { useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error: ', err));
```

- **Step 2:** Define Schema

From the docs:  
>_Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection._

```typescript
const schemaName = new Mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});
```

- **Step 3:** Define interface (needed for TS)

```typescript
import { Document } from "mongoose"; // Document must be imported from mongoose

export interface InterfaceOfSchema extends Document {
    name: string;
    author: string;
    tags: string[];
    date: Date;
```

- **Step 4:** Implement Schema and interface into the model

From the docs:
> _Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database._

```typescript
const whateverItIs = Mongoose.model<InterfaceOfSchema>('<CollectionName>', schemaName);
```

>The first argument is the singular name of the collection your model is for.  
>** Mongoose automatically looks for the plural, lowercased version of your model name.  
>** Thus, for the example above, the model Tank is for the tanks collection in the database.

Things go like:  
`database > collection > document`

Then, to add a document through the code:

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: 'The Matrix',
        author: ['Lilly Wachowski', 'Lana Wachowski']
        ...
    })
}
```

And to do queries:

```typescript
(async () => {
        return await Course
        // .find({ author: 'Ose', isPublished: true })
        // .find({ price: { $gte: 10, $lte: 20 } })
        .find({ price: { $in: [10, 15, 20] } })
        .limit(10)
        .sort({ name: 1 }) // 1 is ascending, -1 is descending
        // also: .sort('name') for ascending and .sort('-name') for descending
        .select({ name: 1, tags: 1 }); // get only the names and tags
        // also: .select('name tags')
})();
```
