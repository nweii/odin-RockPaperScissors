// initialize game variables
let playerChoice = 'rock';
let enemyChoice = 'rock';
console.log(`Your choice: ${playerChoice}, Opponent choice: ${enemyChoice}`);

let roundNum = 0;

let playerScore = 0;
let enemyScore = 0;
let clickCount = 0;
console.log(`You: ${playerScore}, Opponent: ${enemyScore}`);

// initialize webpage variables
let roundSign = document.querySelector("#roundSign");

// container for "Rock…Paper…Scissors…Shoot!"
let steps = document.querySelector("#stepItems");

// explanation text for the win/loss outcome.
let whyOutcome = document.querySelector("#whyOutcome");

let playerHand = document.querySelector("#playerHand");
let enemyHand = document.querySelector("#enemyHand");
// the text on the table announcing WIN LOSE or TIE
let winLose = document.querySelector("#winLose");
// the image for the table
let glassImg = document.querySelector("#glassImg");

// the text containing player score, under the table
let scoreLeft = document.querySelector("#scoreLeft");
// the text containing enemy score, under the table
let scoreRight = document.querySelector("#scoreRight");

let instruction = document.querySelector("#instruction");

function isTouch() {
  if ('ontouchstart' in window || navigator.maxTouchPoints) return true;
  else return false;
}

// Detect whether input is touchscreen or mouse and update instruction text accordingly
if (isTouch()) instruction.innerHTML = "Tap anywhere"
else instruction.innerHTML = "Click anywhere";

// the parent element containing the choice buttons
let choices = document.querySelector("#choices");
// each button within choices
let eachChoice = document.querySelectorAll('#choices button');
// the button for proceeding to the next round
let nextBtn = document.querySelector("#nextBtn");

// the final result announcement text on game end.
let final = document.querySelector("#final");

const blankRound = document.querySelector("#blankRound"); // set aside a blank copy of this round for use in newRound()

nextRound(++roundNum);

function nextRound(n) {
  if (n > 1) {
    nextBtn.removeEventListener("click", clickNext);
    nextBtn.classList.add('hidden');
  }
  newRound(n);
  playRound();
}

function newRound(n) {
  console.log(`--- Making newRound(${n})... ---`)

  let roundSection = makeRound(n);

  function makeRound(n) {
    console.log("Building round...");
    // copy new round section from template
    let roundNode = document.getElementById("blankRound").cloneNode(true);
    // name it after the round number
    roundNode.id = `round-${n}`;

    console.log(`...Built new round section #${roundNode.id}:`);
    console.log(roundNode);
    return roundNode;
  }
  // INSERT hidden new round
  document.body.insertBefore(roundSection, choices);
  // RENAME
  suffixChildIds(roundSection, n);

  function suffixChildIds(parent, n) {
    parent.querySelectorAll('*').forEach(function(child) {
      child.id += `-${n}`;
    });
  }
  // SHOW new round
  roundSection.classList.remove("hidden");
  console.log("Added new round section to document.");
  window.scrollTo(0, document.body.scrollHeight);

  // REFRESH variables with new round IDs
  roundSign = document.querySelector(`#roundSign-${n}`);
  steps = document.querySelector(`#stepItems-${n}`);
  stepItems = document.querySelectorAll(`#stepItems-${n} span`);
  whyOutcome = document.querySelector(`#whyOutcome-${n}`);
  playerHand = document.querySelector(`#playerHand-${n}`);
  enemyHand = document.querySelector(`#enemyHand-${n}`);
  winLose = document.querySelector(`#winLose-${n}`);
  glassImg = document.querySelector(`#glassImg-${n}`);
  scoreLeft = document.querySelector(`#scoreLeft-${n}`);
  scoreRight = document.querySelector(`#scoreRight-${n}`);
  instruction = document.querySelector(`#instruction-${n}`);
  // LOAD scoreboard
  scoreLeft.textContent = playerScore;
  scoreRight.textContent = enemyScore;
  console.log("Rigged new variables & Loaded scoreboard.")
  // LOAD Round # banner
  roundSign.textContent = `Round ${n}`;
  console.log(`Updated round sign.`);
}

