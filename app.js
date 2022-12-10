
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#game-status");
const restartBtn = document.querySelector("#restart-btn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let xWins = 0
let oWins = 0
let draws = 0
let running = false;

initializeGame(); 

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Add a Event Listener that calls the function "cellClicked" on each "click"
    restartBtn.addEventListener("click", restartGame); // Give the restartBtn the power to restart the game
    statusText.textContent = `${currentPlayer}'s turn`; // Write who's gonna play rn
    running = true; // With all this function, everything is gonna work correctly (calling their functions that make them functional), and when running = false (the game isn't running), 'anything works'
    updateStatus()
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){ // ! means "not", so !running means "not running"
        return; 
    } // if there are something in that cell we are clicking in or the game isn't running, nothing happens 
    
    // but if there are something there, we'll check if there's a winner and update that cell
    updateCell(this, cellIndex); 
    checkWinner();
}


function updateCell(cell, index){
    options[index] = currentPlayer; // will put on the options array who clicked on that place (so we can check winner)
    cell.textContent = currentPlayer; // will put on the cell the simbol from the current player (X / O)
    cell.classList.remove('not-clicked-cell')
}


function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // If the current player is X, then we change it to O, and if it's not X (in other words, it's O), we change it back again to X
    statusText.textContent = `${currentPlayer}'s turn`; // Update the statusText to show who is gonna play now
}


function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){  // the "i" variable is gonna increase 1 for each winCondition we have
        const condition = winConditions[i]; // the condition will cover all winConditions bc of the for above
        
        // Will check each of the three items inside each part of the array
        const cellA = options[condition[0]]; 
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // if all of them are equal, we have a winner, if not, the game keeps going
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true; // <- key to make the game stops when we have a winner
            break;
        }
    }

    if(roundWon){
        if(currentPlayer == 'X'){
            xWins++
        }else if(currentPlayer == 'O'){
            oWins++
        }else{
            draws++
        }
        updateStatus()
        statusText.textContent = `${currentPlayer} wins!`;
        cells.forEach(cell => cell.classList.remove('not-clicked-cell'))
        running = false; // stops running (stops the game), and change the status to who won
    }

    // if there are not a winner and there are any empty space, we have a draw
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }

    // if no one won and there are empty spaces, the game keeps going and we change who's gonna play rn
    else{
        changePlayer();
    }
}

// clears every change and starts everything again
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    cells.forEach(cell => cell.classList.add('not-clicked-cell'))
}

function updateStatus(){
    const xWinsSpan = document.querySelector('#x-wins')
    const oWinsSpan = document.querySelector('#o-wins')
    const drawsSpan = document.querySelector('#draws')

    xWinsSpan.innerHTML = xWins;
    oWinsSpan.innerHTML = oWins;
    drawsSpan.innerHTML = draws;
}