// definizione della funzione che genera un numero casuale
function generateRundomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// definizione della funzione che mi riempie l'array delle bombe
function fillArrayBombs(array_bombs, max){
    
    // variabile di controllo
    let check = false;
    let random_number;

    // se la variabile di controllo e' false 
    while(check === false){
        // genero il numero casuale compreso tra 1 e max (valore del numero di caselle generate per il livello selezionato)
        random_number = generateRundomNumber(1, max);
        
        // controllo se l'array delle bombe non include il numero
        if(!array_bombs.includes(random_number)){
            // se l'array non include il numero, setto la variabile di controllo a true per uscire dal while
            check = true;
        }
    }

    return random_number

}

// definizione della funzione che crea la griglia di gioco
function createNewGame(){
    const grid = document.getElementById('grid')
    const div_message = document.getElementById('message');
    const arrayBombs = [];

    // recupero il livello di difficolta'
    const difficulty = parseInt(document.getElementById('difficulty').value);
    
    // svuoto la griglia
    grid.innerHTML = '';
    div_message.innerText = '';
    
    let cellsNumber;
    switch(difficulty){
        case 1:
            cellsNumber = 100;
            break;
        case 2:
            cellsNumber = 81;
            break;
        case 3:
            cellsNumber = 49;
            break;
    }

    // invoco la funzione fillArrayBombs per riempire l'array con le bombe
    for(let i=0; i<16; i++){
        let number = fillArrayBombs(arrayBombs, cellsNumber)
        arrayBombs.push(number);
    }
    console.log(arrayBombs)
    

    // invoco la funzione create cells per creare le singole caselle di gioco
    createCells(cellsNumber, arrayBombs);
}

// definizione della funzione che crea le caselle della griglia
function createCells(cells, arrayBombs){
    // dichiaro la variabile di controllo gameOver cosi' da poterla utilizzare all'interno del for senza incorrere in problemi
    let gameOver = false; 

    // numero di caselle non contenenti bombe cliccate
    let clickForWin = 0;

    // genero le caselle da scrivere nella griglia
    for(let i = 0; i < cells; i++){
        const square = document.createElement('div');

        let cellsPerRow = Math.sqrt(cells);
        
        square.classList.add('square');
        square.style.width = `calc(100% / ${cellsPerRow})`;
        square.style.height = square.style.width;

        square.innerText = i + 1;

        square.addEventListener('click', function(){
            // esercizio base
            // this.classList.add('clicked');
            // console.log(this.innerText);
            if(gameOver === false){
                if(!arrayBombs.includes(parseInt(this.innerText))){
                    this.classList.add('clicked');
                    clickForWin++;
                    console.log(clickForWin)
                }
                else{
                    this.classList.add('bomb-finded');
                    gameOver = true;
                    document.getElementById('message').innerText = `Punteggio: ${clickForWin}`
                    // let cells = document.querySelectorAll('.square');
                    // console.log(cells);
                    // for(let i=0; i<cells.length; i++){
                    //     cells[i].style.pointerEvents = 'none';
                    // }
                }
            }
        })

        grid.append(square);
    }
}


const button = document.getElementById('play')

button.addEventListener('click', function(){

    // al click del pulsante invoco la funzione che crea la griglia di gioco
    createNewGame();
})