const tabelRow =  document.getElementsByTagName('tr');
const tableCells = document.getElementsByTagName('td');
const tableSlots = document.querySelectorAll('.slot');
const scoreOverview = document.getElementById('score-overview');
let currentPlayer = 1;


const player = (name) => {
    let score = 0;
    return {
        name, score
    }
};

let player1;
let player2;



// for( i=0; i < tableCells.length; i++) {
//     tableCells[i].addEventListener('click', e => {
//         console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
//     })
// };
function initializeGame() {
    Array.prototype.forEach.call(tableCells, (cell) => {
        cell.addEventListener('click', checkWin);
        cell.style.backgroundColor = 'white'
    });
}

    
function checkWin(e) {
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i>-1; i--) {
        if(tabelRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tabelRow[i].children[column]);
            if(currentPlayer === 1) {
                row[0].style.backgroundColor = 'red';
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                    //remove the event istener from the slots "table cells"
                    Array.prototype.forEach.call(tableCells, cell => cell.removeEventListener('click', checkWin));
                    //Update score
                    ++player1.score;
                    //Update the scoreboard
                    scoreOverview.innerHTML = `Current score : ${player1.score} : ${player2.score}`;
                    //Display the "New Round" button
                    document.querySelector('.newGame').style.display = 'block';
                    //alert the winner
                    return (alert(`${player1.name} is the WINNER!!`));
                }else if(drawCheck()){
                    //remove the event istener from the slots "table cells"
                    Array.prototype.forEach.call(tableCells, cell => cell.removeEventListener('click', checkWin));
                    //Display the "New Round" button
                    document.querySelector('.newGame').style.display = 'block';
                    //Alert the game is draw
                    return alert('It\'s a tie');
                }else{
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
                    //remove the eventlistener from the slots "table cells"
                    Array.prototype.forEach.call(tableCells, cell => cell.removeEventListener('click', checkWin));
                    //Update score
                    ++player2.score;
                    //Update the scoreboard
                    scoreOverview.innerHTML = `Current score : ${player1.score} : ${player2.score}`;
                    //Display the "New Round" button
                    document.querySelector('.newGame').style.display = 'block';
                    //alert the winner
                    return (alert(`${player2.name} is the WINNER`));
                }else if(drawCheck()){
                    //remove the eventlistener from the slots "table cells"
                    Array.prototype.forEach.call(tableCells, cell => cell.removeEventListener('click', checkWin));
                    //Display the "New Round" button
                    document.querySelector('.newGame').style.display = 'block';
                    //Alert the game is draw
                    return alert('It\'s a tie');
                }else{
                    return currentPlayer = 1;
                }
            }
        }
    }
};

function colorMatchCheck(one, two, three, four) {
    return(one == two && one == three && one == four && one != 'white');
};

function horizontalCheck() {
    for(let row = 0; row< tabelRow.length; row++){
        for (let col = 0; col < 4; col++) {
            if(colorMatchCheck(tabelRow[row].children[col].style.backgroundColor, tabelRow[row].children[col+1].style.backgroundColor, tabelRow[row].children[col+2].style.backgroundColor, tabelRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
};

function verticalCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if(colorMatchCheck(tabelRow[row].children[col].style.backgroundColor, tabelRow[row+1].children[col].style.backgroundColor, tabelRow[row+2].children[col].style.backgroundColor, tabelRow[row+3].children[col].style.backgroundColor,)) {
                return true;
            }
        }
    }
};

function diagonalCheck1() {
    for (let col = 0; col <4; col++) {
        for (let row = 0; row <3; row++) {
            if(colorMatchCheck(tabelRow[row].children[col].style.backgroundColor, tabelRow[row+1].children[col+1].style.backgroundColor, tabelRow[row+2].children[col+2].style.backgroundColor, tabelRow[row+3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
};


function diagonalCheck2() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if(colorMatchCheck(tabelRow[row].children[col].style.backgroundColor, tabelRow[row-1].children[col+1].style.backgroundColor, tabelRow[row-2].children[col+2].style.backgroundColor, tabelRow[row-3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
};

function drawCheck() {
    let fullSlot = [];
    for (let i = 0; i < tableCells.length; i++) {
        if(tableCells[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCells[i]);
        }
    }
    if(fullSlot.length === tableCells.length) {
        return true;
    }
};    

function setPlayers() {
    player1 = player(document.getElementById('player1').value);
    player2 = player(document.getElementById('player2').value);

    let x = document.querySelector('.players');
    let y = document.querySelector('.startGame');
    let y2 = document.getElementById('playertype');
    document.getElementById('scoreboard').style.display = 'none';
    y2.style.display = 'none';
    y.style.display = 'none';
    x.style.display = 'none';

    document.getElementById('score').style.display = 'flex';

    let z = document.getElementById('player1-name');
    z.style.display='block';
    z.innerHTML = `Player 1: ${player1.name}`;

    let z2 = document.getElementById('player2-name');
    z2.style.display='block';
    z2.innerHTML = `Player 2: ${player2.name}`;

    let z3 = document.getElementById('score-overview');
    z3.style.display='block';
    z3.innerHTML = `Current Score: ${player1.score} : ${player2.score}`;        
};

const startGame = () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        initializeGame();
        setPlayers();
        e.preventDefault()
        document.querySelector('.grid-container').style.display = 'flex';
        document.querySelector('.reset').style.display = 'block';
    })
};


function selectMode() {
    let mode = document.querySelector('.play-mode');

    mode.addEventListener('click', e => {
        if(e.target.className == 'single') {
            document.querySelector('#playertype').style.display = 'flex';
            document.querySelector('.play-mode').style.display = 'none';
            document.querySelector('#playertype').innerHTML = '<b>Under Constructions</b>';
        } else{
            document.querySelector('form').style.display = 'block';
            document.querySelector('.play-mode').style.display = 'none';
            startGame();
        }
    })
};

function newGame() {
    initializeGame();
    let x =document.querySelector('.newGame');
    x.style.display = 'none';
};


window.addEventListener('load', selectMode);