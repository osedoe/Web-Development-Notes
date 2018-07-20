# Object Oriented Programming

There's a few things that we need to know about OOP in JavaScript.

## Constructor

They are functions that create new objects, same as every other OO language.
They define properties and behaviours that belong to the created object.

```javascript
function Dog() {
    this.name = "Susan";
    tnis.age = 5;
}
// Or...
function Dog(name, age) {
    this.name = name;
    this.age = age;
}
```

We can verify the constructor of an object with the keyword `instanceof`, as follows:

```javascript
let pitbull = new Dog("Suka", 5);

pitbull instaceof Dog
```

## Prototype

JavaScript is based on **prototypes**, being this an object shared or parent of other objects.

We define prototype properties or functions as follows:

```javascript
Dog.prototype.numberOfLegs = 4;
```

This will ensure that every Dog object created will have the property `numberOfLegs` set to 4.

## Object.create()

Another way to create or initialize an object is through the `Object.create()` keyword.

```javascript
let terrier = Object.create(Dog);
```

## Reset an iherited constructor property

When an object inherits its prototype from another object, it also inherits the supertype's constructor property.

```javascript
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor // function Animal(){...}
```

But duck and all instances of Bird should show that they were constructed by Bird and not Animal. To do so, you can manually set Bird's constructor property to the Bird object:

```javascript
Bird.prototype.constructor = Bird;
duck.constructor // function Bird(){...}
```

## Add methods after inheritance

When an object inherits its prototype from another object, it also inherits the supertype's constructor property.

```javascript
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor // function Animal(){...}
```

But duck and all instances of Bird should show that they were constructed by Bird and not Animal. To do so, you can manually set Bird's constructor property to the Bird object:

```javascript
Bird.prototype.constructor = Bird;
duck.constructor // function Bird(){...}
```