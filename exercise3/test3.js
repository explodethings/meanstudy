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