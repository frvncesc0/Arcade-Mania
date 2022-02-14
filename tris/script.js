const cells = document.querySelectorAll(".cell"); //Assegno tutte le celle a una variabile

let turn = 0; //Variabile del turno che parte da 0
const cellSigns = []; //Segni delle celle

for (let i = 0; i < cells.length; i++) {
    //Ciclo for che a ogni turno aggiunge una X o una O fino a riempire le celle
    const cell = cells[i];

    cell.addEventListener("click", function(){ //Ogni cella ascolta l'evento del click ed esegue la funzione

      if (cellSigns[i]) { //Non scrivere una condizione significa verificare se qualcosa esiste in quella posizione
        return; //Interrompo la funzione
      }

      turn++; //Incremento del turno

      let sign; //Variabile del segno X oppure O
      if (turn % 2 === 0) { //Se il turno è pari scrive O, se è dispari scrivo la X
        sign = "O";
      } else {
        sign = "X";
      }

      cell.innerText = sign; //Vado a scrivere il segno all'interno della cella cliccata
      cellSigns[i] = sign; //Assegniamo alla posizione dell'array corrispondente alla cella i il segno X oppure O

      let hasWon = checkVictory(); //La variabile riceve un vero/falso dalla funzione

      if (hasWon) { //Caso di vittoria
        showAlert(`${sign} ha vinto!`);
      } else if (turn === 9) { //Caso di pareggio
        showAlert(`Pareggio!`);
      }
  });

}

function checkVictory() {
  const winningCombination = [ //Creo un array in cui elenco tutte le combinazioni vincenti
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0; i < winningCombination.length; i++) { //Controllo tutte le combinazioni
    const combination = winningCombination[i]; //Prendo la singola combinazione

    const a = combination[0]; //Primo numero della combinazione
    const b = combination[1]; //Secondo numero della combinazione
    const c = combination[2]; //Terzo numero della combinazione

    if (cellSigns[a] && cellSigns[a] === cellSigns[b] && cellSigns[b] === cellSigns[c]) { //Se la prima cella è piena, controlla se i numeri delle combinazioni sono uguali
      return true; //Il valore di checkVictory() lo diamo alla variabile hasWon
    }
  }

  return false;
}

function showAlert(message) {
  const gameArea = document.querySelector(".game-area"); //Recupero il div game-area
  const alertMessage =
    `<div class="game-alert">
        <div class="game-alert-message">
          ${message}
        </div>
      </div>
        `;

gameArea.innerHTML = gameArea.innerHTML + alertMessage; //Aggiungo a tutto quello che c'è già scritto in HTML nel div game-area il codice di alertMessage
}

//Tasto rigioca
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  window.location.reload(); //Ricarico la pagina
});
