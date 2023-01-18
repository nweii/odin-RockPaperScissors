// initialize game variables
let playerChoice = 'rock';
const computerChoice = getComputerChoice();
console.log(`Your choice: ${playerChoice}, Opponent choice: ${computerChoice}`);

let roundNum = 1;
let estRounds = 5;
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
if ('ontouchstart' in window || navigator.maxTouchPoints) instruction.innerHTML = "Tap anywhere"
else instruction.innerHTML = "Click anywhere";

// the parent element containing the choice buttons
let choices = document.querySelector("#choices"); 
// the final result announcement text on game end.
let final = document.querySelector("#final"); 

let blankRound = document.querySelector("#r1").cloneNode(true); // set aside a blank copy of this round for use in newRound()

playRound();

function playRound() {
		console.log("Starting playRound()");
		// each span element in "Rock…Paper…Scissors…Shoot!"
		let stepItems = document.querySelectorAll("#stepItems span"); 
		clickCount = 0;
		console.log(`Reset clickcount to ${clickCount}.`);
		
		document.addEventListener('mousedown', startNext);
		function startNext() {
			if (clickCount < 3) {
				// Animate both hands to "shake" downward
				playerHand.classList.add('rotate-12', 'translate-y-2.5');
				enemyHand.classList.add('-rotate-12', 'translate-y-2.5');
				
				// Brighten "rock" then "paper" then "scissors"
				stepItems[clickCount].classList.remove("opacity-50");
			}
			else {}
		}
		
		document.addEventListener('mouseup', addClick);
		function addClick() {
			clickCount++;
			console.log(`${clickCount} clicks`);
		}
		
		document.addEventListener('mouseup', finishNext);
		
		function finishNext() {
			if (clickCount <= 3) {
				// Reset hands back to original position
				playerHand.classList.remove('rotate-12', 'translate-y-2.5');
				enemyHand.classList.remove('-rotate-12', 'translate-y-2.5');
				
				if (clickCount === 3) {
					// hide "Tap anywhere"
					instruction.classList.add("hidden"); 
					// reveal choices
					choices.classList.remove("hidden");
					// Save choice button text as player choice when clicked
					choices.addEventListener("click", choose(e));
				}
			}
			
			function choose(e) {
				playerChoice = e.target.textContent;
				console.log(`You chose ${playerChoice}`);
				choices.classList.add("hidden"); // hide choices again
				stepItems[clickCount].classList.remove("opacity-50"); // un-fade "Shoot!" aka index 3 of #stepItems
				getOutcome();
			}
		}
		
		// Proceed to next step on mouse-up from click
		// document.addEventListener("click", function() {
		// 	clickCount++;
		// });
		
		function nextStep1() {
			
			// once the third click is reached, stop this behavior and update the interface accordingly.
			if (clickCount < 3) {
				// on each click, remove the matching step index's opacity class (each word in "Rock…Paper…Scissors…") 
				clickCount++;
				console.log(`Click ${clickCount}`)
			} 
			else if (clickCount === 3) {
				instruction.classList.add("hidden"); // hide "Tap anywhere"
				choices.classList.remove("hidden"); // reveal choices
				document.removeEventListener("click", nextStep); // end click anywhere behavior

				// Save choice button text as player choice when clicked
				choices.addEventListener("click", function(e) {
					playerChoice = e.target.textContent;
					console.log(`You chose ${playerChoice}`);
					choices.classList.add("hidden"); // hide choices again
					stepItems[clickCount].classList.remove("opacity-50"); // un-fade "Shoot!" aka index 3 of #stepItems
					getOutcome();
				});
			}
			else clickCount = 0;
		}
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
			document.body.classList.remove("bg-black");
			document.body.classList.add("bg-[#063217]");
		} 
		else {
			final.textContent = `YOU LOST!`;
			document.body.classList.remove("bg-black");
			document.body.classList.add("bg-[#400202]");
		};
	}
	else newRound();
}

function newRound() {
	roundNum++;
	clickCount = 0;
	// We need to numerate the previous IDs because everything in this script works only un-numerated section IDs. We also need to avoid creating duplicate IDs.
	const prevRoundNum = roundNum - 1;
	console.log(`New round number is ${roundNum} and previous is ${prevRoundNum}.`);
	let prevRoundSection = document.getElementById(`r${prevRoundNum}`);
	suffixChildIds(prevRoundSection, prevRoundNum);
	
	// create new section for this round
	let nextRoundSection = blankRound;
	nextRoundSection.id = "r" + roundNum; // name it after the round number
	
	document.body.appendChild(nextRoundSection);
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
	console.log(`Player: ${playerScore}, Enemy: ${enemyScore}, clickCount: ${clickCount}`)
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
	console.log(`Updated ${roundSign}.`)
};