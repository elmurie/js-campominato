/* FUNZIONI */

// Genera numero random
function randomNumber(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Genera 16 "bombe" con assegnato un numero random compreso tra 1 ed il numero di celle (gridSize)

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
// Crea il campo minato 
function createField(num) {
    switch(num) {
        // Assegno ad ogni caso il corretto numero di celle da generare
        case 100:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato" id="${i}"></div>`;
            }
        break;
        case 80:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato" id="${i}"></div>`;
            }
        break;
        case 50:
            field.classList.add('field-500');
            for ( var i = 1; i <= num; i++) {
                field.innerHTML += `<div class="quadrato" id="${i}"></div>`;
            }
        break;
    }

}
//-----------------------//

/* PROGRAMMA */
// Div select + pulsante start
var userChoice = document.getElementById("userChoice");
// Banner risultato
var result = document.getElementById('result');
result.style.display = "none";
// Testo vittoria
var victory = document.getElementById('victory');
victory.style.display = "none";
// Testo sconfitta
var loss = document.getElementById('loss');
loss.style.display = "none";
// Testo errore select
var error = document.getElementById('error');
error.style.display = "none";
// Testo punteggio
var scoreboard = document.getElementById('scoreboard');

// Individuo il campo nella pagina
var field = document.getElementById('campo');

// Il numero di celle che si vuole nella griglia
var howManyCells = 0;





// Bottone per generare il campo minato
var btnGenerate = document.getElementById("generate");

// Variabile che salva il numero di celle senza bombe
var safeCells = 0;
// assegno evento al Bottone
btnGenerate.addEventListener('click',
function() {
    error.style.display = "none";
    // Individuo quante celle ha scelto l'utente
    howManyCells = parseInt(document.getElementById('grid').value);
    // Controllo input select
    if ( isNaN(howManyCells) ) {
        error.style.display = "block";

    } else {
        // Stili
        btnReset.style.display = "block";
        btnReset.style.visibility = "visible";
        victory.style.display = "none";
        loss.style.display = "none";
        userChoice.style.display = "none";
        // /Stili
        // Genero le bombe con valore massimo del numero random uguale al numero totale di celle
        bombs = generateBombs(howManyCells);
        // Genero il campo
        createField(howManyCells);
        // Salvo il numero di celle 
        return safeCells = howManyCells - +bombs.length;
    }
}
); 

// Individuo il bottone per cancellare il campo
var btnReset = document.getElementById("reset");
// assegno evento click al bottone
btnReset.addEventListener('click',
function() {
    // Stili 
    btnReset.style.display = "none";
    error.style.display = "none";
    result.style.display = "none";
    document.getElementById("grid").value = '';
    userChoice.style.display = "block";
    btnAgain.style.display = "none";
    // /Stili
    // Cancello il campo
    field.innerHTML = '';
    // Resetto il numero di bombe
    bombs = [];
    // Rendo il campo cliccabile
    field.style.pointerEvents = "auto";
}
); 

// Individuo il bottone per rigiocare
var btnAgain = document.getElementById('playAgain');
// assegno evento click al bottone
btnAgain.addEventListener('click',
    function() {
        // Stili
        btnReset.style.display = "none";
        error.style.display = "none";
        result.style.display = "none";
        result.style.transform = "translate(-50%, -350%)";
        userChoice.style.display = "block";
        field.style.pointerEvents = "auto";
        // /Stili
        // Resetto il numero di bombe e cancello il campo
        bombs = [];
        field.innerHTML = "";
    }
);

// Evento click sugli elementi del campo

var points = 0;
var alreadyClicked = [];
document.getElementById('campo').addEventListener("click",
    function(square) {
        // Se l'id della cella non è nell'array delle bombe e la cella non è stata già cliccata assegno un punto e la coloro
        var bombCheck = parseInt(square.target.id);
        if ( !(bombs.includes(bombCheck) ) && !(alreadyClicked.includes(bombCheck) ) ) {
            square.target.classList.add('safe');
            points++;
            alreadyClicked.push(bombCheck);
            console.log( "sei a ", points, "punti");
        // Se la cella non è una bomba ed è stata già cliccata nessun punto viene assegnato    
        } else if ( !(bombs.includes(bombCheck) ) && (alreadyClicked.includes(bombCheck) ) ){

          // Se la cella ha una bomba viene assegnata una classe che ne cambia il colore ed una che mostra la bomba  
        } else {
            square.target.classList.add('bomb','exploded');
            // Mostro le bombe inesplose nelle celle non cliccate
            var fieldChildren = field.children;
            for (var i = 0; i < fieldChildren.length; i++) {
                var childId = parseInt(fieldChildren[i].id);
                if ( bombs.includes(childId) ) {
                    fieldChildren[i].classList.add('bomb');
                }
            }
            // Stili 
            btnReset.style.visibility = "hidden";
            victory.style.display = "none";
            loss.style.display = "block";
            btnAgain.style.display = "inline-block";
            scoreboard.innerHTML = "Punteggio: " + points;
            result.style.display = "block";
            setTimeout(() => {  result.style.transform = "translate(-50%, -50%)"; }, 100);
            // /Stili
            // Reset variabili, blocco click
            bombs = [];
            points = 0;
            alreadyClicked = [];
            field.style.pointerEvents = "none";
    }
    // Se il punteggio massimo è uguale al totale delle celle senza bombe
    if ( points == safeCells) {
        // Mostro le bombe inesplose
        var fieldChildren = field.children;
        for (var i = 0; i < fieldChildren.length; i++) {
            var childId = parseInt(fieldChildren[i].id);
            if ( bombs.includes(childId) ) {
                fieldChildren[i].classList.add('bomb');
            }
        }
        // Stili
        field.style.pointerEvents = "none";
        victory.style.display = "block";
        btnReset.style.visibility = "hidden";
        btnAgain.style.display = "inline-block";
        scoreboard.innerHTML = points + (" Punti");
        result.style.display = "block";
        setTimeout(() => {  result.style.transform = "translate(-50%, -50%)"; }, 1000);
        // Reset variabili
        alreadyClicked = [];
        bombs = [];
        points = 0;
    }
}
);

