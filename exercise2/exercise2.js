// exercise2.js is the calculator function list
// variables
var OPLeft = ""
var OPRight = ""
var OPCurrent = ""

// function definitions
// function clearCalc(clearType) {
//     if(cleartype === 'clear') {
//         let screen = document.getElementsByClassName("screen").innerHTML = 
//     }
//     else {

//     }
// }

function DisableNumbers(disabled) {
    for (num of numbers) {
        num.disabled = disabled
    }
}

function UpdateScreen(numToShow) {
    document.querySelector(".screen").innerHTML = numToShow
}

function Operand(num) {
    OPRight += num
    OPRight = parseFloat(OPRight).toString()
    UpdateScreen(OPRight)
}

function Equals() {
    if (OPRight) {
        Operation("")
    }
}

function Operation(sign) {
    // If this is a new operation, load the right operand to be the left.
    // new operation is where the left operand does not exist yet, and we are 
    // calling for it by requesting a second operand because we wish to operate on the first
    let result = 0;
    if (OPLeft && OPRight) {
        let Left = parseFloat(OPLeft)
        let Right = parseFloat(OPRight)
        switch (OPCurrent)
        {
            case '+':
                result = Left + Right;
                break
            case '-':
                result = Left - Right
                break
            case '×':
                result = Left * Right
                break
            case '÷':
                result = Left / Right
                break;
        }
        OPLeft = result.toString()
        OPCurrent = sign
        OPRight = ""
        UpdateScreen(OPLeft)
        DisableNumbers(true)
    }
    else {
        OPLeft = OPRight
        OPCurrent = sign
        OPRight = ""
        DisableNumbers(false)
    }
}

// function event bindings
var operations = document.querySelectorAll('.op')
var numbers = document.querySelectorAll('.num')
for (num of numbers) {
    num.addEventListener('click', function() { Operand(this.getAttribute('data-num')) })
}
for (op of operations) {
    op.addEventListener('click', function() { Operation(this.getAttribute('data-op') )})
    op.disabled = true
}
document.querySelector('.result').addEventListener('click', Equals)