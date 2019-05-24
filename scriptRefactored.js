const renderDice = () =>{
	 	console.log("RENDER DICE");

	 	let $die1 = $('<div>',
	 	{
	      id: 'die1',
	      class: 'dice',
	      width: '50px',
	      height: '50px',
	   	});
	    let $die2 = $('<div>', 
	    {
	      id: 'die2',
	      class: 'dice',
	      width: '50px',
	      height: '50px',
	    });
	    let $holdsDie = $('<div>', 
    	{ 
    	id: 'diceHolder',
    	height:'30%',
    	width: '30%' 
    	});
	    $('body').append($holdsDie);
	    $holdsDie.append($die1, $die2);
	    let $paragraph = $('<p>', { id: 'holderPara' });
	    $('#diceHolder').append($paragraph);
	    $paragraph.text('Click here to roll the dice');
	 }
const renderPlayers=()=>{
	 	let $player1 = $('<div>', { id: 'player1Box' });
	    let $player2 = $('<div>', { id: 'player2Box' });
	    $player1.css({
	      width: '200px',
	      height: '150px',
	      background: 'red',
	      padding: '20px',
	    });
	    $player2.css({
	      width: '200px',
	      height: '150px',
	      background: 'blue',
	      padding: '20px',
	    });
	    let $body = $('body');
	    let $pastScoreHolder1 = $('<div>', {
	      id: 'pastScorePlayer1',
	      class: 'previousScore',
	    });
	    let $pastScoreHolder2 = $('<div>', {
	      id: 'pastScorePlayer2',
	      class: 'previousScore',
	    });
	    $pastScoreHolder1.css({
	      border: '2px solid black',
	      background: 'orange',
	      width: '390px',
	      height: '150px',
	    });
	    $pastScoreHolder2.css({
	      border: '2px solid black',
	      background: 'orange',
	      width: '390px',
	      height: '150px',
	    });
	    $body.prepend($player1);
	    $body.append($player2);
	    $body.prepend($pastScoreHolder1);
	    $body.append($pastScoreHolder2);
	 }
const renderDisplay=(game)=>{
	// console.log(game.die1)
	 	$('#die1').text(game.die1);
	    $('#die2').text(game.die2);
	    // console.log("newGame", game);
	    $('#player1Box').text(`${game.player1Name} Current Score: ${game.player1Score}`);
	    $('#player2Box').text(`${game.player2Name} Current Score: ${game.player2Score}`);
	    $('#pastScorePlayer1').text(
	      `Previous Rolls :${game.player1Name} ${game.player1Rolls}`
	    );
	    $('#pastScorePlayer2').text(
	      `Previous Rolls ${game.player2Name}: ${game.player2Rolls}`
	    );
	 }
const whereIsGoal=(game)=>{
	 	console.log("WHERE IS GOAL");

	 	let setGoal = prompt('Input a Positive number to reach with dice rolls');
	    if (isNaN(setGoal)) {
	      alert('Please Select A Positive integer');
	      whereIsGoal(game)

	    } else if (setGoal <= 0) {
	      alert('Please Select A Positive integer');
	      whereIsGoal(game);


	    } else if (!setGoal) {
	      alert('Please Select A Positive integer');
	      whereIsGoal(game);


	    } else {
	      setGoal = Number(setGoal);
	      console.log("GOAL IS SET TO " + setGoal);
	      $('#goal').text(`THE GOAL:${setGoal}`);
	       game.currentGoal = setGoal;
	      // const dice = document.querySelector('#diceHolder');
	      // dice.addEventListener('click', rollDice)
	    }
	 }
const calcPlayer1Score= (game)=> {
    var currentRolls = game.player1Rolls;
    var total = 0;
    for (var i = 0; i < currentRolls.length; i++) {
      total += currentRolls[i];
    }
    game.player1Score = total;
  }
  const calcPlayer2Score =(game)=> {
    var currentRolls = game.player2Rolls;
    var total = 0;
    for (var i = 0; i < currentRolls.length; i++) {
      total += currentRolls[i];
    }
    game.player2Score = total;
  }
const rollDice =(game)=>{
	console.log("Within Roll Dice", game);
    game.diceVal(game);
    game.checkWin(game);
    game.calcPlayer1Score(game);
    game.calcPlayer2Score(game);
    game.renderDisplay(game);
    // console.log(game);
    // console.log(game.currentGoal);
    // console.log(game.player1Score, game.player2Score;
    game.turnCount++;
    if (game.player1Score >= game.currentGoal || game.player2Score >= game.currentGoal) {
      document
        .querySelector('#diceHolder')
        .removeEventListener('click', rollDice);
      $('#diceHolder').text('The game has Ended');
    }
  }
const checkWin = (game)=> {
    if (game.player1Score >= game.currentGoal) {
      var playAgain = confirm('player 1 wins, play again?');

      var $restartGame = $('<div>', {
        id: 'restart',
      });
      $restartGame.css({
        width: '200px',
        height: '100px',
        background: 'red',
      });
      $restartGame.text('Click here to restart Game');
      $('body').append($restartGame);
      $restartGame.on('click', restart);
    }
    if (game.player2Score >= game.currentGoal) {
      var playAgain = confirm('player 2 wins, play again?');

      var $restartGame = $('<div>', {
        id: 'restart',
      });
      $restartGame.css({
        width: '200px',
        height: '100px',
        background: 'red',
      });
      $restartGame.text('CLICK HERE TO RESTART');
      $('body').append($restartGame);
      $restartGame.on('click', restart);
    }
  }
  const restart = () => {
    $('#restart').off('click', restart);
    $('#restart').remove();
    location.reload();
  }
