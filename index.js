let deckId = ``;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById(`cards`);
//we make cardsContainer a constant so that in our drawCards function
//we can shorten the code from
//document.getElementById(`cards`).children[0].innerHTML TO
//cardsContainer.children[0].innerHTML

const newDeckBtn = document.getElementById(`new-deck`);
const drawCardsBtn = document.getElementById(`draw-cards`);
//we make these constants to shorten the code of
//document.getElementById(`new-deck`).addEventListener(`click`, handleClick);
//TO newDeckBtn.addEventListener(`click`, handleClick);
//same logic applies to the drawCardsBtn

const header = document.getElementById(`header`);
const remainingText = document.getElementById(`remaining`);
const computerScoreEl = document.getElementById(`computer-score`);
const myScoreEl = document.getElementById(`my-score`);

drawCardsBtn.addEventListener("click", drawCards);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      deckId = data.deck_id;
      console.log(deckId);
    });
}

//scrimba defines deckId as deck_id
//so to save the deckId we have to make an empty deckId local variable
//then instead of just console logging what we fetch from Scrimba
//we make our deckId variable = to the deck id from Scrimba
//which is data.deck_id

newDeckBtn.addEventListener(`click`, handleClick);

drawCardsBtn.addEventListener("click", drawCards);

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      cardsContainer.children[0].innerHTML = `
      <img src=${data.cards[0].image} class="card" />
      `;
      cardsContainer.children[1].innerHTML = `
          <img src=${data.cards[1].image} class="card" />
      `;
      //since the children of cards is card slot (based on the html divs),
      //to make each card act as a different one we use .children with the
      //id of 0 and 1 and then make the image source of that based on the innerHTML
      //this places them within our border
      console.log(myScore);
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      console.log(myScore);
      header.textContent = winnerText;
      //we put our determine card winner funtion here using the
      //data from the cards
      //our function is based on the index value which is based on
      //our array which is explained in detail below
      //header.text content will show who won based on the function

      //here we use gthe data.remaining part of our fetched api to return the amount of
      //remaining cards which is received from the data included in the api
      if (data.remaining === 0) {
        drawCardsBtn.disabled = true;
        determineTrueWinner();
      }
    });
}

//here we added a draw cards option NOTE THAT FOR THE DECK ID
//WE MADE A TEMPLATE LITERAL AND USED THE VARIABLE FROM
//BEFORE, deckID

//so to add images for the cards we added a div to our html
//then we got that id and for its innerHTML we set it equal to
//the image source for data.cards because that array holds the image property for the cards
//since we only need 2 images to represent 2 cards we just use the image for position [0]
//and the image for position [1]. We add a .image and make the whole thing a template literal
//to make it actually be images indicative of their position

/**
 * Challenge:
 *
 * Keep score! Every time the computer wins a hand, add a point to
 * the computer's score. Do the same for every time you win a hand.
 * If it's a war, no points are awarded to either player. If it's
 * a war (same card values), no one is awarded points.
 *
 * Display the computer's score above the top card, display your
 * own score BELOW the bottom card.
 *
 * Track the scores in a global variable defined at the top of this file
 *
 * Add to the global scores inside the `determinCardWinner` function below.
 */

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  //here we make the cards an array in our determineCardWinner function
  //to determine the values of the cards we base it off the index
  //since the index gets higher based on the more items we list,
  //its an easy way to determine the values
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer score is ${computerScore}`;
    return `Computer wins!`;
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++;
    console.log(myScore);
    myScoreEl.textContent = `My score is ${myScore}`;
    return `You win!`;
  } else {
    return `War!`;
  }
}
//we use the header HTML text content in h2 to display who wins
//we make a computer and player score variable that represents
//our element which will display our text content
//and we also make a computer and player score value that represents
//the values for each

function determineTrueWinner() {
  if (computerScore > myScore) {
    header.textContent = `The Computer Wins the Game!`;
  } else if (computerScore < myScore) {
    header.textContent = `You Win the Game!`;
  } else {
    header.textContent = `It's a tie game :(`;
  }
}
//we make a true winner function where if there's no cards left
//we declare a real winner
//since this function falls under our already created
//if data.remaining===0 on the bottom of our draw cards
//we dont need to say if (data.remaining===0 && computerScore>myScore)
//because it already falls under the data.remaining===0
