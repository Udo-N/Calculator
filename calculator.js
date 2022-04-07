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

function buildString(buttonText){
    if (!isNaN(buttonText) || buttonText == '.'){    // If ButtonText is a number
        fullNumber += buttonText
        document.getElementById("inputs").innerHTML += buttonText
        document.getElementById("results").innerHTML = 'Result = '
    }
    else{
        inputNumbers.push(fullNumber)
        fullNumber = ''

        if (buttonText != '='){
            inputOperations.push(buttonText)
            document.getElementById("inputs").innerHTML += ' ' + buttonText + ' '
            document.getElementById("results").innerHTML = 'Result = '
        }
        else{
            console.log(inputNumbers)
            executable = 'result = ' + inputNumbers[0]

            for(var i=0; i < inputOperations.length; i++){
                executable += inputOperations[i] + inputNumbers[i+1]
            }

            eval(executable)
            inputNumbers = []
            inputOperations = []
            if(!Number.isInteger(result)){result = result.toFixed(4)}

            document.getElementById("inputs").innerHTML = ''
            document.getElementById("results").innerHTML += result;
            console.log(result)
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

