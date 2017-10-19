/*global newGame, playerPick, player*/
var newGameBtn = document.getElementById("js-newGameButton"); //zainicjonowanie gry

newGameBtn.addEventListener("click", newGame);

var pickRock = document.getElementById("js-playerPick_rock"),
	pickPaper = document.getElementById("js-playerPick_paper"),
	pickScissors = document.getElementById("js-playerPick_scissors");

pickRock.addEventListener("click", function () {
	"use strict";
	playerPick("rock");
});
pickPaper.addEventListener("click", function () {
	"use strict";
	playerPick("paper");
});
pickScissors.addEventListener("click", function () {
	"use strict";
	playerPick("scissors");
});

var gameState = "notStarted"; //wartości początkowe
player = { name: " ", score: 0 },
computer = {score: 0 };

var newGameElem = document.getElementById("js-newGameElement"), //wyświetlanie elementów gry
	pickElem = document.getElementById("js-playerPickElement"),
	resultsElem = document.getElementById("js-resultsTableElement");

function setGameElements() {
	switch (gameState) {
		case "started":
			newGameElem.style.display = "none";
			pickElem.style.display = "block";
			resultsElem.style.display = "block";
			break;
		case "ended":
			newGameBtn.innerText = "Play again";
			playerPickElem.textContent = "Player's choice";
			computerPickElem.textContent = "Computer's choice";
			playerResultElem.textContent = "Player's score";
			computerResultElem.textContent = "Computer's score";
		case "notStarted":
		default:
			newGameElem.style.display = "block";
			pickElem.style.display = "none";
			resultsElem.style.display = "none";
	}
}

setGameElements(); //wywołanie funkcji

var playerPointsElem = document.getElementById("js-playerPoints"), //Rozpoczęcie gry
	playerNameElem = document.getElementById("js-playerName"),
	computerPointsElem = document.getElementById("js-computerPoints");

function newGame() {

	swal({
			title: "Who are you?",
			text: "Please enter your name:",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			animation: "slide-from-top",
			inputPlaceholder: "player's name"
		},
		function (inputValue) {
			if (inputValue === false) return false;

			if (inputValue === "") {
				swal.showInputError("You need to write your name!");
				return false;
			}
			swal("Let's start!", "Good luck! " + inputValue);
			player.name = inputValue;

			if (player.name) {
				player.score = computer.score = 0;
				gameState = "started";
				setGameElements();

				playerNameElem.innerHTML = player.name;
				setGamePoints();
			}
		});
}

function getComputerPick() { //losowanie wyboru gracza
	var possiblePicks = ["rock", "paper", "scissors"];
	return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'), //wybór gracza i komputera
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) { //przyznawanie punktów
	playerResultElem.innerHTML = computerResultElem.innerHTML = "";

	var winnerIs = "player";

	if (playerPick == computerPick) {
		winnerIs = "none";
		playerResultElem.innerHTML = "<b>Tie!<b>";
		computerResultElem.innerHTML = "<b>Tie!<b>";
	} else if (
		(computerPick == "rock" && playerPick == "scissors") ||
		(computerPick == "scissors" && playerPick == "paper") ||
		(computerPick == "paper" && playerPick == "rock")) {
		winnerIs = "computer";
	}

	if (winnerIs == "player") {
		playerResultElem.innerHTML = "<b>Win!</b>";
		player.score++;
	} else if (winnerIs == "computer") {
		computerResultElem.innerHTML = "<b>Win!</b>";
		computer.score++;
	}

	setGamePoints(); //wywołanie funkcji podliczenie punktów 
	gameEnded();

};

function setGamePoints() { //aktualizacja wyniku
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function gameEnded() { //sprawdzanie kto zdobył 10pkt
	if (player.score == 10) {
		swal("Awesome!", player.name + " wins" + " :D")
		gameState = "ended"
	} else if (computer.score == 10) {
		sweetAlert({
			title: "Darn it!",
			text: "Computer is the winner",
		})
		gameState = "ended"
	}

	setGameElements(); //wywołanie funkcji zaczynającej grę od nowa! 

};