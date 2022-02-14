//Conservo la griglia nella variabile grid
const grid = document.querySelector("#grid");

//Conservo la misura della griglia
const size = 14;
const rxc = size * size; //Righe X colonne

//Creo un array vuoto che mi servirà dopo per manipolare la posizione degli alieni
const cells = [];

//Creiamo una formazione di alieni dentro un array
const aliens =
  [0,1,2,3,4,5,6,7,8,9,
  14,15,16,17,18,19,20,21,22,23,
  28,29,30,31,32,33,34,35,36,37];

//Array di alieni uccisi
const aliensKilled = [];

//Variabile che mi serve per interrompere il movimento degli alieni
let alienMoveInterval = null;

//Scrivo un ciclo FOR per creare i 225 div che conterranno gli alieni
for (let i=0; i < rxc; i++) {
  const cell = document.createElement("div");
  cells.push(cell);
  grid.appendChild(cell);
}

//Funzione che verifica la vittoria del giocatore
function checkForHumanWin() {
  if (aliensKilled.length === aliens.length) {
    clearInterval(alienMoveInterval);
    showAlert("HUMAN WINS!");
  }
}

//Funzione che verifica la vittoria degli alieni
function checkForAlienWin() {
  //Interrogo tutti gli alieni
  for (let i=0; i < aliens.length; i++) {
    if ( !aliensKilled.includes(aliens[i])  && aliens[i] >= spaceshipIndex) {
        clearInterval(alienMoveInterval);
        showAlert("ALIEN WINS!"); }
      }
  }

//Funzione che ha lo scopo di disegnare gli alieni nella griglia
function drawAliens() {
  for (let i=0; i < aliens.length; i++) {
    if (!aliensKilled.includes(i)) {
      cells[aliens[i]].classList.add("alien");
    }
  }
}

//Funzione che rimuove gli alieni
function removeAliens() {
  for (let i=0; i < aliens.length; i++) {
    cells[aliens[i]].classList.remove("alien");
  }
}

//Passi che devono fare gli alieni
let step = 1;

//Direzione del movimento
let direction = "forward";

//Funzione che fa avanzare di una posizione gli alieni
function moveAliens() {
  //Calcolo il limite sinistro della griglia
  const leftEdge = aliens[0] % size === 0; //true/false
  //Calcolo il limite destro della griglia
  const rightEdge = aliens[aliens.length-1] % size === size - 1; //true/false

  removeAliens();

  //Quando gli alieni si muovono verso destra
  if (direction === "forward" && rightEdge) {
    for (let i=0; i < aliens.length; i++) {
      //Scalare di una riga
      aliens[i] = aliens[i] + size + 1;
      //Invertire il senso di marcia
      step = -1;
      //Cambiare direzione
      direction = "backward";
    }
  }

  //Quando si muovono verso sinistra
  if (direction === "backward" && leftEdge) {
    for (let i=0; i < aliens.length; i++) {
      //Scalare di una riga
      aliens[i] = aliens[i] + size - 1;
      //Invertire il senso di marcia
      step = 1;
      //Cambiare direzione
      direction = "forward";
    }
  }

  for (let i=0; i < aliens.length; i++) {
    aliens[i] = aliens[i] + step;
  }

  checkForAlienWin();
  drawAliens();

}

drawAliens();

//Creo un setInterval che fa muovere gli alieni ogni 0,5s
alienMoveInterval = setInterval(moveAliens, 300);


//Aggiungo la navicella spaziale a schermo
let spaceshipIndex = 188;
cells[spaceshipIndex].classList.add("spaceship");

//Funzione per il movimento della navicella
function moveSpaceship(event) {

  //Individuo il limite sinistro e quello destro della griglia
  const leftEdge = spaceshipIndex % size === 0;
  const rightEdge = spaceshipIndex % size === size - 1;

  cells[spaceshipIndex].classList.remove("spaceship");

  //Se il tasto premuto è la freccia sinistra e non ho raggiunto il bordo
  if (event.code === "ArrowLeft" && !leftEdge) {
    spaceshipIndex--;
  }

  //Se il tasto premuto è la freccia destra e non ho raggiunto il bordo
  else if (event.code === "ArrowRight" && !rightEdge) {
    spaceshipIndex++;
  }

  cells[spaceshipIndex].classList.add("spaceship");

}

//Event Listener che ascolta la pressione dei tasti freccia
document.addEventListener("keydown", moveSpaceship);


//Funzione che serve per far sparare la navicella
function shoot(event) {
  //Se il tasto prevuto non è space stoppa la funzione
  if (event.code !== "Space") return;

  //Il punto da cui parte il laser è lo stesso della navicella
  let laserIndex = spaceshipIndex;

  //Assegno alla funzione setInterval una variabile
  let laserInterval = null;

  //Funzione per movimento del laser
  function moveLaser() {
    cells[laserIndex].classList.remove("laser");
    laserIndex = laserIndex - size;

    //Interrompi il laser all'uscita dalla griglia
    if (laserIndex < 0) {
      clearInterval(laserInterval);
      return;
    }

    //Verifica impatto tra laser e alieno
    if (cells[laserIndex].classList.contains("alien")) {

      clearInterval(laserInterval);

      //Rimuovo prima le classi alieno e laser e aggiungo quella boom
      cells[laserIndex].classList.remove("alien", "laser");
      cells[laserIndex].classList.add("boom");
      setTimeout(function(){
        cells[laserIndex].classList.remove("boom");
      }, 200);

      //Alieno ucciso
      const killed = aliens.indexOf(laserIndex);
      aliensKilled.push(killed);

      checkForHumanWin();

      return;
    }

    cells[laserIndex].classList.add("laser");
  }

  //Il laser viene sparato ogni 0,2s
  laserInterval = setInterval(moveLaser, 200);

}

//Event Listener che ascolta la pressione del tasto SPACE
document.addEventListener("keydown", shoot);

//Tasto rigioca
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  window.location.reload(); //Ricarico la pagina
});
