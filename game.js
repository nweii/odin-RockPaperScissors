// initialize game variables
let playerChoice = 'rock';
let enemyChoice = 'rock';
console.log(`Your choice: ${playerChoice}, Opponent choice: ${enemyChoice}`);

let roundNum = 1;
let estRounds = 5;
let prevRoundNum = roundNum - 1;
let prevRoundSection;
let newRoundSection;

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

// Detect whether input is touchscreen or mouse and update instruction text accordingly
if ('ontouchstart' in window || navigator.maxTouchPoints) instruction.innerHTML = "Tap anywhere"
else instruction.innerHTML = "Click anywhere";

// the parent element containing the choice buttons
let choices = document.querySelector("#choices"); 
// the final result announcement text on game end.
let final = document.querySelector("#final"); 

const blankRound = document.querySelector("#r1").cloneNode(true); // set aside a blank copy of this round for use in newRound()

playRound();

function playRound() {
	console.log("Starting playRound()");
	
	// each span element in "Rock…Paper…Scissors…Shoot!"
	let stepItems = document.querySelectorAll("#stepItems span"); 
	// reset click count as playRound() will be called at the start of each new round.
	clickCount = 0;
	console.log(`clickCount reset to ${clickCount}.`);
	
	// increment clickCount on release
	document.addEventListener('mouseup', addClick);
	function addClick() {
		clickCount++;
		console.log(`${clickCount} clicks`);
	}
	
	// on each click down, Animate hands down and light a chant. If 
	document.addEventListener('mousedown', animDown);
	console.log("handsdown and chanting activated.")
	
	document.addEventListener('mouseup', animUp);
	console.log("handsup activated.");
	
	function animDown() {
		// Animate both hands downward
		playerHand.classList.add('rotate-12', 'translate-y-2.5');
		enemyHand.classList.add('-rotate-12', 'translate-y-2.5');
		
		lightStep();
	}
	
	function lightStep() {
		// Brighten "rock" then "paper" then "scissors"
		stepItems[clickCount].classList.remove("opacity-50");
	}
	
	function animUp() {
		// Reset hands back upward
		playerHand.classList.remove('rotate-12', 'translate-y-2.5');
		enemyHand.classList.remove('-rotate-12', 'translate-y-2.5');
		
		// after last animUp / after "Scissors…" lights up
		if (clickCount === 3) {
			showChoices();
		}
	}
	
	function showChoices() {
		choices.addEventListener("click", choose);
		console.log("Added choice click event listener.");
		
		// remove step/animation click anywhere behaviors
		document.removeEventListener('mousedown', animDown);
		console.log("chanting deactivated.");
		document.removeEventListener('mouseup', addClick);
		console.log("Click counts deactivated.");
		// hide "Tap/click anywhere"
		instruction.classList.add("hidden"); 
		
		// reveal choices
		choices.classList.remove("hidden");
		console.log("showing choices");
		// Save choice button text as player choice when clicked
		document.removeEventListener('mousedown', animUp);
	}

	function choose(e) {
		playerChoice = e.target.textContent;
		console.log(`You chose ${playerChoice}`);
		choices.classList.add("hidden"); // hide choices again
		stepItems[clickCount].classList.remove("opacity-50"); // un-fade "Shoot!" aka index 3 of #stepItems
		getOutcome();
	}
	
	function getOutcome() {
		// set both inputs to lowercase
		playerChoice = playerChoice.toLowerCase();
		enemyChoice = getComputerChoice().toLowerCase();
		console.log(`Enemy chose ${enemyChoice}`);
		updateHands();
		
		// Compare choices and determine a winner.
		if (playerChoice === enemyChoice) {
			whyOutcome.textContent = "Love is love<3";
			endRound('tie');
		}
		else if (playerChoice === 'rock') {
			if (enemyChoice === 'scissors') {
				whyOutcome.textContent = "Rock breaks Scissors";
				endRound('win');
			} 
			else {
				whyOutcome.textContent = "Paper covers Rock";
				endRound('loss');
			}
		}
		else if (playerChoice === 'paper') {
			if (enemyChoice === 'rock') {
				whyOutcome.textContent = "Paper covers Rock";
				endRound('win');
			}
			else {
				whyOutcome.textContent = "Scissors cut Paper";
				endRound('loss');
			}
		}
		else if (playerChoice === 'scissors') {
			if (enemyChoice === 'paper') {
				whyOutcome.textContent = "Scissors cut Paper";
				endRound('win');
			}
			else {
				whyOutcome.textContent = "Rock breaks Scissors";
				endRound('loss');
			}
		}
		else {
			return "Invalid choices"
		}
		
		function endRound(outcome) {
			glassImg.src = `/assets/table-${outcome}.svg`;
			winLose.textContent = `${outcome}`;
			whyOutcome.classList.remove("hidden");
			winLose.classList.remove("hidden");
			steps.classList.add("hidden");
			
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
				estRounds++;
				updateRoundLabel();
				break;
			}
			
			if (playerScore === 5 || enemyScore === 5) {
				final.classList.remove("hidden");
				if (playerScore > enemyScore) {
					final.textContent = `YOU WON!`;
					document.body.classList.add("bg-[#063217]");
					document.body.classList.remove("bg-black");
				} 
				else {
					final.textContent = `YOU LOST!`;
					document.body.classList.add("bg-[#400202]");
					document.body.classList.remove("bg-black");
				};
			}
			else newRound();
		}
	}
}

