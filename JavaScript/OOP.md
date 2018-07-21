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

## Mixins

Behaviour is shared through inheritance, but it doesn't go well with unrelated objects, where it's better to use `mixins`. **Mixins** allows other objects to use a collection of functions.

```javascript
let flyMixin = function(obj) {
    obj.fly = function() {
        console.log("Flying, woosh!");
    }
};
```

It takes an object as an argument and gives said object a method, in this case, `fly()`.

## Private properties

Since JavaScript is not a typed language, properties defined in an object are public.

The way we can protect properties, making thek private is using closures, wrapping the property in a constructor function.

```javascript
function Bird() {
    let hatchedEgg = 10; // private property
    // publicly available method that a bird can use
    this.getHatchedEggCount = function() {
        return hatchedEgg;
    };
}
let duck = new Bird();
duck.getHatchedEggCount(); // returns 10
```

**Closure:** When a function has access to the context in which it was declared.

## Using IIFE to create modules

```javascript
let motionModule = (function () {
  return {
    glideMixin: function (obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
}) (); // The two parentheses cause the function to be immediately invoked
```

In this way, we can call the motionModule object, that contains the defined mixins as methods.