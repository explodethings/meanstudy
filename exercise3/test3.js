/* ///////// VAR VS LET VS CONST ///////// */
let something = 'nothing'
/// var
var xd = 'meme'
var xd
console.log(xd);

(function(){
    hehe = 5
    var hoho = 8
})()

console.log(hehe) // hehe is defined to global context
//console.log(hoho) // hoho is locked into function lifetime lexical scope - therefore it died

//var a 
console.log(a) // will crash the thread unless above line is uncommented

var a = 1
b = 2

delete this.a // will fail but not crash on declared vars
delete this.b // will succeed on undeclared vars
// means you cannot 'configure' vars that are declared.

// vars are hoisted to the top end of the code before it runs.
var a // this will make the code be able to run console.log(a) because hoisting.

/// scoping example
function newscope() {
    var x = 0;  // x is declared within file scope, then assigned a value of 0

    console.log(typeof z); // undefined, since z doesn't exist yet

    function a() { // when a is called,
        var y = 2;   // y is declared within scope of function a, then assigned a value of 2

        console.log(x, y);   // 0 2 

        function b() {       // when b is called
            x = 3;  // assigns 3 to existing file scoped x, doesn't create a new global var
            y = 4;  // assigns 4 to existing outer y, doesn't create a new global var
            z = 5;  // creates a new global variable z and assigns a value of 5. 
        }         // (Throws a ReferenceError in strict mode.)

        b();     // calling b creates z as a global variable
        console.log(x, y, z);  // 3 4 5
    }

    a();                   // calling a also calls b
    console.log(x, z);     // 3 5
    console.log(typeof y); // undefined as y is local to function a
}

/// let
// you cannot re-declare let variables
let hihi;
// let hihi will throw an error

// same for switch-case: if you declare same-name variable in two cases, it is in same block,
// therefore it is a redeclaration and youll crash. unless the case is also block defined { }

// let has a special interaction with hoisting - until it is assigned a value, it is 'temporarily dead'
// or as commonly portrayed, it is in a 'temporal dead zone'. 
// calling typeof(let TDZ) will crash with a reference error.

// similarily, if you call an object that has an attribute with the same name, in a loop,
// this will happen:
function go(n) {
    // n here is defined!
    console.log(n); // Object {a: [1,2,3]}
  
    //for (let n of n.a) { // ReferenceError
    //  console.log(n);
    //}
}
  
go({a: [1, 2, 3]});
// this is because 'let n' is TDZ and n.a is referring to THAT 'let n' and not the input n..
// 'let n of n.a' is defined inside the private scope of the for loop.

// you can call a var a = 5, and then inside a function, call let a = 55, and both will work
// in their own scopes only.

/// const
// define MY_FAV as a constant and give it the value 7
const MY_FAV = 7;

// this will throw an error - Uncaught TypeError: Assignment to constant variable.
// MY_FAV = 20;

// MY_FAV is 7
console.log('my favorite number is: ' + MY_FAV);

// trying to redeclare a constant throws an error -  Uncaught SyntaxError: Identifier 'MY_FAV' has already been declared
// const MY_FAV = 20;

// the name MY_FAV is reserved for constant above, so this will fail too
// var MY_FAV = 20;

// this throws an error too
// let MY_FAV = 20;

// it's important to note the nature of block scoping
if (MY_FAV === 7) { 
    // this is fine and creates a block scoped MY_FAV variable 
    // (works equally well with let to declare a block scoped non const variable)
    let MY_FAV = 20;

    // MY_FAV is now 20
    console.log('my favorite number is ' + MY_FAV);

    // this gets hoisted into the global context and throws an error
    // var MY_FAV = 20;
}

// MY_FAV is still 7
console.log('my favorite number is ' + MY_FAV);

// throws an error - Uncaught SyntaxError: Missing initializer in const declaration
// const FOO;

// const also works on objects
const MY_OBJECT = {'key': 'value'};

// Attempting to overwrite the object throws an error - Uncaught TypeError: Assignment to constant variable.
// MY_OBJECT = {'OTHER_KEY': 'value'};