function newRound() {
	roundNum++;
	console.log(`--- STARTING ROUND ${roundNum} ---`);
	// We need to numerate the previous IDs because everything in this script works only un-numerated section IDs. We also need to avoid creating duplicate IDs.
	prevRoundNum = roundNum - 1;
	console.log(`prevRoundNum is ${prevRoundNum}`);
	prevRoundSection = document.getElementById(`r${prevRoundNum}`);
	console.log("Previous round section:"); console.log(prevRoundSection);
	suffixChildIds(prevRoundSection, prevRoundNum);
	
	// create new section for this round
	newRoundSection = blankRound;
	newRoundSection.id = "r" + roundNum; // name it after the round number
	console.log(`Created new round section #${newRoundSection.id}:`); console.log(newRoundSection);
	
	// reveal the next round
	document.body.insertBefore(newRoundSection, final);
	console.log("Added new round section to document.");
	
	refreshVars();
	updateRoundLabel();
	playRound();
	
	function suffixChildIds(parent, number) {
		parent.querySelectorAll('*').forEach(function (child) {
			child.id += number;
		});
	}
}

function refreshVars() {
	roundSign = document.querySelector("#roundSign");
	steps = document.querySelector("#stepItems");
	stepItems = document.querySelectorAll("#stepItems span"); 
	whyOutcome = document.querySelector("#whyOutcome"); 
	playerHand = document.querySelector("#playerHand");
	enemyHand = document.querySelector("#enemyHand");
	winLose = document.querySelector("#winLose"); 
	glassImg = document.querySelector("#glassImg"); 
	scoreLeft = document.querySelector("#scoreLeft"); 
	scoreRight = document.querySelector("#scoreRight"); 
	instruction = document.querySelector("#instruction");
	choices = document.querySelector("#choices");
	
	scoreLeft.textContent = playerScore;
	scoreRight.textContent = enemyScore;
	console.log(`Player: ${playerScore}, Enemy: ${enemyScore}`)
}

function getComputerChoice() {
	// set up choices
	let choices = ['rock', 'paper', 'scissors'];
	
	// pick random index between 0 and 2
	let choiceNum = Math.floor(Math.random() * 3);
	return choices[choiceNum]
}

function updateHands() {
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
}

function updateRoundLabel() {
	roundSign.innerHTML = `<span class="font-bold">Round ${roundNum}</span>/${estRounds}`;
	console.log(`Updated round sign.`)
};