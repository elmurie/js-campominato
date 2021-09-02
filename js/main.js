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


// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).

var bombs = [];

for ( var i = 0; i < 3; i++) {
    var singleBomb = randomNumber(1, 5);
    if ( !bombs.includes(singleBomb)) {
        bombs.push(singleBomb);
    } else {
        singleBomb = randomNumber(1, 5);
        bombs.push(singleBomb);
    }
} 
console.log(bombs);