// However, object keys are not protected (meaning, the 'value' of the key),
// so the following statement is executed without problem
MY_OBJECT.key = 'otherValue'; // Use Object.freeze() to make object immutable

// The same applies to arrays
const MY_ARRAY = [];
// It's possible to push items into the array
MY_ARRAY.push('A'); // ["A"]
// However, assigning a new array to the variable throws an error - Uncaught TypeError: Assignment to constant variable.
// MY_ARRAY = ['B'];

/////////// DETAILS OF THE OBJECT MODEL ////////////
/*
    There are major key differences between JavaScript and other OOP languages.
    Wait, JavaScript isn't OOP at all you say? You'd be half-right. 

    OOP languages are usually what's called Class-Based languages where a class is
    merely a definition of a data structure. It is also, by itself, an object, but not in
    the same sense as an 'Instance'. An Instance on the other hand is a member of that class,
    (not to be confused with the synonym class members == class properties) meaning it is
    a proper 'Object', representing itself as a class.

    JavaScript does not make that distinction, because it is a Prototype-Based language.
    Instead of specialized, abstract objects called classes, JavaScript does away with that
    and makes EVERYTHING an object, including those 'classes'. 

    'classes' are actually called 'prototypes', and what are those?

    Prototypes are objects that serve as templates for another object. Objects can specify
    their own properties, upon creation or at runtime. This logic allows for objects to become
    prototypes for further objects, and this might come across similar to inheritance in
    classic OOP scenarios, while the key difference being that the 'inheritance' is not
    strongly typed and is organic in the natrue of how objects interact with one another in JS.

    When creating instances with class-based languages, you define a method in that class
    definiton that is called a 'constructor'. Within a constructor you can perform operations
    on the variables of the instance or other available instance when the aforementioned
    instance is created by the constructor.

    When creating objects in javascript, you can use any function as a constructor,
    and you're not restricted to strongly-typed class definitions when you're trying to
    create new objects. prototypes chain to each other when you're inheriting properties
    and functions, which we will demonstrate:
*/

/// inheritance and the prototype chain:
/// we will define f. when f is defined this way, js generates a prototype for it
/// that contains a and b when creating objects from it. these variables and the prototype
/// are akin to a 'singleton for f's properties' meaning that they are shared and changed
/// and referenced all to the same point - but not across multiple instantiations if changed
/// between them, such as instance, change prototype, instance - this will append two
/// differing prototypes to the two instances, this is akin to changing the constructor at runtime.
let f = function () {
    this.a = 1
    this.b = 2
}
let o = new f()
let i = new f()
f.prototype.b = 3
f.prototype.c = 4

console.log(o.a) // 1
console.log(o.b) // 2
console.log(o.c) // 3
console.log(o.d) // undefined

/// so what happened here? we changed the prototype of 'f', making its value 'b' equal to 2
/// and the value 'c' equal to 4. we did not have a c defined in the prototype of f.
/// JS assign this to 'o' prototype instead - meaning that c is accessible via o.[[prototype]]
/// rather than in 'o' directly. in 'o' directly we have 'a' and a 'b' from 'f' prototype.

/// when we print o.b, the o.b is printed, not o.[[prototype]].b. this is called
/// property shadowing, if JS finds a property in the prototype chain that is called 'b' it 
/// will 'visit' it (whether it be a function or a variable) but won't check further down,
/// meaning the visiting process is greedy.

/// when we ask for o.c, we will not find it under 'o', but instead, in o.[[prototype]].
/// when we ask for o.d, js will try finding it in the o.[[prototype]].[[object.prototype]].
/// it will not find it there since it is usually a bad idea to touch that prototype in general.
/// but it is WAS defined under object.prototype, it would be visited accordingly.

/// the chain goes as follows:
/// object[N * (.[[prototype]])].[[object.prototype]].null, where N is the length of the chain.

/// lets see what happens with methods:
let f2 = function() {
    return {
        a: 2,
        m: function() {
            return this.a + 1
        }
    }
}
let o2 = new f2()
console.log(o2.m())
let o3 = Object.create(f2()) // o3 inherits from f2
o3.a = 3 // create property a on o3 that has 3 instead of 2
console.log(o3.m()) // print 4

