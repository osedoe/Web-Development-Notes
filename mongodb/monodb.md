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

- Insertar

```zsh
db.movies.insert({ "name": "matrix" })
```

- Ver

```zsh
db.movies.find({name: 'matrix'})
```

- Ver todo

```zsh
db.movies.find({})
```

- Show document pretty

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

## New Mehtods

- .insertOne()
- .insertMany()
- .deleteOne()
- .deleteMany()
