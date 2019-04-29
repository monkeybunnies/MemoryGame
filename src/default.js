var deck = ["images/d1.png", "images/d1.png", "images/d2.png", "images/d2.png", "images/d3.png",
"images/d3.png", "images/d4.png", "images/d4.png", "images/d5.png", "images/d5.png", "images/d6.png",
"images/d6.png", "images/d7.png", "images/d7.png", "images/d8.png", "images/d8.png"];
var back = "images/tile.png";
var cards = shuffle(deck);
var cardsMatched = 0;
var cardOpened = undefined;
var canOpen = true;
var gameStarted = false;
var gameEnded = false;
var timeout = 120;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
function showCard(id) {
    if (!gameStarted) {
        gameStarted = true;
        var timer = document.getElementById("timer");
        timer.innerHTML = "<h2>Time Remaining: <span id=\"counter\"></span> minutes!</h2>";
        var counter = document.getElementById("counter");
        startTimer(timeout, counter);
    }
    if (canOpen === true && document.getElementById(id).getAttribute("src") !== cards[Number(id)]) {
        document.getElementById(id).src = cards[Number(id)];

        // No matching target card has been opened, set the card to the matching target
        if (!cardOpened) {
            cardOpened = {
                id: id,
                card: cards[Number(id)],
            };
        } else if (cardOpened.card !== cards[Number(id)]) {
            // When two cards didn't match, wait 2 seconds before can open other cards
            canOpen = false;
            setTimeout(function () {
                // After 2 seconds, flip both cards back
                document.getElementById(id).src = back;
                document.getElementById(cardOpened.id).src = back;
                playResetSound();
                cardOpened = undefined;
                canOpen = true;
            }, 2000);
        } else {
            // If two cards matched, increment cards matched by 2
            // Reset cardOpened to undefined
            playMatchingSound();
            cardsMatched += 2;
            cardOpened = undefined;
            if (cardsMatched === 16) {
                gameEnded = true;
                // Display winning message in "header"
                var header = document.getElementById("header");
                header.class = "w3-container w3-pale-green"
                header.innerHTML = "<h2>Yay! YOU WON!!</h2>";
                // Display winning gif in "main"
                var main = document.getElementById("main");
                main.innerHTML = "<img src=\"https://media.giphy.com/media/gpZsmrh1eXUXK/giphy.gif\" class=\"w3-border w3-padding\">";
                var timer = document.getElementById("timer");
                timer.innerHTML = "";
            }
        }
    }
}
function playMatchingSound() {
    document.getElementById("win").play();
}
function playResetSound() {
    document.getElementById("lose").play();
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        if (!gameEnded) {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            timer = timer - 1;
            if (timer > 0 && timer < 10) {
                display.style = "color:red";
            } else if (timer < 0) {
                gameEnded = true;
                timer = 0;
                // Display lose message in "header"
                var header = document.getElementById("header");
                header.class = "w3-container w3-pale-green"
                header.innerHTML = "<h2>YOU LOSE, TRY AGAIN!!</h2>";
                // Display lose gif in "main"
                var main = document.getElementById("main");
                main.innerHTML = "<img src=\"https://media.giphy.com/media/3ov9jEOtlJ3A2jPB6w/giphy.gif\" class=\"w3-border w3-padding\">";
                var timerDOM = document.getElementById("timer");
                timerDOM.innerHTML = "";
            }
        }
    }, 1000);
}