// why did this happen? because when m was inherited from f2, 'this' refers
// to the lexical scope of o3. the lexical scope of 'this' will be always set to
// the inheriting object, and not the prototype of f2.

/* 
    The prototype chain exists because every object created in JS has a basic prototype
    containing functions and properties. for example, this simple code:
*/
function doSomething(){}
console.log( doSomething.prototype );
// It does not matter how you declare the function, a
//  function in JavaScript will always have a default
//  prototype property.
var doSomething = function(){}; 
console.log( doSomething.prototype );
/*
    Will output a description of the prototype, something like this:
    {
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ hasOwnProperty(),
            isPrototypeOf: ƒ isPrototypeOf(),
            propertyIsEnumerable: ƒ propertyIsEnumerable(),
            toLocaleString: ƒ toLocaleString(),
            toString: ƒ toString(),
            valueOf: ƒ valueOf()
        }      
    }

    If we add properties to the prototype, like so:
*/
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );
/*
    It will look like this:
    {
        foo: "bar",
        constructor: ƒ doSomething(),
        __proto__: {
            constructor: ƒ Object(),
            hasOwnProperty: ƒ hasOwnProperty(),
            isPrototypeOf: ƒ isPrototypeOf(),
            propertyIsEnumerable: ƒ propertyIsEnumerable(),
            toLocaleString: ƒ toLocaleString(),
            toString: ƒ toString(),
            valueOf: ƒ valueOf()
        }
    }
    Now we will demonstrate the 'new' keyword. This allows JS to create new 'instances'
    of objects, inheriting their prototype and furthering the chain.
    For example:
*/
function doSomething(){}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log( doSomeInstancing );
/*
    This will output the following:
    {
        prop: "some value",
        __proto__: {
            foo: "bar",
            constructor: ƒ doSomething(),
            __proto__: {
                constructor: ƒ Object(),
                hasOwnProperty: ƒ hasOwnProperty(),
                isPrototypeOf: ƒ isPrototypeOf(),
                propertyIsEnumerable: ƒ propertyIsEnumerable(),
                toLocaleString: ƒ toLocaleString(),
                toString: ƒ toString(),
                valueOf: ƒ valueOf()
            }
        }
    }

    As expected, the property called 'prop' was added as a property to the object itself,
    while 'foo' was added to the prototype object of 'doSomeInstancing'.

    The __proto__ we keep seeing on the low end is Object.prototype. It is always a prototype
    of any object, inherited upon creation. Of course, Object.prototype does not have a prototype,
    and as explained earlier, is where the chain ends.

    Now we will describe how literals are chained with their prototypes.
    This means that if a literal is declared and it has a non object.prototype chained to it,
    it is an indication of inheritance under JS terms.
*/

/// Object literal : o.[[Object.prototype]].null
var o = {a:2}

/// Array literal : o.[[Array.prototype]].[[Object.prototype]].null
var o = [5, 4, 70]

/// Function literal : o.[[Function.prototype]].[[Object.prototype]].null
function f() {
    console.log('dank memes')
}
/// also hoists itself under [var f = function() { console.log('dank memes') }]

/// when we call literals this way, this is shorthand for using the 'new' keyword,
/// which 'constructs' a new object by appending a copy of the prototype to the object.
/// ES5+ allows you to use use Object.create to specify a prototype for a new object as an argument.
/// with Object.create you can create custom prototype chains more easily, or make an object not have one.
var d = Object.create(null) // return an object with no prototype of its own.
var e = Object.create(d) // will still not contain Object.prototype, but instead e.[[d]] will exist.

/*
    ES5 introduces classes. 
    class - class declaration block { }
    constructor - ctor declaration block { }
    static - assigns variables and functions to the MyClass object-function, as properties to its
             lexical context, without closure.
    super - super(...args) is the parent constructor
    extends - allows you to chain prototypes by definition of the class.
*/
'use strict'; // use this to force javascript to be more strongly typed.

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
/// this looks like typescript but it isnt - its missing some keywords that are unused here,
/// such as public, private, etc.

