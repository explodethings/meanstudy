// With great power, comes great gaps of knowledge.
////////// HOISTING //////////
/// Hoisting is perceived as javascript's way to have variables and declarations,
/// 'hoisted' to the top of the code stack. What ACTUALLY happens is this:
/// declarations get appended to the start of the memory in compile time, and only declarations.
// example:
// this wont be able to print 'hehe' variable.
var meme = "xd";
console.log(meme + " " + hehe)
var hehe = "not xd"

// this will be able to print 'maymay' variable. the declaration of maymay is HOISTED UP.
maymay = ":))))"
console.log(meme + " " + maymay)
var maymay;

////////// CLOSURE //////////
/// here we will define what a closure is. but before that, we will define
/// whats called lexical scoping.
// example:
function init() {
    let name = 'EXPLOSIONS :)'
    function Detonate() {
        console.log(name)
    }
    return Detonate
}
// this here function has access to a variable outside its scope.
// this mechanic is called lexical scoping, where javascript keeps locations of variables
// scope-wise to determine if they are available for use.

/// now, closures are a combination of a function and its lexical scope - jammed into a variable.
/// earlier, we already defined the closure Detonate(), which is returned via init().
/// Detonate is STILL ABLE to use name, because javascript ensures a reference to the scope
/// is kept in memory, so that Detonate is able to use all the functions and variables in
/// its parent lexical environment.
let initer = init()
initer() // will print EXPLOSIONS and smiley face :)

/// now we will create a function that returns a value after a mathematical manipulation.
// this function is an addition operation
let add = function(x, y) {
    return x + y
}
// this function takes as input a function, and a variable- then applies the variable to the function
// while requesting another variable to actually run, in a different function that is returned.
function makeMath(x, func) {
    return function(y) {
        return func(x, y)
    }
}
// here we return that inner function that runs the function that was passed to its dad
// as a variable, and then we call the inner function with an additional variable,
// which in turn runs the 'parent variable function' with both x (lexically scoped earlier)
// and y (passed right now)
let add8 = makeMath(8, add)
console.log(add8(10))

/// closures may share the same functions, but do different things and store different lexical scopes.
let add5000 = makeMath(5001, add) // haha i lied xD its 5001 get scammed idiot
console.log(add5000(-1)) // i lied again xDDDD its 5000 

/// we can use closures to change front-end elements. for example, we can create 
/// singular javascript code that will change fonts to x-pixels.
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px'
    }
}
var size1000 = makeSizer(10) // get pranked IDIET
var sizeABCD = makeSizer(0xABCD) // PRANKED AGANE HEHE
// then we define buttons or events to trigger these:
//document.getElementById('size-ABCD').onclick = sizeABCD

/// we can also use closures to have private variables, although not natively.
/// here, we will use the module pattern and define an object with privates. (ooh)
// this is an object that returns a fibonaccinator, a data structure that increments
// its current value or decrements it via fibonacci only. 
var Fibonaccinator = (function (){
    var currentValue = 1
    var previousValue = 1;
    function changeBy(val) {

    }
    function fiboStep(direction) {
        // if direction is not null, forwards
        if (direction) {
            var temp = currentValue
            currentValue = previousValue += temp
            previousValue = temp
        }
        // if direction is null, backwards
        else {
            var temp = (currentValue - previousValue)
            currentValue -= temp
            previousValue = temp
        }
    }
    return {
        forward: function () {
            fiboStep(true)
        },
        backwards: function () {
            fiboStep(false)
        },
        forwardN: function (n) {
            for (let index = 0; index < n; index++) {
                fiboStep(true)
            }
        },
        backwardsN: function (n) {
            for (let index = 0; index < n; index++) {
                fiboStep(false)
            }
        },
        value: function() {
            return currentValue;
        }
    }
})();

// here we demonstrate the usage of it
console.log(Fibonaccinator.value())
Fibonaccinator.forward()
console.log(Fibonaccinator.value())
Fibonaccinator.forward()
console.log(Fibonaccinator.value())
Fibonaccinator.forwardN(3)
console.log(Fibonaccinator.value())
Fibonaccinator.backwards()
console.log(Fibonaccinator.value())
Fibonaccinator.backwardsN(8)
console.log(Fibonaccinator.value())
Fibonaccinator.forwardN(6)
console.log(Fibonaccinator.value())

// so what happened? we made multiple functions in the same object share the same lexical scope.
// this allows us to create as many fibonaccinators as we want, and they all will have differing values.
// in this case we used an anonymous example.

/////////// CLOSURE SCOPE CHAIN ////////////
/// for closures, we have three scopes. 
/// * its own scope
/// * parent scope
/// * global scope
// example:
var global = 10
function sum(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                return a + b + c + d + global
            }
        }
    }
}
console.log(sum(1)(2)(3)(4)) // logs 20
// this example shows us that closures do have access to all outer scopes.


