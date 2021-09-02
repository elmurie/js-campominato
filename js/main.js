/*Consegna
Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
I numeri non possono essere duplicati.
In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
Al termine della partita il software deve comunicare il punteggio.
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 => tra 1 e 80
con difficoltà 2 => tra 1 e 50 */

/* FUNZIONI */

// Genera numero random
function randomNumber(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Genera 16 "bombe" con assegnato un numero random compreso tra 1 ed il numero di celle

var bombs = [];
function generateBombs(gridSize) {
    while ( bombs.length < 16 ) {
        var singleBomb = randomNumber(1, gridSize);
        if ( !bombs.includes(singleBomb)) {
            bombs.push(singleBomb);
        }
    }
    console.log('le bombe sono', bombs.sort((a,b)=>a-b));
    return bombs;
}
// Individuo il campo nella pagina
var field = document.getElementById('campo');

var howManyCells = 0;

var numCells = [];

function createField(num) {
    switch(num) {
        // 2b. Assegno ad ogni caso una larghezza diversa del e genero il corretto numero di celle
        case 100:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato big" id="${i}"></div>`;
            }
        break;
        case 80:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato big" id="${i}"></div>`;
            }
        break;
        case 50:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato small" id="${i}"></div>`;
            }
        break;
    }

}
//-----------------------//

/* PROGRAMMA */
var result = document.getElementById('result');
result.style.display = "none";
var victory = document.getElementById('victory');
victory.style.display = "none";
var loss = document.getElementById('loss');
loss.style.display = "none";

var scoreboard = document.getElementById('scoreboard');


var userChoice = document.getElementById("userChoice");

// Individuo il bottone per generare il campo
var btnGenerate = document.getElementById("generate");

var safeCells = 0;
// assegno la funzione al bottone
btnGenerate.addEventListener('click',
function() {
    userChoice.style.display = "none";
    field.innerHTML = '';
    howManyCells = parseInt(document.getElementById('grid').value); 
    bombs = generateBombs(howManyCells);
    createField(howManyCells);
    return safeCells = howManyCells - +bombs.length;
}
); 
// Individuo il bottone per cancellare il campo
var btnReset = document.getElementById("reset");
// assegno la funzione al bottone
btnReset.addEventListener('click',
function() {
    result.style.display = "none";
    document.getElementById("grid").value = '';
    field.innerHTML = '';
    userChoice.style.display = "block";
    btnAgain.style.display = "none";
    bombs = [];
    field.style.pointerEvents = "auto";
}
); 

// Individuo il bottone per rigiocare
var btnAgain = document.getElementById('playAgain');
// assegno la funzione al bottone
btnAgain.addEventListener('click',
    function() {
        bombs = [];
        field.innerHTML = "";
        result.style.display = "none";
        userChoice.style.display = "block";
        field.style.pointerEvents = "auto";
    }
);

// Field click
var points = 0;
var alreadyClicked = [];
document.getElementById('campo').addEventListener("click",
    function(square) {
        var bombCheck = parseInt(square.target.id);
        if ( !(bombs.includes(bombCheck) ) && !(alreadyClicked.includes(bombCheck) ) ) {
            square.target.classList.add('safe');
            points++;
            alreadyClicked.push(bombCheck);
            console.log( "sei a ", points, "punti");
        } else if ( !(bombs.includes(bombCheck) ) && (alreadyClicked.includes(bombCheck) ) ){

        } else {
            square.target.classList.add('bomb');
            victory.style.display = "none";
            loss.style.display = "block";
            btnAgain.style.display = "inline-block";
            scoreboard.innerHTML = points + (" Punti");
            result.style.display = "block";
            bombs = [];
            points = 0;
            alreadyClicked = [];
            field.style.pointerEvents = "none";
    }
    if ( points == safeCells) {
        field.style.pointerEvents = "none";
        victory.style.display = "block";
        btnAgain.style.display = "inline-block";
        scoreboard.innerHTML = points + (" Punti");
        result.style.display = "block";
        alreadyClicked = [];
        bombs = [];
        points = 0;
    }
}
);

