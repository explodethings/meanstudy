// With great responsibility, comes great gaps in knowledge.
/////////// NUMBERS ////////////
console.log(Math.sin(3.5))
let circum = (2 * Math.PI * 5)
console.log(circum)

// Always converts to integer, base 10 values.
// You must tell the func what base the number is in (or supply 0x for hex numbers)
console.log(parseInt('0x56A'))

// + is an operator that represents parseInt's 1 arg overload.
console.log(+ '0x16')

// outputs NaN - especially when used in arithmetic
let nan = parseInt('xd') + 5 * 2 - 5
console.log(isNaN(nan))

// Infinity and -Infinity is also defined.
console.log("1 / 0 = " + (1 / 0))
console.log("-1 / 0 = " + (-1 / 0))
console.log(isFinite(nan)) // or any Inf/-Inf value

/////////// STRINGS ////////////
// Strings are UTF-16, and not UTF-8
// Strings can be NATIVELY used as objects.
let str = 'meme'
console.log(str.charAt(2)) // returns char at 0 to length range
console.log(str.replace('mem', 'thinkvantag')) // thinkvantage
console.log('meme'.toUpperCase()) // MEME (replace returns the string from its scope)

/////////// OTHER TYPES ////////////
let nullval = null
let undefval = undefined

// Important : Some javascript conversions are considered 'true' or 'false',
//             in order to ensure dynamic equality checking. for example x='';if(x) is false.
//             These 'weird conversions' are built-in to the language.
//             The values: false, 0, empty strings (""), NaN, null, and undefined all become false.
console.log("nullval is equal to undefval : " + (nullval == undefval)) // true, js converts both to 'false'
console.log("nullval is type equal to undefval : " + (nullval === undefval)) // false, no type conversion is performed

// Use Boolean to explicity check for it (readability? i guess)
console.log("nullvall is explicitly : " + Boolean(nullval)) // false

// Logical or, and and not are !Supported ... !

/////////// VARIABLES ////////////
// 'let' is a variable that is available inside the scope it is defined in.
for (let index = 0; index < 2; index++) {
    console.log("index : " + index)
}
try { console.log("index : " + index) } // will trigger an exception
catch { console.log("index is a let variable, as such, unavailable from outside the loop.") }
// turns out if you reuse the same name for loops and use 'var' instead of let,
// the variable will be 'undefined' rather than caught in the exception, thus printed.
// it is important to ensure you use let for all loops.

// 'const' is the same as 'let', only immutable and scope-bound.
const xd = 5
try { xd = 6 }
catch { console.log("const variables are immutable!")}

// 'var' has its scope restrictions redefined. the 'scope' is the function.
// if you define 'var' inside a loop, it will be accessible outside of it.
// an important distinction to make is that 'var' is NOT A GLOBAL VARIABLE! it is between.
//
// undefined 'var' variables are 'undefined' automatically.
for (var index = 0; index < 2; index++) {
    console.log("index : " + index)
}
try { console.log("index : " + index) } // will trigger an exception
catch { console.log("index is a var variable, as such, available from outside the loop.") }

/////////// OPERATORS ////////////
// Numeric: +, -, *, /, %, ** (exponent)
// note: % is the REMAINDER operator. it is different from modulo.
//       modulo always returns the POSITIVE difference, but remainder can return NEGATIVES.
console.log("Remainder of -2 from 5 = " + (-2 % 5) + ", Versus Modulo of -2 from 5 = " + (-2 - (-1 * 5)))

// regarding string concatenation : once you start from a string,
// everything added with +, unless enclosed in parantheses, will be converted to a string.
console.log(3 + 4 + "5") // 75
console.log("5" + 3 + 4) // 534
console.log("5" + (3 + 4)) // 57

// contrary to what is said earlier, there is a ! logical operator - but only with != and !==
// note: != is !(==) and !== is !(===), basically.
// there are also bitwise operations.

/////////// CONTROL STRUCTURES ////////////
// if and else
var meme = "wow"
if (meme === "haha") {
    meme += " hehe"
} else if (meme === "xd") {
    console.log("you have been gnomed!")
} else {
    meme += " lel"
}
console.log(meme)