// a common mistake people do is while creating closures in loops, people tend to forget
// how variables and scopes work. see comment below for explanation.
//
// this code is a stand-in for a webpage, where instead of DOM we have a variable that contains
// custom objects, in which a null variable is a stand in for a function to be put into it.
//
// we have defined our meme storage, and the means to print them. now we need only to install 
// the memes. we have three meme slots and we have chosen exquisite text to represent them. observe.
var memeStorage = [
    { 'id': 'M1', 'onfocus': null},
    { 'id': 'M2', 'onfocus': null},
    { 'id': 'M3', 'onfocus': null}
];
function printMeme(meme) {
    console.log(meme)
}

function installMemes() {
    var memes = [
        { 'id': 'M1', 'value': 'pepega' },
        { 'id': 'M2', 'value': 'wutface' },
        { 'id': 'M3', 'value': 'grumpy cat' }
    ];

    for (var index = 0; index < memes.length; index++) {
        // if this was a VAR, only M3 would be affected, this is because all
        // three created closures would share the same var, instead of having each
        // their own let at their parent block.
        let meme = memes[index];
        memeStorage[memeStorage.findIndex(x => x.id === meme.id)].onfocus = function() {
            printMeme(meme.value)
        }
    }
}
installMemes()
memeStorage.forEach(x => { console.log(x.id); x.onfocus() }) // print the memes

/// an alternative way would be to use more closures. for example:
var memeStorage = [
    { 'id': 'M1', 'onfocus': null},
    { 'id': 'M2', 'onfocus': null},
    { 'id': 'M3', 'onfocus': null}
];
function printMeme(meme) {
    console.log(meme)
}
// here we have a callback function that wraps a printMeme in its own lexical scope.
// this allows us to seperate different calls to the array and assign the funcs correctly.
function makeMemeCallback(meme) {
    return function() {
        printMeme(meme)
    }
}

function installMemes() {
    var memes = [
        { 'id': 'M1', 'value': 'pepega' },
        { 'id': 'M2', 'value': 'wutface' },
        { 'id': 'M3', 'value': 'grumpy cat' }
    ];

    for (var index = 0; index < memes.length; index++) {
        // here we can use var safely as we know it will wrapped in a new lexical scope.
        var meme = memes[index];
        memeStorage[memeStorage.findIndex(x => x.id === meme.id)].onfocus = makeMemeCallback(meme.value)
    }
}
installMemes()
memeStorage.forEach(x => { console.log(x.id); x.onfocus() }) // print the memes

/// alternatively, we can just use forEach and call it a day.
/// forEach is basically shorthand, for arrays, to call a function with enforced 'this'
/// on each called function's scope, therefore ensuring lexical scope seperation.
var memeStorage = [
    { 'id': 'M1', 'onfocus': null},
    { 'id': 'M2', 'onfocus': null},
    { 'id': 'M3', 'onfocus': null}
];
function printMeme(meme) {
    console.log(meme)
}

function installMemes() {
    var memes = [
        { 'id': 'M1', 'value': 'pepega' },
        { 'id': 'M2', 'value': 'wutface' },
        { 'id': 'M3', 'value': 'grumpy cat' }
    ];

    // we cheated and used a predicate. we will learn later what those are.
    memes.forEach(meme =>
        memeStorage[memeStorage.findIndex(x => x.id === meme.id)].onfocus = function() {
            printMeme(meme.value)
        })
}

installMemes()
memeStorage.forEach(x => { console.log(x.id); x.onfocus() }) // print the memes

////////// CLOSURES VS PROTOTYPES //////////
/// there is a performance consideration when it comes to using closures vs prototypes.
/// the main performance concern is against closures, where prototypes do not have to be 
/// redefined every time they are called, while closures will be defined in memory again and again,
/// with their own unique lexical scope.
/// 
/// however. an important note to take here is that prototypes shouldn't be redefined, but 
/// appended to. for example, you should not just go and do this:
function MyMeme(name, value) {
    this.name = name.toString()
    this.value = value.toString()
}
// VERY BAD DO NOT DO
MyMeme.prototype = {
    getName = function() {
        return this.name
    },
    getValue = function() {
        return this.value
    }
}

/// by contrast ... 
function MyMeme(name, value) {
    this.name = name.toString()
    this.value = value.toString()
}
// YES YES DO THIS PLS
MyMeme.prototype.getName = function() {
    return this.name
}
MyMeme.prototype.getValue = function() {
    return this.value
}
/// this way, method definitions need not occur twice, thrice or more. once is enough.
/// "prototypes, not even once" - javascript