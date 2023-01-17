// initialize choices and scores
let playerChoice = "rock";
const computerChoice = getComputerChoice();
console.log(`Your choice: ${playerChoice}, Opponent choice: ${computerChoice}`)

let playerScore = 0;
let computerScore = 0;
console.log(`You: ${playerScore}, Opponent: ${computerScore}`);

game();

function getComputerChoice() {
	// set up choices
	let choices = ['rock', 'paper', 'scissors'];
	
	// pick random index between 0 and 2
	let choiceNum = Math.floor(Math.random() * 3);
	return choices[choiceNum]
}

function playRound(playerChoice, computerChoice) {
	// set both inputs to lowercase
	playerChoice = playerChoice.toLowerCase();
	computerChoice = computerChoice.toLowerCase();
	
	// Compare choices and determine a winner.
	if (playerChoice === computerChoice) {
		return "It's a tie!";
	}
	else if (playerChoice === 'rock') {
		if (computerChoice === 'scissors') {
			return "You win! Rock breaks Scissors."
		} else {return "You lose! Paper covers Rock."}
	}
	else if (playerChoice === 'paper') {
		if (computerChoice === 'rock') {
			return "You win! Paper covers Rock."
		} else {return "You lose! Scissors cut Paper."}
	}
	else if (playerChoice === 'scissors') {
		if (computerChoice === 'paper') {
			return "You win! Scissors cut Paper."
		} else {return "You lose! Rock breaks Scissors."}
	}
	else {
		return "Invalid choices"
	}
}

function game() {
	// loop 5 rounds
	// prompt player for choice
	// playerChoice = prompt("Rock, Paper, or Scissors?");
	
	// Get all choice buttons and add click interactivity to each
	const buttons = document.querySelectorAll("#choices button");

	buttons.forEach(function(button) {
		button.addEventListener("click", function() {
			// on click, save button label as playerChoice
			playerChoice = this.textContent;
			console.log(`Saved ${playerChoice} as player choice.`);
			
			// play round
			let roundResult = playRound(playerChoice, getComputerChoice());
			
			// get results
			updateScore(roundResult);
			
			function updateScore(result) {
				// detect if the round was a win, loss, or tie and update score accordingly.
				if (result.includes('win')) {
					playerScore++;
					console.log(`${result} (You: ${playerScore}, Computer: ${computerScore})`);
				} 
				else if (result.includes('lose')) {
					computerScore++;
					console.log(`${result} (You: ${playerScore}, Computer: ${computerScore})`);
				}
				else {
					console.log(`${result} (You: ${playerScore}, Computer: ${computerScore})`);
				}
			}
			
			// compare scores to determine winner.
			// TODO this should update the table appearance:
			// 	- set winLose to WIN, LOSE, or TIE
			// 	- replace "#id" src with respective table.svg asset
			function getWinner() {
				if (playerScore > computerScore) {
					return `You won by ${playerScore - computerScore} points! (${playerScore} v ${computerScore})`
				}
				else if (playerScore < computerScore) {
					return `You lost by ${computerScore - playerScore} points. (${playerScore} v ${computerScore})`
				}
				else return "Tie match!"
			}
		});
	});
}