/*
    Performance considerations :
        Having an object really deep inside a prototype chain can have serious performance
        issues. A rule of thumb to keep in mind, is that because the lookup is greedy,
        it will keep referencing further and further until it reaches a null.

        (Remember to keep that in mind when making deadlocks by accident!)

        This means that if you're looking for a property from an object that is heavily
        prototype chained, in long loops, you can run into serious slowdowns in your design.

        JavaScript provides means to query properties on the object itself without
        enumerating the prototype chain - hasOwnProperty(). A function inherited from Object.
*/
/// we will demonstrate by using the graph example from earlier.
console.log(g.hasOwnProperty('vertices'));
// true - property exists on g

console.log(g.hasOwnProperty('nope'));
// false - no such property exists

console.log(g.hasOwnProperty('addVertex'));
// false - looking inside the object will not yield this method

console.log(g.__proto__.hasOwnProperty('addVertex'));
// true - looking inside the prototype will yield this method

/*
    You should not extend Object, as it is considered bad practice.
    However, some JS new features tend to be backported to other objects,
    such as with Array and forEach. This is an intended use of the functionality.
*/

/*
    We will demonstrate 4 ways extending prototypes, otherwise known as inheritance.
*/
/// 1: strictly using new
function foo(){}
foo.prototype = { // replaces foo.[[Object.prototype]] with foo.[[CustomPrototype]]
  foo_prop: "foo val"
}; // creates a variable in foo
function bar(){}
var proto = new foo; // chain foo.[[CustomPrototype]] to new variable
proto.bar_prop = "bar val"; // put new variable to proto
bar.prototype = proto; // have bar's prototype be the proto variable
var inst = new bar; // inst.[[bar.prototype]].[[proto]].[[foo.CustomPrototype]]
console.log(inst.foo_prop); // goes all the way to the end: foo.CustomPrototype
console.log(inst.bar_prop); // goes to 'proto'
/*
    Pros: Support in the largest range of browsers (IE 5.5 and up chronologically)
    Cons: The constructor must be initalized, meaning it inherits from Function.prototype
          unwanted methods. However, this is usually not a cons.

    Overall: Safe, straightforward JS method.
*/

/// 2: Object.create(prototype, properties object)
function foo(){}
foo.prototype = {
  foo_prop: "foo val"
};
function bar(){}
var proto = Object.create( // you can provide a 2nd argument : an object of properties
  foo.prototype,
  {
    bar_prop: {
      value: "bar val"
    }
  }
);
bar.prototype = proto;
var inst = new bar;
console.log(inst.foo_prop);
console.log(inst.bar_prop)
/*
    Pros: One time configuration of the properties of the prototype instead of multiple calls
    Cons: The second argument of the properties to Object.create, contains instantiations
          that can slow the initalization of the whole properties object. If you make the object
          too complex, you can introduce slowdowns.
*/

/// 3: Object.setPrototypeOf(obj, prototype) returns the obj after config.
/// or 4: setting __proto__ directly.
function foo(){}
foo.prototype = {
  foo_prop: "foo val"
};
function bar(){}
var proto;
proto=Object.setPrototypeOf(
  { bar_prop: "bar val" },
  foo.prototype
);
bar.prototype = proto;
var inst = new bar;
console.log(inst.foo_prop);
console.log(inst.bar_prop)
/*
    The cons outweight possible pros here, because when you change prototype dynamically
    it causes the runtime as a whole to slow because you wipe away optimizations made initially.

    Besides, if you use it this way, you break inheritance and create some sort of frankenstein.
    An inherited object that had a prototype applied to it that is not its own will no longer
    be an 'instanceof' the inheritee, because its prototype is gone (for example,
        Object.setPrototypeOf(this, Animal) in a Dog constructor, will force the chain
        to be Dog.[[Animal.prototype]] instead of Dog.[[Dog.prototype]].[[Animal.prototype]])
*/

/*
    Adding and removing properties is impossible in strongly typed class-based languages.
    In JS you can remove and add freely.

    JavaScript enables you to have flexible constructors with || and &&. In Java you have
    to overload the constructor for every possible configuration of a construction of an object.
    for example, this.name = '' || name, if name is null, name will be '', instead of crash
    and burn like in Java
*/
