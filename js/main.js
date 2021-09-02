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

// Genera numero random da 1 a 100 
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Individuo il campo nella pagina
var field = document.getElementById('campo');

// Da quante celle è composto il campo
let howManyCells = parseInt(document.getElementById('grid').value); 

// Indice delle celle
var numCells = [];

function createField(num) {
    switch(num) {
        // 2b. Assegno ad ogni caso una larghezza diversa del e genero il corretto numero di celle
        case 10:
            field.classList.add('field-5');
            for ( var i = 1; i <= (num); i++) {
            field.innerHTML += `<div class="quadrato">${i}</div>`;
            numCells.push(i);
        }
        console.log(numCells);
        break;
        case 80:
            for ( var i = 1; i <= (num); i++) {
            field.innerHTML += `<div class="quadrato">${i}</div>`;
            numCells.push(i);
        }
        console.log(numCells);
        break;
        case 50:
            for ( var i = 1; i <= (num); i++) {
            field.innerHTML += `<div class="quadrato">${i}</div>`;
            numCells.push(i);
        }
        console.log(numCells);
        break;


    }

}
//-----------------------//

/* PROGRAMMA */

// Individuo il bottone per generare il campo
var btnGenerate = document.getElementById("generate");
// assegno la funzione al bottone
btnGenerate.addEventListener('click',
function() {
    field.innerHTML = '';
    howManyCells = parseInt(document.getElementById('grid').value); 
    createField(howManyCells);
    
}
); 
// Individuo il bottone per cancellare il campo
var btnReset = document.getElementById("reset");
// assegno la funzione al bottone
btnReset.addEventListener('click',
function() {
    document.getElementById("grid").value = '';
    field.innerHTML = '';
    
}
); 

// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).

var bombs = [];

while ( bombs.length < 3 ) {
    var singleBomb = randomNumber(1, 100);
    if ( !bombs.includes(singleBomb)) {
        bombs.push(singleBomb);
    }
} 
console.log(bombs);

// Al click su una cella dovrà essere mostrato con un alert il numero della cella e il suo background diventerà rosso.

document.getElementById('campo').addEventListener("click",
    function(square) {
        // 3a. Individua il quadrato tramite target ed aggiungi la classe che ne cambia il colore
        square.target.classList.toggle('clicked');
        // 3b. mostra numero della cella tramite alert  
        alert(square.target.innerHTML);
    }
);