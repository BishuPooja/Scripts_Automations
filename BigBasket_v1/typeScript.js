function greeter(person) {
    return "Hello, " + person;
}
var user = 'JavaTpoint';
console.log(greeter(user));
var firstName = "Pooja";
console.log(firstName);
var some = true;
some = "name";
console.log(some);
// define our tuple
var ourTuple;
// initialize incorrectly throws an error
ourTuple = [6, false, 'Coding God was mistaken'];
ourTuple.push("some new");
ourTuple.push(12.33);
console.log(ourTuple);
var car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
car.type = "new car";
console.log(car);
var myName;
(function (myName) {
    myName[myName["firstNo"] = 98] = "firstNo";
    myName[myName["secondNo"] = 78] = "secondNo";
})(myName || (myName = {}));
console.log(myName.firstNo);
function getTime() {
    return new Date().getTime();
}
console.log(getTime());
function getName(V) {
    return "your name is" + V;
}
console.log(getName("Pooja"));
//   optional parameters
function getOptinalParameter(a, b, c) {
    return a + b + (c || 0);
}
console.log(getOptinalParameter(11, 33));
//   default parameters
function pow(value, exponent) {
    if (exponent === void 0) { exponent = 10; }
    return Math.pow(value, exponent);
}
console.log(pow(1));
//   named parameters
function divide(_a) {
    var dividend = _a.dividend, divisor = _a.divisor;
    return dividend / divisor;
}
var answer = divide({ dividend: 120, divisor: 4 });
console.log(answer);
// rest parameters
function add(a, b) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return a + b + rest.reduce(function (l, m) { return l + m; }, 0);
}
console.log(add(1, 2, 3, 4, 5, 6, 7, 8, 9));
var a = "school";
console.log(a.length);
// classes
var person = /** @class */ (function () {
    function person() {
    }
    return person;
}());
var details = new person();
details.name = "Class";
console.log(details.name);
var carDetails = /** @class */ (function () {
    function carDetails() {
    }
    return carDetails;
}());
var getCarDetails = new carDetails();
getCarDetails.name = "toyota";
console.log(getCarDetails.name);
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var callclass = new Person("Jane");
console.log(callclass.getName()); // person.name isn't accessible from outside the class since it's private
var fruits = /** @class */ (function () {
    function fruits(fruitName) {
        this.fruitName = fruitName;
    }
    fruits.prototype.getFruits = function () {
        return this.fruitName;
    };
    return fruits;
}());
var getfruit = new fruits("apple");
console.log(getfruit);
