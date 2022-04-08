// This function is used to convert a 2D array to a grid of buttons that will be displayed
// in a HTML tag identified by the 'tagID' input.
// Constraint: All array elements within the outer array must have the same length. 
// array[0].length == array[1].length == array[2].length
function array2DToHTML(array, tagId) {
    var t = "";

    // Loop over each array element in outer array
    for (var i = 0; i < array.length; i++){
        // Create div to represent the current row
        var cells = "<div id='row-" + (i+1) + "'>";

        // Loop over each value in array element
        for (var j = 0; j < array[0].length; j++){
            // Create button tag with value as button text
            cells += "<button id='cell-"+ i +"-" + j + "'>" + array[i][j] + "</button>";
        }

        cells += "</div>";
        t += cells;
    }
    document.getElementById(tagId).innerHTML = t;

    // When each button in the grid is clicked, the function, buildString() is called 
    bclicks = document.querySelectorAll("#" + tagId + " button");
    for (let bclick of bclicks) {
        bclick.addEventListener("click", () => {
            var v = bclick.textContent;
            buildString(v)  
        });
    }

}

// This function is used to display text when the calculator's buttons are pushed and display 
// a result when the '=' button is pushed
function buildString(buttonText){
    // If the button pressed is a number or '.', display that value above the button grid and
    // append the number to a string called 'fullNumber'
    if (!isNaN(buttonText) || buttonText == '.'){    
        fullNumber += buttonText
        document.getElementById("inputs").innerHTML += buttonText
        document.getElementById("results").innerHTML = 'Result = '
    }
    // Append fullNumber to the array 'inputNumbers' and reset fullNumber to an empty string
    else{
        inputNumbers.push(fullNumber)
        fullNumber = ''

        // If an operation button (+, *, -, /), place the operation after fullNumber in the 
        // browser and add the operation to the array 'inputOperations'
        if (buttonText != '='){
            inputOperations.push(buttonText)
            document.getElementById("inputs").innerHTML += ' ' + buttonText + ' '
            document.getElementById("results").innerHTML = 'Result = '
        }

        // Else if '=' is pressed:
        else{
            // Append all the numbers and operations that are stored in inputNumbers and 
            // inputOperations into a single string
            executable = 'result = ' + inputNumbers[0]
            for(var i=0; i < inputOperations.length; i++){
                executable += inputOperations[i] + inputNumbers[i+1]
            }

            try{
                // Execute the single string as a line of code and clear both arrays
                eval(executable)
                inputNumbers = []
                inputOperations = []

                // Format non-whole numbers to 4 decimal places
                if(!Number.isInteger(result)){result = result.toFixed(4)}

                document.getElementById("inputs").innerHTML = ''
                document.getElementById("results").innerHTML += result;
            }
            // If input is invalid, display 'Syntax Error' 
            catch (error){
                document.getElementById("inputs").innerHTML = ''
                document.getElementById("results").innerHTML = "Syntax Error";
                inputNumbers = []
                inputOperations = []
            }
        }
    }
}


var twoDArray = [
    ['+', '7', '8', '9'],
    ['*', '4', '5', '6'],
    ['/', '1', '2', '3'],
    ['-', '.', '0', '='],
];
array2DToHTML(twoDArray, "grid")

var fullNumber = ''
var inputNumbers = []
var inputOperations = []

