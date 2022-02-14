//Creo un riferimento road a tutti i div contenuti in grid
const road = document.querySelectorAll("#grid > div");

const scoreEl = document.querySelector("#score");
//Creo un riferimento allo span dello Score

//Debug
// for (let i = 0; i < road.length; i++) {
//   road[i].innerText = i;
// }

//Creo un riferimento al div contenente la papera
const duckIndex = 1;
const duck = road[duckIndex];
duck.classList.add("duck");

//Imposto la velocità di movimento delle piante
let speed = 200;

//Imposto il punteggio iniziale
let score = 0;

//Funzione per aggiungere le piante
function addPlant() {

  //Creo un riferimento al div contenente la pianta, che di partenza sarà il 9, ovvero l'ultimo
  let currentPlantIndex = road.length - 1; //9
  road[currentPlantIndex].classList.add("plant");

  //Sposto ogni secondo la pianta dall'ultimo div a quello precedente
  const plantInterval = setInterval(function(){
    //Aumenta lo score col passare del tempo
    score++;
    scoreEl.innerText = score;

    //Ogni volta che score incontra un multiplo di 50, speed aumenta
    if (score % 50 === 0) {
      speed = speed -20;
    }

    road[currentPlantIndex].classList.remove("plant");
    currentPlantIndex--;

    if (currentPlantIndex < 0) {
      clearInterval(plantInterval);
      addPlant();
      return;
    }

    if (
      currentPlantIndex === duckIndex
      && !road[currentPlantIndex].classList.contains("duck-jump")
    ) {
      showAlert("CRASH!");
      clearInterval(plantInterval);
      road[currentPlantIndex].classList.remove("duck");
      road[currentPlantIndex].classList.add("plant");
      return;
    }

    road[currentPlantIndex].classList.add("plant");
  }, speed);
}

addPlant();

//Creo la funzione jump per far saltare la papera
function jump(event) {
  if (event.code === "Space" && !event.repeat) {
    duck.classList.add("duck-jump")
    setTimeout(function(){
      duck.classList.remove("duck-jump");
    }, 300);
  }
}

//Aggiungo un addEventListener che scolta la pressione del tasto
document.addEventListener("keydown", jump);

//Tasto rigioca
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  window.location.reload(); //Ricarico la pagina
});