/// For loops
// foreach - is a loop available only for the Array object. foreach cannot be continued or broken.
//           what is special about it is that you can provide your own callback.
//
//           when foreach runs over an array, it is immutable for the foreach itself. you may
//           add/remove objects from the array, but the iterable keys won't change for the current loop.
//           of course, the values may change since the keys are iterated over rather than the values..
//
//           the only way to stop or break that loop is to throw an exception. if you need to stop the loop,
//           you might as well not use foreach. use a simple loop, for..of, or an one from an assortment
//           of many built-in array methods in the prototype.
//
//           IMPORTANT : forEach returns 'undefined' the below example will crash if we dont add a semi-colon
//           put the undefined value to a variable, because it will then attempt to iterate another foreach
//           over "undefined['hehe']" which of course will crash since undefined cannot have properties!
let arr = ['hehe', 'hoho', 'eheh']
arr.forEach(function (currentValue, index, array) {
    console.log(currentValue.toUpperCase())
});
['hehe'].forEach(function (currentValue, index, array) {
    console.log(currentValue.toUpperCase())
});

// for..in - is a loop that iterates over properties of an object that have [[Enumerable]] set to true.
//
//           this, by the way, includes non-symbol properties by default.
//
//           this can be troublesome if you create objects that have custom functions in their prototypes.
//           the functions will be enumerable and the for..in will iterate over the function definition
//           unless caught or cancelled out.
//
//           usually, 'primitive' collections in javascript have already non-enumarable methods built in
//           to them so you won't run into this.
//
//           more importantly, the iterable properties are iterated as KEYS, and not as values.
//           this means the object may change between two async loops accessing the same key in the collection.

// here we add a new function to the array prototype via property xdmeme
Array.prototype.xdmeme = function (){
    enumerable: false,
    console.log("LOL HAHA")
}
// here we define a new function under property xdmeme2 using Object.defineProperty.
// this is slightly advanced stuff, but its only for demonstration.
Object.defineProperty(Array.prototype, 'xdmeme2', {
    enumerable: false, configurable: true,
    get: function (){
        return ":))))"
    },
    set: function (x){
        console.log("value is " + x)
    }
})
let newArr = ['xd', 'mim', 'hehe:)']

// This will print the function name and code of xdmeme, not of xdmeme2
for (element in newArr){
    console.log("newArr element in " + element + " index is " + newArr[element])
}
// here is how we use xdmeme2 .. again, advanced stuff. irrelevant. learned this as i went.
console.log(newArr.xdmeme2)
newArr.xdmeme2 = 5

// for..of - is a loop that iterates over the values of any object, rather than its keys.
//           this type of loop is new and requires the property implements Symbol.iterator, to be caught by ES6.
//           
//           unlike the previous loops: you can continue/break the loops at your leisure.
//           the most popular usage of for..of is with more complex objects such as Map or Set.
//           while this can also iterate over an Array, the index order may be disordered. as such,
//           it is most recommended to use other for loops, or whiles.
let newSet = new Set(['this', 'is', 'not a set'])
for (element of newSet) {
    console.log(element)
}

// remember that we said logical and, or and not are not available?
// well, that's half true. they are available to use as initialization, as a binary operator.
let value = undefined
// this will make name === "meme", since value is 'falsy'.
name = value || (value = "meme")
console.log("name is : " + name)
// this will make name === "this" since value is no longer undefined.
name = value && newArr[0]
console.log("name is : " + name)

// ^^^^^^ basically, it evaluates the left hand side to a boolean, and if it's true,
//        it evaluates the expression on the right hand side and initializes the variable
//        with the received value, no matter what's done with it.

// of course, javascript also has a ternary operator ..
console.log((value === "meme") ? 'yes' : 'no') // is this a meme?

// i know what is switch case already. it is the exact same like in powershell but
// without the ability to name your switches. which kinda sucks tbh

///////////// OBJECTS /////////////
// you can create objects with either:
let object1 = new Object()
let object2 = {} // preferred method

// why is it preferred? javascript supports weird voodoo type shit with this notation.
// you know. JSON voodoo type shit. as in, it is incredibly easy to transition between JSON and JS notation.
let object3 = {
    name: 'memelord',
    occupation: 'xd',
    memecollection: {
        pepega: 'pepega.png',
        wutface: 'goldenboy.jpg'
    },
    yearofbirth: '01-01-1970'
}
// you can access the exquisite memes with either brackets or '.' notation
console.log("pepega location = " + object3.memecollection.pepega)
console.log("wutface location = " + object3['memecollection']['wutface'])

