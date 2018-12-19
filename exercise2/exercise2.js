// exercise2.js is the calculator function list
// variables
var OPLeft = ''
var OPRight = '0'
var OPCurrent = ''
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
    // disable the ability to add more dots, this isnt an ip address
    disableButton(decimal, true)
    // apply the decimal normally
    OPRight += '.'
    UpdateScreen(OPRight)
    disableButtons(numbers, false)
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
            disableButton(decimal, false)
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
    // add the strings together and parse it into a floating point number,
    // then reconverted into a string to correct string-based-number-representations
    tempNum = OPRight + num
    tempString = parseFloat(tempNum).toString()
    // if the number has changed-
    if (tempString !== tempNum && decimal.disabled === true) {
        // finalize the number as the right operand
        OPRight = tempNum
    }
    // otherwise, we have a leading zero
    else {
        // the right operand is equal to the parsed number from parseFloat
        OPRight = tempString
    }
    // enable clear right and enable operations
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
        // if we did not input a right operand yet-
        if (!OPRight) {
            // update the sign and return
            OPCurrent = sign
            return
        }
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
        // screen is updated with left operand
        UpdateScreen(OPLeft)
        // if we have an operation after this one-
        if (OPCurrent) { 
            // allow the user to input right operand, and disable result button,
            // and also allow to input decimals.
            disableButtons(numbers, false)
            disableButton(result, true)
            disableButton(decimal, false)
        }
        // otherwise-
        else { 
            // require user to request operation or clear memory.
            // disable ability to input decimals.
            disableButtons(operations, false)
            disableButtons(numbers, true)
            disableButton(decimal, true)
            changeClear('AC')
        }
        // disable the result button
        disableButton(result, true)
    }
    // otherwise-
    else {
        // if our right operand is empty, populate it with a zero.
        if (!OPRight) {
            OPRight = '0'
        }
        // move right to left and clear right, set operation-
        // if OPLeft is null, put the right operand to be the left one.
        OPLeft = OPLeft || OPRight
        OPCurrent = sign
        // enable right operand input, disable operations, enable decimal
        disableButtons(numbers, false)
        disableButton(decimal, false)
        disableButton(result, true)
    }
    // clear right operand
    OPRight = ''
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