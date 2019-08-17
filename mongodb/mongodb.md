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

## Updat documents

Two approachs:

- **Query first:** Find the document, modify it and then save it.
- **Update first:** Go to the db and update directly

### Query first

We need to wrap everything in a promise as usual.

1. First we find the document we want to update with `.findById`.
2. We return the function if it doesn't find it.
3. We set the values to update through object notation or by the method set.

```typescript
const update = async (id) => {
    const movie = await Movie.findById(id);
    if (!movie) {
        return;
    }
    // Option 1
    movie.name = 'The Matrix 2';
    movie.year = 0;
    // Option2
    movie.set({
        name: 'Whatever',
        year = 1
    });

    const result = await movie.save();
    console.log(result);
};
```

## Update first

- We will use the update method
- The first argument is the query or filter object, like `{_id: id}` or `{ isPublished = false}`.
- The second is the update object where we are going to use one or more [MongoDB Update Operators](https://docs.mongodb.com/manual/reference/operator/update/)

Bear in mind that storing everything that udpate does in a variable won't retrieve just a document but the result ob the operation.

Also, we don't need to call _save_ anymore.

```typescript
const update = async (id) => {
    const result = await Movie.update({ _id: id}, {
        $set: {
            name: 'Ose',
        }
    });
    console.log(result);
};
```

> **Note:** `collection.update` is deprecated. Have a look at the documentation for:

- [collection.updateOne](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/index.html)
- [collection.updateMany](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/)
- [collection.bulkWrite](https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/)

If we want to retrieve the document that was updates, we will use `findByIdAndUpdate`.

```typescript
const update = async (id) => {
    const movie = await Movie.findByIdAndUpdate(id, {
        $set: {
            name: 'Ose',
        }
    });
    console.log(movie); // returns the object before the changes
};
```

Bear in mind that if we want to return the object after is has changed we need to pass a third parameter.

```typescript
const update = async (id) => {
    const movie = await Movie.findByIdAndUpdate(id, {
        $set: {
            name: 'Ose',
        }
    }, { new: true});
    console.log(movie); // returns the object before the changes
};
```

## Remove a document

- The first argument of `deleteOne` is the filter object.

```typescript
const removeMovie = async id => {
    const result = await Movie.deleteOne({_id: id});
    console.log(result);
};

updateCourse('5d4ecae9eb28d3374bf8443d');
```

Similar to that, we can use `deleteMany`, or `findByIdAndRemove`

> **Note:** If a method can not find the given id, it will return _null_.

## Validators

So far when we defined the schema above, all those parameters were optional.

If we wanted to make a field required we will do as follows:

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: { type: String, required: true},
    });

    try {
        const result = await movie.save();
        console.log(result);
    } catch(err) {
        console.log(err);
    }
};
```

It's important the we wrap the save method on a try/catch in case there's a error with the validation, we can display it.

Other way of doing it, it's to call the `validate()` method that returns a _Promise_ with void.

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: { type: String, required: true},
    });

    try {
        await.movie.validate(); // will be the same as the previous code block
    } catch(err) {
        console.log(err);
    }
};
```

### Built-in validators in Mongoose

[Built-in validators link](https://mongoosejs.com/docs/validation.html#built-in-validators)

If, for example, we wanted to make a field conditionally required, instead of passing `required: true` we can pass a function.

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: String,
        isPublished: boolean,
        price: {
            type: Number,
            required: function() {
                return this.isPublished
            }
        }
    }),
}
```

We have also other validators, like:

- **minlength**: `minlength: 5`,
- **maxlength**: `maxlength: 255`,
- **match**: `match: /regEx/`,
- **enum**: `enum: ['action', 'comedy']`
- **min** and **max**: for Number types and dates

### Custom validators

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: String,
        categories: {
            type: Array,
            validate: {
                validator: function(value) {
                    return value && value.length > 0;
                },
                message: 'A movie should have at least one category'
            }
        }
    }),
}
```

## Async validator

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: String,
        categories: {
            type: Array,
            validate: {
                isAsync: true,
                validator: function(value, callback) {
                    // async work
                    setTimeout(() => {
                        const result = value && value.length > 0;
                        callback(result);
                    }, 2000);
                },
                message: 'A movie should have at least one category'
            }
        }
    }),
}
```

## SchemaType Options

When we are defining a Schema and turn the type from just a primitive to an object to pass ir more options, we are definint a SchemaType object.

_For strings:_

- **lowercase**: It will turn the field value passed to lowecase. // `lowercase: true`
- **uppercase**: Turn the value to uppercase. // `uppercase: true`
- **trim**: Remove the whitespace. // `trim: true`

_For any:_

- **custom getter and setter**:

```typescript
const createMovie = async () => {
    const movie = new Movie({
        name: String,
        isPublished: boolean,
        price: {
            type: Number,
            required: function() {
                return this.isPublished
            },
            get: value => Math.round(value),
            set: value => Math.round(value)
        }
    }),
}
```
