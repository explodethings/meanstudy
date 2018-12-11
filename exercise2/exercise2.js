// exercise2.js is the calculator function list
// variables
var OPLeft = ""
var OPRight = ""
var OPCurrent = ""
var isDecimal = ""
// variables : DOM elements
var operations = document.querySelectorAll('.op')
var numbers = document.querySelectorAll('.num')
var decimal = document.querySelector('.decimal')
var result = document.querySelector('.result')
var clear = document.querySelector('.clear')

function disableButton(node, disabled) {
    // disable a button or any html element that has disabled attr
    // (func assumes it is a button, hence the name)
    node.disabled = disabled
}

function disableButtons(nodeList, disabled) {
    // disable multiple html elements that have the attr
    for (node of nodeList) {
        disableButton(node, disabled)
    }
}

function UpdateScreen(numToShow) {
    // change screen value to desired string
    document.querySelector(".screen").innerHTML = numToShow
}

function decimalSeperator() {
    // flag the decimal
    isDecimal = '.'
    // disable the ability to add more dots, this isnt an ip address
    disableButton(decimal, true)
    // if we dont have a right operand-
    if (!OPRight) {
        // present a 0 with a dot
        UpdateScreen('0' + isDecimal)
    }
    // otherwise-
    else {
        // apply the decimal normally
        UpdateScreen(OPRight + isDecimal)
    }
}

function changeClear(clearState) {
    // change the attribute to the clearstate and reflect change on board
    clear.setAttribute('data-clear', clearState)
    clear.innerHTML = clearState
}

function Clear(clearState) {
    // if the clear state is:
    switch(clearState) {
        // clear right operand
        case 'C':
            // clear the operand and update 0 to screen,
            // and enable the user to clear left operand
            OPRight = ''
            UpdateScreen('0')
            changeClear('AC')
            break
        // clear left operand
        case 'AC':
            // clear the operand and update 0 to screen,
            // and return the board to initial state
            OPLeft = ''
            UpdateScreen('0')
            disableButtons(numbers, false)
            disableButtons(operations, true)
            break
    }
}

function Operand(num) {
    // always try to add decimal point to number, and then make isDecimal empty (falsy)
    num = isDecimal + num
    isDecimal = ''
    // add the strings together and parse it into a floating point number
    OPRight += num
    OPRight = parseFloat(OPRight).toString()
    // enable clear right (we can clear zero as well) and enable operations
    changeClear('C')
    disableButtons(operations, false)
    // update screen
    UpdateScreen(OPRight)
    // enable result button if left operand is populated
    if (OPLeft) {
        disableButton(result, false)
    }
}

function Operation(sign) {
    let OPResult = 0;

    // if we have an operation and a left operand stored-
    if (OPCurrent && OPLeft) {
        // parse both operands
        let Left = parseFloat(OPLeft)
        let Right = parseFloat(OPRight)
        // depending on the operand, perform calc
        switch (OPCurrent)
        {
            case '+':
                OPResult = Left + Right;
                break
            case '-':
                OPResult = Left - Right
                break
            case '×':
                OPResult = Left * Right
                break
            case '÷':
                OPResult = Left / Right
                break
        }
        // left operand is now the result
        OPLeft = OPResult.toString()
        // next operation is stored
        OPCurrent = sign
        // right operand is cleared
        OPRight = ""
        // screen is updated with left operand
        UpdateScreen(OPLeft)
        // if we have an operation after this one-
        if (OPCurrent) { 
            // allow the user to input right operand, and disable result button
            disableButtons(operations, true)
            disableButtons(numbers, false)
            disableButton(result, true)
        }
        // otherwise-
        else { 
            // require user to request operation or clear memory
            disableButtons(operations, false)
            disableButtons(numbers, true)
            changeClear('AC')
        }
        // disable the result button
        disableButton(result, true)
    }
    // otherwise-
    else {
        // move right to left and clear right, set operation-
        OPLeft = OPRight
        OPCurrent = sign
        OPRight = ""
        // enable right operand input, disable operations
        disableButtons(numbers, false)
        disableButtons(operations, true)
        disableButton(decimal, false)
    }
}

// function event bindings
for (num of numbers) {
    num.addEventListener('click', function() { Operand(this.getAttribute('data-num')) })
}
for (op of operations) {
    op.addEventListener('click', function() { Operation(this.getAttribute('data-op')) })
    disableButton(op, true)
}
// equals means to calculate the stored operation and operands and dont store a next one
result.addEventListener('click', function() { Operation('') })
decimal.addEventListener('click', decimalSeperator)
clear.addEventListener('click', function() { Clear(this.getAttribute('data-clear')) })
// disable the result button
disableButton(result, true)