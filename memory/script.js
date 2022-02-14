const grid = document.querySelector("#grid"); //Recupero la griglia da JS

const errorCounter = document.querySelector("#error"); //Recupero il mio span error

const cards = ["alien", "bug", "duck", "rocket", "spaceship", "tiktac"]; //Array con tutte le carte

const deck = [...cards, ...cards]; //Creo un array mazzo che contiene due volte l'array cards di prima

let pick = []; //Array di servizio
let errors = 0; //Numero errori iniziale

deck.sort(function() {  //Genero un numero casuale positivo o negativo che mi ordina in maniera casuale gli elementi dell'array deck
  return 0.5 - Math.random();
})

for (let i = 0; i < deck.length; i++) {

  const card = document.createElement("div"); //Creo un elemento card, che corrisponde a una singola carta
  const cardName = deck[i]; //Prendo l'elemento dall'array deck
  card.classList.add("card"); //Assegno alla singola carta la classe card creata nel css
  card.setAttribute("data-name", cardName); //Assegno cardName al mio data attribute (ovvero data-name="duck" data-name="alien" ecc..)
  card.addEventListener("click", flipCard);
  grid.appendChild(card); //Creiamo elementi alla fine dell'ID grid, in questo caso 12 (deck.length = cards * 2)

}

errorCounter.innerText = errors; //Vado a scrivere all'interno dello span il numero di errori

function flipCard(event) {
  const card = event.target; //Tramite questa proprietà vado a ricevere in output la carta che ho cliccato

  if (card.classList.contains("flipped")) { //Se la carta contiene la classe flipped, interrompi la funzione, in modo che io non possa più cliccare su quella carta
    return;
  }

  card.classList.add(card.getAttribute("data-name"), "flipped"); //Recupero il data-name e lo assegno come classe alla carta cliccata. Inoltre creo un'altra classe flipped
  pick.push(card); //Aggiungo all'array vuoto la carta di volta in volta. Sostanzialmente tiene conto delle carte che ho estratto

  if (pick.length === 2) {
    checkForMatch();
  }

}

function checkForMatch () { //Verifica se le carte sono uguali e in caso contrario rigirarle
  const card1 = pick[0]; //Recupero la prima carta
  const card2 = pick[1]; //Recupero la seconda carta
  const card1Name = card1.getAttribute("data-name"); //Recupero il nome della prima carta
  const card2Name = card2.getAttribute("data-name"); //Recupero il nome della seconda carta

  if (card1Name === card2Name) {
    checkForWin();
    console.log("Win");
  } else {
    setTimeout(function() { //Imposto un piccolo intervallo di tempo per permetetre di vedere la seconda carta girata
      card1.classList.remove(card1Name, "flipped"); //Rimuovo il data-name e la classe flipped, in sostanza rigiro la carta
      card2.classList.remove(card2Name, "flipped"); //Rimuovo il data-name e la classe flipped, in sostanza rigiro la carta
      errors++; //Incremento il num di errori ogni volta che sbaglio la coppia
      errorCounter.innerText = errors; //Stampo a schermo il numero di errori corrente
    }, 500);
  }

  pick = []; //Svuoto l'array
}

function checkForWin() {
  const flippedCards = document.querySelectorAll(".flipped"); //Lista delle carte girate

  if (flippedCards.length === deck.length) { //Confronto il num di carte girate con il num di carte totali nel deck
    showAlert("Hai vinto!");
  }

}

//Tasto rigioca
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  window.location.reload(); //Ricarico la pagina
});
