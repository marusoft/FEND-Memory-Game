/*
 * Create a list that holds all cards
 * cards array
 */
 let card = document.querySelectorAll(".card");
 let cards = [...card];

 // deck of all cards in game
const deck = document.querySelector("#card-deck");

 // number of moves a user has made
 let moves = 0;
 let counter = document.querySelector(".moves");

 // star Icons 
 const stars = document.querySelectorAll(".fa-star");

//variable of matchedCards
 let matchedCard = document.getElementsByClassName("match");

 // stars List
 let starsList = document.querySelectorAll(".stars li");

// close icon in modal
 let closeIcon = document.querySelector(".close");

 // declare modal
 let modal = document.querySelector("#popupOne");

  // array for opened cards
 var openedCards = [];



// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// shuffles cards when page is refreshed or load
document.body.onload = startGame();

// function to start a new game
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#DAA520";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// toggles open and show class to display card
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// add the card to a *list* of "open" cards and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


//for when cards match
let matched = () => {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

//for when cards don't match
let unmatched = () => {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event" , "unmatched");
        enable();
        openedCards = [];
    },1100);
}

//disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// star rating
let moveCounter = () =>{
    let second = 0, minute = 0; hour = 0;
    moves++;
    counter.innerHTML = moves;
    //start timer on first move
    if(moves === 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

// setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//game timer

var timer = document.querySelector(".timer");
var interval;
let startTimer = () => {
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second === 60){
            minute++;
            second = 0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// congratulations function when all cards match, show modal and moves, time and rating
let congratulations = () => {
    if (matchedCard.length === 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        let starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("totalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalPeriod").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


//  close Icon on modal
let closeModal = () =>{
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// function for user to play Again 
let replay = () => {
    modal.classList.remove("show");
    startGame();
}

 // loop through each card and add event listeners
for( let i = 0; i < cards.length; i++){
	card = cards[i];
 	card.addEventListener("click", displayCard);
 	card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
 };