function playRound() {
  console.log("--- Starting playRound()... ---");
  // GET elements in "Rock…Paper…Scissors…Shoot!"
  let stepItems = document.querySelectorAll(`#stepItems-${roundNum} span`);
  clickCount = 0;
  console.log(`Clicks set to ${clickCount}.`);
  // ADD click increment behavior
  document.addEventListener(isTouch() ? 'touchend' : 'mouseup', addClick);
  function addClick() {
    clickCount++;
    console.log(`${clickCount} clicks`);
  }
  // ADD hand down & chant-lighting behavior
  document.addEventListener(isTouch() ? 'touchstart' : 'mousedown', down);
  // Hands reset on click release
  document.addEventListener(isTouch() ? 'touchend' : 'mouseup', up);

  function down() {
    // ANIMATE both hands downward
    playerHand.classList.add('rotate-12', 'translate-y-2.5');
    enemyHand.classList.add('-rotate-12', 'translate-y-2.5');
    // LIGHT chants one by one
    stepItems[clickCount].classList.remove("opacity-50");
  }

  function up() {
    // ANIMATE hands back upward
    playerHand.classList.remove('rotate-12', 'translate-y-2.5');
    enemyHand.classList.remove('-rotate-12', 'translate-y-2.5');
    // SHOW choices once chanting is done
    if (clickCount >= 3) {
      showChoices();
    }
  }

  function showChoices() {
    // REMOVE chant-related behaviors
    document.removeEventListener(isTouch() ? 'touchstart' : 'mousedown', down);
    document.removeEventListener(isTouch() ? 'touchend' : 'mouseup', addClick);
    document.removeEventListener(isTouch() ? 'touchend' : 'mouseup', up);
    console.log("No more chanting.");
    instruction.classList.add("hidden");

    // ENABLE & SHOW choice-selecting
    eachChoice.forEach(choice => choice.addEventListener("click", choose));
    console.log("Buttons activated.");
    choices.classList.remove("hidden");
    console.log("Choices revealed.");
  }

  function choose(e) {
    // SAVE choice button text as player choice when clicked
    playerChoice = e.target.textContent;
    console.log(`You chose ${playerChoice}`);
    // REMOVE choice-selecting
    choices.classList.add("hidden");
    eachChoice.forEach(choice => choice.removeEventListener("click", choose));
    console.log("Buttons deactivated.");
    // SUBMIT selection
    getOutcome();
  }

  function getOutcome() {
    playerChoice = playerChoice.toLowerCase();
    enemyChoice = getComputerChoice().toLowerCase();
    console.log(`Enemy chose ${enemyChoice}`);

    // UPDATE hand images on table
    switch (playerChoice) {
      case 'rock':
        playerHand.src = "/assets/Player-Rock.png";
        break;
      case 'paper':
        playerHand.src = "/assets/Player-Paper.png";
        break;
      case 'scissors':
        playerHand.src = "/assets/Player-Scissors.png";
        break;
    }

    switch (enemyChoice) {
      case 'rock':
        enemyHand.src = "/assets/Opponent-Rock.png";
        break;
      case 'paper':
        enemyHand.src = "/assets/Opponent-Paper.png";
        break;
      case 'scissors':
        enemyHand.src = "/assets/Opponent-Scissors.png";
        break;
    }

    // DECIDE winner
    // SHOW outcome
    // END round
    if (playerChoice === enemyChoice) {
      whyOutcome.textContent = "Love is love<3";
      endRound('tie');
    } else if (playerChoice === 'rock') {
      if (enemyChoice === 'scissors') {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Rock</span> broke <span class="font-semibold">Scissors</span>';
        endRound('win');
      } else {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Rock</span> covered by <span class="font-semibold">Paper</span>';
        endRound('loss');
      }
    } else if (playerChoice === 'paper') {
      if (enemyChoice === 'rock') {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Paper</span> covered <span class="font-semibold">Rock</span>';
        endRound('win');
      } else {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Paper</span> cut by <span class="font-semibold">Scissors</span>';
        endRound('loss');
      }
    } else if (playerChoice === 'scissors') {
      if (enemyChoice === 'paper') {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Scissors</span> cut <span class="font-semibold">Paper</span>';
        endRound('win');
      } else {
        whyOutcome.innerHTML = '<span class="font-semibold text-amber-300">Scissors</span> broken by <span class="font-semibold">Rock</span>';
        endRound('loss');
      }
    } else {
      return "Invalid choices"
    }

    function getComputerChoice() {
      // set up choices
      let choices = ['rock', 'paper', 'scissors'];

      // pick random index between 0 and 2
      let choiceNum = Math.floor(Math.random() * 3);
      return choices[choiceNum]
    }
  }

  function endRound(outcome) {
    // UPDATE table
    glassImg.src = `/assets/table-${outcome}.svg`;
    winLose.textContent = `${outcome}`;
    // SHOW outcome text
    whyOutcome.classList.remove("hidden");
    winLose.classList.remove("hidden");
    // HIDE chant text
    steps.classList.add("hidden");
    // SHORTEN bottom margin
    if (roundNum) {
      document.getElementById(`round-${roundNum}`).classList.add("mb-1");
      document.getElementById(`round-${roundNum}`).classList.remove("mb-48");
    }

    // UPDATE scores
    // SHOW scores
    switch (outcome) {
      case 'win':
        playerScore++;
        scoreLeft.textContent = playerScore;
        break;
      case 'loss':
        enemyScore++;
        scoreRight.textContent = enemyScore;
        break;
      case 'tie':
        break;
    }

    if (playerScore === 5 || enemyScore === 5) {
      endGame();
    }
    else {
      showNextBtn();
    }
    // nextRound(++roundNum);
  }

  function showNextBtn() {
    // REVEAL button
    nextBtn.classList.remove("hidden");
    // ENABLE nextBtn clicks
    nextBtn.addEventListener("click", clickNext);
    console.log("Button for nextRound activated.");
  }
}

function clickNext() {
  // DIM round sign
  roundSign.classList.add("opacity-40");
  roundSign.classList.remove("font-bold");
  roundSign.classList.remove("text-amber-300");

  nextRound(++roundNum);
  console.log("nextRound clicked.");
}

function endGame() {
  // DIM round sign
  roundSign.classList.add("opacity-40");
  roundSign.classList.remove("font-bold");
  roundSign.classList.remove("text-amber-300");

  final.classList.remove("hidden");
  if (playerScore > enemyScore) {
    final.textContent = `YOU WON!`;
    document.body.classList.add("bg-[#063217]");
    document.body.classList.remove("bg-black");
  }
  else if (playerScore < enemyScore) {
    final.textContent = `YOU LOST!`;
    document.body.classList.add("bg-[#400202]");
    document.body.classList.remove("bg-black");
  } else console.log("Somehow tie game");
}