// you can define a prototype function (a "ctor") via which we will init an object.
function Meme(name, location){
    this.Name = name
    this.Location = location
}
// here we witness the birth of a new meme, Kappa (Kappa)
let meme1 = new Meme('Kappa', 'Kapp.mp6exe')
// you can access the name of the meme or its juicy file location via the same methods ascribed above.

/// it should be noted that the bracket notation is preferred if you have properties that take
/// the names of reserved words, such as for, while, etc. for example meme['for'] is fine but meme.for isn't
/// (though it seems, from es5, there is no need to 'clothe' the reserved words when DEFINING.)

//////////// ARRAYS ////////////
// arrays, unlike the way taught in computer science, are highly mutable objects.
// by that i mean, it is much easier to expand on them without allocating memory, like in c or cpp.
// for example:
let arr2 = [];
arr2[0] = 2
arr2[2] = 3
console.log(arr2.length) // will print 3.

// another example: 
let arr3 = ['high', 'impact', 'memes']
arr3[1000] = 'supermemes'
console.log(arr3.length) // will print 1001. wtf javascript?
console.log(arr3[999]) // will print undefined.

/////////// FUNCTIONS ///////////
// functions work similar to other programming languages. 0 to n arguments, return values, the works.
// if you forget to pass a parameter to a function, the next parameters will be undefined.
// if you pass more than the required parameters for the overload, those extra values will be ignored.
//
// since there is no concept of 'types' for 
function add(x, y) {
    var total = x + y;
    return total;
}

add() // will return NaN
add(4, 5, 6, 7) // will return 9

// you may access the arguments of the function, similar to c#, with the Array 'arguments'.
function sub(x, y) {
    var total = arguments[0] - arguments[1];
    return total;
}

// we run into a problem once we want to write an averaging function. how many overloads do we need to create?
// thankfully, there is a solution to this. you can use the following notation:
function avg(...args){
    var total = 0;
    for (value of args) {
        total += value
    }
    return total / args.length // safe to use length since js is creating the array responsibly .. 
}
console.log(avg(3,4,5,4,2,3)) // returns 3.5

// of course, this does not allow us to work with arrays.
// the only variable in args will be the array, and we didnt account for an accidental matrix.
function avgArr(arr){
    var total = 0;
    var count = 0
    arr.forEach(function (currentValue) {
        total += currentValue
        count++ // length does not represent the actual length of an array here.
                // it would be foolish to trust the length of the array like this, since the dev is building it.
    })
    return total / count
}
console.log(avgArr([2,3,4,5,6,2])) // returns 3.666 repeating

/// we can treat functions as objects! let us demonstrate with a function called 'apply'.
/// we will start by defining an object that contains our avg function. we have removed the name of the func.
let avgMachine = {
    average: function (...args){
        var total = 0;
        for (value of args) {
            total += value
        }
        return total / args.length // safe to use length since js is creating the array responsibly .. 
    } 
}
let input = [2,3,23,23,34,324,324,23,6]
console.log(avgMachine.average.apply(input)) // will output NaN

// wait .. this didn't work. what happened?
// what happened was that we used the avg function, not avgArr. this was on purpose.
// the first argument, you see, is used when we are using a function that utilizes 'this'. this will be
// explained later on .. this is too advanced already and i need to finish before going home

/// like we did earlier, we have defined a function without a name. that is an anonymous function.
/// this allows us to create neat tricks.
var meme = "lord"
(function() { meme += " sandwich has returned" })();
console.log(meme)

// what just happened? we exploited the fact that meme exists inside the anonymous function as well,
// and we created a function that existed for a moment and used thereafter, to alter the text of 'meme'.

// recursions are also allowed in javascript. but how do you recursively call anonymous functions?
// the answer is simple. JS allows you to name them. pretty straightforward. what is also allows you to do:
// YOU CAN NAME ALL RECURSIVE ANONYMOUS FUNCTIONS WITH THE SAME NAME. as in, the name is only available to its own scope.
// TODO: FIX THIS BLOODY RECURSION
var recursiveAdd = function recAdd(...args) {
    if (args[args.length - 1] === undefined) return
    var total = 0 // important for this to be VAR.
    total += (args[args.length - 1] + recAdd.apply(null, args.pop())) // we cannot pass an array to ...args, must use apply
    return total
}