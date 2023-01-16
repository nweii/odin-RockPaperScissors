function getComputerChoice() {
	// set up choices
	let choices = ['rock', 'paper', 'scissors'];
	// console.log(choices);
	
	// pick random index between 0 and 2
	let choiceNum = Math.floor(Math.random() * 3);
	// console.log(choiceNum, choices[choiceNum]);
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

let playerChoice = "rock";
const computerChoice = getComputerChoice();
console.log(playRound(playerChoice, computerChoice));

let playerScore = 0;
let computerScore = 0;
console.log(playerScore, computerScore);

function game() {
	// loop 5 rounds
	// prompt player for choice
	playerChoice = prompt("Rock, Paper, or Scissors?");
	console.log(playerChoice);
	
	// play round
	let roundResult = playRound(playerChoice, getComputerChoice());
	
	// detect if the round was a win, loss, or tie and update score accordingly.
	if (roundResult.includes('win')) {
		playerScore++;
		console.log(`${roundResult} (You: ${playerScore}, Computer: ${computerScore})`);
	} 
	else if (roundResult.includes('lose')) {
		computerScore++;
		console.log(`${roundResult} (You: ${playerScore}, Computer: ${computerScore})`);
	}
	else {
		console.log(`${roundResult} (You: ${playerScore}, Computer: ${computerScore})`);
	}
	
	// compare scores to determine winner.
	if (playerScore > computerScore) {
		return `You won by ${playerScore - computerScore} points! (${playerScore} v ${computerScore})`
	}
	else if (playerScore < computerScore) {
		return `You lost by ${computerScore - playerScore} points. (${playerScore} v ${computerScore})`
	}
	else {
		return "Tie match!"
	}
}