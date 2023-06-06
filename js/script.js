// definizione della funzione che crea la griglia di gioco
function createNewGame(){
    const grid = document.getElementById('grid')

    // recupero il livello di difficolta'
    const difficulty = parseInt(document.getElementById('difficulty').value);
    
    // svuoto la griglia
    grid.innerHTML = '';

    // invoco la funzione create cells per creare le singole caselle di gioco
    createCells(difficulty);
}

// definizione della funzione che crea le caselle della griglia
function createCells(level){
    let cellsNumber;
    switch(level){
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

    // genero le caselle da scrivere nella griglia
    for(let i = 0; i < cellsNumber; i++){
        const square = document.createElement('div');

        let cellsPerRow = Math.sqrt(cellsNumber);
        console.log(cellsPerRow);
        
        square.classList.add('square');
        square.style.width = `calc(100% / ${cellsPerRow})`;
        square.style.height = square.style.width;
        square.innerText = i + 1;

        square.addEventListener('click', function(){
            this.classList.add('clicked');
            console.log(this.innerText);
        })

        grid.append(square);
    }
}

const button = document.getElementById('play')

button.addEventListener('click', function(){

    // al click del pulsante invoco la funzione che crea la griglia di gioco
    createNewGame();
})