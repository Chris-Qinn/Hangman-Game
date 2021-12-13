// Array of random word Objects
const words = [
    {word: "China", hint: "The category is: country."},
    {word: "United States", hint: "The category is: country."},
    {word: "Canada", hint: "The category is: country."},
    {word: "Russia", hint: "The category is: country."},
    {word: "Spain", hint: "The category is: country."},
    {word: "Apple", hint: "The category is: fruit."},
    {word: "Banana", hint: "The category is: fruit."},
    {word: "Pear", hint: "The category is: fruit."},
    {word: "Orange", hint: "The category is: fruit."},
    {word: "Watermelon", hint: "The category is: fruit."},
    {word: "Giraffe", hint: "The category is: animal."},
    {word: "Elephant", hint: "The category is: animal."},
    {word: "Orangutan", hint: "The category is: animal."},
    {word: "Alligator", hint: "The category is: animal."},
    {word: "Snake", hint: "The category is: animal."},
    {word: "Bellsprout", hint: "The category is: Pokémon."},
    {word: "Gyrados", hint: "The category is: Pokémon."},
    {word: "Blastoise", hint: "The category is: Pokémon."},
    {word: "Cyndaquil", hint: "The category is: Pokémon."},
    {word: "Dragonite", hint: "The category is: Pokémon."},
    {word: "Supercalifragilisticexpialidocious", hint: "The category is: ???."},
];

// Graphical logo for the header (javascript animation done with requestAnimationFrame)
const repeatedImage = document.createElement("img");
repeatedImage.setAttribute("id", "hangImages");
let path = "hangmanImages/hanging1.png";
repeatedImage.src = path;
let currentImageNumber = 1;
document.getElementsByClassName("main")[0].appendChild(repeatedImage);

setTimeout(function(){
    requestAnimationFrame(imageChange);
}, 600);

// Javascript Animation with requestAnimationFrame
function imageChange() {
    path = "hangmanImages/hanging" + currentImageNumber + ".png";
    repeatedImage.src = path;
    currentImageNumber++;

    if (currentImageNumber == 8) {
        currentImageNumber = 1;
    }

    setTimeout(function(){
        requestAnimationFrame(imageChange);
    }, 600);
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Graphical Display
const hangImage = document.getElementsByClassName("hangmanImage")[0];

// Text Display
const gameDisplay = document.getElementsByClassName("gameDisplay")[0];

// Keyboard Display
const keyboard = document.getElementsByClassName("keyboard")[0];

// Generate a random word, with a hint
const randomWord = Math.floor(Math.random() * words.length);
const theWord = words[randomWord].word;
const wordHint = words[randomWord].hint;
console.log(theWord);

// Array of characters corresponding to the random word
const wordArray = [];

// Modal Generation for losing and winning
const modal = document.getElementById("loser");
const winner = document.getElementById("winner");
const span = document.getElementsByClassName("playAgain")[0];
const span1 = document.getElementsByClassName("playAgain")[1];

// When "Play Again" is clicked, reload the page (for both winning and losing modal)
span.onclick = function() {
    window.location.reload();
}
span1.onclick = function() {
    window.location.reload();
}

// Hangman graphical display for guessing letters
const hangmanGameImage = document.createElement("img");
hangmanGameImage.setAttribute("id", "gameImage");
let imgPath = "hangmanImages/hang0.png";
let imgcounter = 0;
hangmanGameImage.src = imgPath;
hangImage.appendChild(hangmanGameImage);

// Setup the text values for dispalying results
const doesNotExist = document.createElement('span');
doesNotExist.innerHTML = "Choose a letter.";
doesNotExist.setAttribute("id", "doesLetterExist");

let lives = document.createElement('span');
let lifeCounter = 6;
lives.innerHTML = lifeCounter + " guesses left. ";
lives.setAttribute("id", "lifeCounter");

const showHint = document.createElement('button');
showHint.innerHTML = "Show Hint";
showHint.setAttribute("id", "showHint");
showHint.setAttribute("onclick", "revealHint()");

const hint = document.createElement('span');
hint.setAttribute("id", "hintText");
hint.innerHTML = wordHint;
hint.style.display = 'none';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Create the ul and li elements for word-characters
const guess = document.createElement("ul");
guess.setAttribute("id", "guessingArea");

// Main functionality is here. Populates the keyboard and calls upon different functions when a key is pressed
for (let i = 65; i <= 90; i++) {
    // populate via ASCII 
    let c = String.fromCharCode(i);
    const letter = document.createElement("button");
    letter.innerHTML = c;
    if (i == 78) {
        keyboard.appendChild(document.createElement("br"));
    }
    letter.setAttribute("class", "letterButtons");

    // When a letter is clicked
    letter.addEventListener("click", function() {

        // disable the button
        letter.setAttribute("disabled", true);
        letter.style.backgroundColor = "grey";

        // if letter exists
        if (theWord.toLowerCase().includes(letter.innerHTML.toLowerCase())) {
            console.log(letter.innerHTML); 
            letterExists(letter.innerHTML.toLowerCase());
            doesNotExist.innerHTML = "👍";
            checkWin();
        } else {
            doesNotExist.innerHTML = "Wrong Guess! ";
            lifeCounter--;
            imgcounter++;
            hangmanGameImage.src = "hangmanImages/hang" + imgcounter + ".png";
            lives.innerHTML = lifeCounter + " guesses left. ";
            gameOver(lifeCounter);
        }
    });
    keyboard.appendChild(letter);
}

// Populate the unordered list with underscores corresponding to number of letters in a word
for (let i = 0; i < theWord.length; i++) {
    const underscores = document.createElement("li");
    underscores.innerHTML = "_";
    if (theWord.charAt(i) == " ") {
        underscores.innerHTML = " ";
    }
    guess.appendChild(underscores);
    wordArray.push(theWord.charAt(i));
    underscores.setAttribute("class", "underscores");
    underscores.setAttribute("id", "letter" + i);
}

// Text area for if a letter is there, how many guesses left, and hints
const guessingArea = document.createElement('div');
guessingArea.setAttribute("id", "guessingText");
guessingArea.appendChild(doesNotExist);
guessingArea.appendChild(lives);
guessingArea.appendChild(showHint);
guessingArea.appendChild(hint);
gameDisplay.appendChild(guess);
gameDisplay.appendChild(guessingArea);

// Function that tests if a letter clicked exists in a word
function letterExists(letter) {
    let indices = [];
    for(let i = 0; i < theWord.length; i++) {
        if (theWord.charAt(i).toLowerCase() == letter) {
            indices.push(i);
        }
    }
    replaceUnderscore(indices, letter);
}

// Function that replaces an underscore with the clicked letter, if exists
function replaceUnderscore(indices, letter) {
    for (const index of indices) {
        const replacement = document.getElementById("letter" + index);
        replacement.innerHTML = letter;
    }
}

// Function that shows hint and hides the button when clicked
function revealHint() {
    hint.style.display = 'initial';
    showHint.style.display = 'none';
}

// Function to check if user has exceeded 6 guesses
function gameOver(lifeCounter) {
    if (lifeCounter == 0) {
        modal.style.display = "block";
    }
}

// Check if the word has been completely guessed or not
function checkWin() {
    const endWord = document.getElementsByClassName('underscores');
    let underscoreCount = 0;
    for (const blank of endWord) {
        if(blank.innerHTML == '_') {
            underscoreCount++;
        }
    }
    
    if (underscoreCount == 0) {
        winner.style.display = "block";
    }
}

