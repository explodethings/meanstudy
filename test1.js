// With great responsibility, comes great gaps in knowledge.
/////////// NUMBERS ////////////
console.log(Math.sin(3.5))
let circumference = 2 * Math.PI * 5
console.log(circumference)

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