// initialize game variables
let playerChoice = 'rock';
const computerChoice = getComputerChoice();
console.log(`Your choice: ${playerChoice}, Opponent choice: ${computerChoice}`)

let roundNum = 1;
let estRounds = 5;
let playerScore = 0;
let enemyScore = 0;
console.log(`You: ${playerScore}, Opponent: ${enemyScore}`);

// initialize webpage variables
let roundName = document.querySelector("#roundName");
let steps = document.querySelectorAll("#steps span"); // each span element in "Rock…Paper…Scissors…Shoot!"
let clickCount = 0;
let whyOutcome = document.querySelector("#whyOutcome"); // explanation text for the win/loss outcome.

let playerHand = document.querySelector("#playerHand");
let enemyHand = document.querySelector("#enemyHand");
let winLose = document.querySelector("#winLose"); // the text on the table announcing WIN LOSE or TIE
let glass = document.querySelector("#glass"); // the image for the table

let scoreLeft = document.querySelector("#scoreLeft"); // the text containing player score, under the table
let scoreRight = document.querySelector("#scoreRight"); // the text containing enemy score, under the table

let instruction = document.querySelector("#instruction");
if ('ontouchstart' in window || navigator.maxTouchPoints) instruction.innerHTML = "Tap anywhere"
else instruction.innerHTML = "Click anywhere";

let choices = document.querySelector("#choices"); // the parent element containing the choice buttons
let final = document.querySelector("#final"); // the final result announcement text on game end.

playRound();

function newRound() {
	// create new section for this round
	let roundSpace = document.createElement("section");
	
	// name it after the round number
	roundSpace.id = `r${roundNum}`;
	document.body.appendChild(roundSpace);
	roundNum++;
	updateRoundLabel();
}

function playRound() {
		let clickCount = 0;
		document.addEventListener("click", startRound);
		
		function startRound() {
			// on each click, remove the matching step index's opacity class (each word in "Rock…Paper…Scissors…") 
			steps[clickCount].classList.remove("opacity-50");
			clickCount++;
			console.log(`Click ${clickCount}`)
			
			// once the third click is reached, stop this behavior and update the interface accordingly.
			if (clickCount === 3) {
				instruction.classList.add("hidden"); // hide "Tap anywhere"
				choices.classList.remove("hidden"); // reveal choices
				document.removeEventListener("click", startRound); // end click anywhere behavior
			}
		}
		
		// Save choice button text as player choice when clicked
		choices.addEventListener("click", function(e) {
				playerChoice = e.target.textContent;
				console.log(`You chose ${playerChoice}`);
				choices.classList.add("hidden"); // hide choices again
				steps[clickCount].classList.remove("opacity-50"); // un-fade "Shoot!" aka index 3 of #steps
				getOutcome();
		});
}

function getOutcome() {
	// set both inputs to lowercase
	playerChoice = playerChoice.toLowerCase();
	enemyChoice = getComputerChoice().toLowerCase();
	console.log(`Enemy chose ${computerChoice}`);
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

function endRound(outcome) {
	glass.src = `/assets/table-${outcome}.svg`;
	winLose.textContent = `${outcome}`;
	whyOutcome.classList.remove("hidden");
	winLose.classList.remove("hidden");
	
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
}

function updateRoundLabel() {roundName.textContent = `Round ${roundNum}/${estRounds}`};

function game() {
	
	// Get all choice buttons and add click interactivity to each
	const buttons = document.querySelectorAll("#choices button");

	buttons.forEach(function(button) {
		button.addEventListener("click", function() {
			// on click, save button label as playerChoice
			playerChoice = this.textContent;
			console.log(`Saved ${playerChoice} as player choice.`);
			
			// play round
			let roundResult = getOutcome(playerChoice, getComputerChoice());
			
			// get results
			updateScore(roundResult);
			
			function updateScore(result) {
				// detect if the round was a win, loss, or tie and update score accordingly.
				// TODO this should update the score markers
				if (result.includes('win')) {
					playerScore++;
					console.log(`${result} (You: ${playerScore}, Computer: ${enemyScore})`);
				} 
				else if (result.includes('lose')) {
					enemyScore++;
					console.log(`${result} (You: ${playerScore}, Computer: ${enemyScore})`);
				}
				else {
					console.log(`${result} (You: ${playerScore}, Computer: ${enemyScore})`);
				}
			}
			
			// compare scores to determine winner.
			// TODO this should update the table appearance:
			// 	- set winLose to WIN, LOSE, or TIE
			// 	- replace "#id" src with respective table.svg asset
			function getWinner() {
				if (playerScore > enemyScore) {
					return `You won by ${playerScore - enemyScore} points! (${playerScore} v ${enemyScore})`
				}
				else if (playerScore < enemyScore) {
					return `You lost by ${enemyScore - playerScore} points. (${playerScore} v ${enemyScore})`
				}
				else return "Tie match!"
			}
		});
	});
}