const diceVal=(game)=> {
	const firstDie = randomInt();
	const secondDie = randomInt();
    game.die1 = firstDie
    game.die2 = secondDie; //random integer between 1-6
    let total = game.die1 + game.die2;
    game.setCurrentPlayer(game);
    if ( game.currentPlayer== game.player1Name) {
      game.player1Rolls.push(total);
      $('#player1Box').css({ border: '5px solid green' });
      $('#player2Box').css({ border: '5px solid transparent' });
    }
    if (game.currentPlayer == game.player2Name) {
      game.player2Rolls.push(total);
      $('#player2Box').css({ border: '5px solid green' });
      $('#player1Box').css({ border: '5px solid transparent' });
    }
  }
const randomInt=()=> {
    return Math.floor(1 + Math.random() * 6);
  }
const setCurrentPlayer=(game)=> {
    if (game.turnCount % 2 !== 0) {
      game.currentPlayer = game.player1Name;
    } else {
      game.currentPlayer = game.player2Name;

    }
  }
const setPlayer1 =(game)=> {
	const name = prompt("Please enter Player one's name!");
	game.player1Name = name;
}
const setPlayer2 =(game)=>{
	const name = prompt("Please enter Player two's name!");
	game.player2Name = name;
} 
const setPlayerName = (game)=>{
	game.setCurrentPlayer(game);
	
	if(game.turnCount %2 !== 0){
	const name = prompt(`Please enter ${game.player1Name}'s name!`);
		game.player1Name = name;
	}
	else{
	const name = prompt(`Please enter ${game.player2Name}'s name!`);
		game.player2Name = name;
	}
	game.turnCount++;
}
const fadeLanding = (game)=>{
	 	console.log("FADING LANDING");
	 	$('#startingScreen').css({ display: 'none' });
    	document
	      .querySelector('#startButton')
	      .removeEventListener('click', fadeLanding);
	      console.log("game param", game);
	      renderDice();
	      renderPlayers();
	      renderDisplay(game);
	      // $('#goal').text(`THE GOAL:${this.setGoal}`);
	      let dice = document.querySelector('#diceHolder')
	      dice.addEventListener('click', ()=>{
	      	game.rollDice(game);
	      });
	 }
// const handleFade = ()=> fadeLanding(this);
// const  startGame=()=>{

// 	 	let startButton = document.querySelector('#startButton');
// 	 	startButton.addEventListener('click', fadeLanding);
// 	 }
const init=(game)=>{
	 	let $startGameScreen = $('<div>', { id: 'startingScreen' });
	    $startGameScreen.css({
	      background: 'black',
	      width: '100%',
	      height: '900px',
	      border: '4px solid orange',
	      display: 'flex',
	      justifyContent: 'center',
	      flexFlow: 'column',
	      alignItems: 'center',
	      padding: '50px',
	    });
	    $('body').append($startGameScreen);
	    let $title = $('<h1>', { id: 'title' });
	    $title.text('Reach the Goal');
	    $startGameScreen.append($title);

	    //created background div for start game UI
	    let $startButton = $('<div>', { id: 'startButton' });
	    $startButton.css({
	      height: '70px',
	      width: '200px',
	      background: 'red',
	      border: '5px solid yellow',
	      borderRadius: '20px',
	      cursor: 'pointer',
	    });
	    $startButton.text('Click here to start');
	    $startGameScreen.append($startButton);

	    let $instructionsP = $('<p>');
	    $startGameScreen.append($instructionsP);
	    $instructionsP.text(`How to Play: When the red start Button is clicked users will be prompted to input a whole Positive integer.
	     After you submit the prompt, two players with starting score at zero will take turns rolling the dice and add the total to their current score. 
	     When the score of the respected player is greater than or equal to the goal chosen at the start of the game, then that player wins.
	      Click the start button to begin!`);
	    let startButton = document.querySelector('#startButton');
	 	startButton.addEventListener('click', ()=>{
	 		game.setPlayerName(game);
	 		game.setPlayerName(game);
	 		game.whereIsGoal(game);
	 		game.fadeLanding(game);
	 	});
	 	
	      // console.log("this test", game);

	 }
class ReachGoal{
	 constructor() {
	 	this.startButton = document.querySelector('#startButton');
	 	this.player1Name = "Player 1";
	 	this.player2Name = "Player 2"
	 	this.setPlayerName = setPlayerName;
	 	this.setCurrentPlayer = setCurrentPlayer;
	 	this.currentPlayer = null;
	 	this.whereIsGoal = whereIsGoal;
	 	this.currentGoal = null;
	 	this.checkWin = checkWin;
	 	this.die1 = 0;
	 	this.die2 = 0;
	 	this.turnCount = 1;
	 	this.player1Rolls = [];
	 	this.player2Rolls = [];
	 	this.player1Score = 0;
	 	this.player2Score = 0;
	 	this.calcPlayer1Score = calcPlayer1Score;
	 	this.calcPlayer2Score = calcPlayer2Score;
	 	this.diceVal = diceVal;
	 	this.fadeLanding = fadeLanding;
	 	this.init = init;
	 	this.rollDice = rollDice;
	 	this.renderDisplay = renderDisplay;

	  }
	 

}

window.onload = () =>{
	// const player1Name = prompt("Please enter Player one's name!");
	// const player2Name = prompt("Please enter Player two's name!");

	const newGame = new ReachGoal();
	// console.log(newGame);
	newGame.init(newGame);

}
/*
things I still want to do;

refactor all functions doing the same thing for seperate players:
calcPlayer1Score , calcPlayer2Score
setPlayer1, setPlayer2

list rolls in Previous rolls box to show when roll was made by scrolling
refactor CSS to show dice rolling animation


*/
