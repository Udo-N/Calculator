function array2DToHTML(array) {
    var t = "";
    for (var i = 0; i < array.length; i++){
        var cells = "<div id='row-" + (i+1) + "'>";
        cells += "<button id='cell-"+ i +"-0'>" + array[i][0] + "</button>";
        cells += "<button id='cell-"+ i +"-1'>" + array[i][1] + "</button>";
        cells += "<button id='cell-"+ i +"-2'>" + array[i][2] + "</button>";
        cells += "<button id='cell-"+ i +"-3'>" + array[i][3] + "</button>";
        cells += "</div>";
        t += cells;
        console.log(cells)
    }
    document.getElementById("grid").innerHTML = t;

    bclicks = document.querySelectorAll("#grid button");
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
var fullNumber = ''
var inputNumbers = []
var inputOperations = []

array2DToHTML(twoDArray)

document.addEventListener("DOMContentLoaded", () => {
    const newGame = document.querySelector(".new-game");
    const simpGame = document.querySelector(".simp-game");
    var bclicks = document.querySelectorAll("#puzzle button");
    
    

    for (let bclick of bclicks) {
        bclick.addEventListener("click", () => {
            var v = bclick.textContent;
            moveCell(v);
        });
    }    
    
});
