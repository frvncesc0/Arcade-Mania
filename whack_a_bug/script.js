//Inseriamo il punteggio iniziale
const scoreDisplay = document.querySelector("#score-display");
let score = 0;
scoreDisplay.innerText = score;

//Inseriamo il valore del tempo iniziale
const timerDisplay = document.querySelector("#timer-display");
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

//Inseriamo il bug in una cella via JS
const cells = document.querySelectorAll(".cell");

//Diamo un valore di velocità iniziale
let bugSpeed = 800;

//Logica per randomizzare il bug in una cella
function randomBug() {

  //DA FARE: pulire tutte le celle prima di randomizzarne un'altra
  removeBug();

  //Aumentiamo la difficoltà se il giocatore è troppo bravo
  if (score === 20) {
    bugSpeed = bugSpeed - 300;
  }

  //Randomizzo una cella a caso
  const randomNumber = Math.floor(Math.random() * cells.length)
  const cell = cells[randomNumber];
  cell.classList.add("bug");
}

const bugMovement = setInterval(randomBug, 800);

function removeBug() {
  for (let i=0; i < cells.length; i++) {
    const cellToClean = cells[i];
    cellToClean.classList.remove("bug");
  }
}

//Diamo modo all'utente di colpire il bug
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener("click", function(){
    //Verifico se la cella ha un bug
    if(cell.classList.contains("bug")) {
      //Incremento il punteggio e lo stampo a schermo
      score++;
      scoreDisplay.innerText = score;

      //Associo l'immagine della classe splat al bug colpito
      cell.classList.remove("bug");
      cell.classList.add("splat");

      //Rimuovo lo splat dalla cella sporca
      setTimeout(function(){
        cell.classList.remove("splat");
      }, 200);
    }
  });
}

//Andiamo a impostare il countdown
const timer = setInterval(countDown, 1000);

function countDown () {
  timeLeft--;
  timerDisplay.innerText = timeLeft;

  if(timeLeft === 0) {
    clearInterval(timer);
    clearInterval(bugMovement);
    removeBug();

    showAlert(`Game Over! Punteggio: ${score}`);
  }
}

//Tasto rigioca
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  window.location.reload(); //Ricarico la pagina
});
