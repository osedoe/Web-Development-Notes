class Coordinate {
    // Constructor method, with x and y declared
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this._xy = [x, y];
    }

    // Setters
    set x(valueX) {
        this._x = valueX;
    }

    set y(valueY) {
        this._y = valueY;
    }

    // Getters
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Custom methods
    // Sum coordinates
    sum(secondCoord) {
        return [this._x + secondCoord.x, this._y + secondCoord.y];
    }

    // Modulus 
    modulus() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this.y, 2));
    }
}

let coord1 = new Coordinate(2, 3);
let coord2 = new Coordinate(5, 4);

console.log(coord1);
console.log(coord2);

let suma1 = coord1.sum(coord2);
console.log(suma1);

let mod1 = coord1.modulus();
console.log(mod1);