$(function() {
  function init() {
    startLanding();
  }
  function startLanding() {
    var $startGameScreen = $('<div>', { id: 'startingScreen' });
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
    var $title = $('<h1>', { id: 'title' });
    $title.text('Reach the Goal');
    $startGameScreen.append($title);

    //created background div for start game UI
    var $startButton = $('<div>', { id: 'startButton' });
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

    var $instructionsP = $('<p>');
    $startGameScreen.append($instructionsP);
    $instructionsP.text(`How to Play: When the red start Button is clicked users will be prompted to input a whole Positive integer.
     After you submit the prompt, two players with starting score at zero will take turns rolling the dice and add the total to their current score. 
     When the score of the respected player is greater than or equal to the goal chosen at the start of the game, then that player wins.
      Click the start button to begin!`);
    $startButton.click(fadeLanding);
  }
  function fadeLanding() {
    $('#startingScreen').css({ display: 'none' });
    document
      .querySelector('#startButton')
      .removeEventListener('click', fadeLanding);
    ui.renderDice();
    ui.renderPlayers();
    renderDisplay();
    whereisGoal();
    $('#goal').text(`THE GOAL:${engine.setGoal}`);
    $();
    document.querySelector('#diceHolder').addEventListener('click', rollDice); // this line creates click event to roll die
  }
  //created startButton Element and added to document
  function whereisGoal() {
    var setGoal = prompt('Input a Positive number to reach with dice rolls');
    if (isNaN(setGoal)) {
      alert('Please Select A Positive integer');
      whereisGoal();
    } else if (setGoal <= 0) {
      alert('Please Select A Positive integer');
      whereisGoal();
    } else if (!setGoal) {
      alert('Please Select A Positive integer');
      whereisGoal();
    } else {
      engine.setGoal = Number(setGoal);
    }
  }
  function randomInt() {
    return Math.floor(1 + Math.random() * 6);
  }
  function diceVal() {
    this.die1 = randomInt();
    this.die2 = randomInt(); //random integer between 1-6
    var total = this.die1 + this.die2;
    if (this.currentPlayer() == this.player1) {
      this.player1Rolls.push(total);
      $('#player1Box').css({ border: '5px solid green' });
      $('#player2Box').css({ border: '5px solid transparent' });
    }
    if (this.currentPlayer() == this.player2) {
      this.player2Rolls.push(total);
      $('#player2Box').css({ border: '5px solid green' });
      $('#player1Box').css({ border: '5px solid transparent' });
    }
  } //sets dice roll
  function currentPlayer() {
    if (this.turnCount % 2 !== 0) {
      return this.player1;
    } else {
      return this.player2;
    }
  }
  function player1Score() {
    var currentScore = engine.player1Rolls;
    var total = 0;
    for (var i = 0; i < currentScore.length; i++) {
      total += currentScore[i];
    }
    return total;
  }
  function player2Score() {
    var currentScore = engine.player2Rolls;
    var total = 0;
    for (var i = 0; i < currentScore.length; i++) {
      total += currentScore[i];
    }
    return total;
  }

  function rollDice() {
    engine.diceVal();
    engine.checkWin();
    renderDisplay();
    console.log(engine);
    console.log(engine.setGoal);
    console.log(engine.player1Score(), engine.player2Score());
    engine.turnCount++;
    if (player1Score() >= engine.setGoal || player2Score() >= engine.setGoal) {
      document
        .querySelector('#diceHolder')
        .removeEventListener('click', rollDice);
      $('#diceHolder').text('The game has Ended');
    }
  }
  function checkWin() {
    if (this.player1Score() >= this.setGoal) {
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

    if (this.player2Score() >= this.setGoal) {
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
  function restart() {
    $('#restart').off('click', restart);
    $('#restart').remove();
    location.reload();
  }
  function renderPlayers() {
    var $player1 = $('<div>', { id: 'player1Box' });
    var $player2 = $('<div>', { id: 'player2Box' });
    $player1.css({
      width: '200px',
      height: '100px',
      background: 'red',
      padding: '20px',
    });
    $player2.css({
      width: '200px',
      height: '100px',
      background: 'blue',
      padding: '20px',
    });
    var $body = $('body');
    var $pastScoreHolder1 = $('<div>', {
      id: 'pastScorePlayer1',
      class: 'previousScore',
    });
    var $pastScoreHolder2 = $('<div>', {
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
  function renderDice() {
    var $die1 = $('<div>', {
      id: 'die1',
      class: 'dice',
      width: '50px',
      height: '50px',
    });
    var $die2 = $('<div>', {
      id: 'die2',
      class: 'dice',
      width: '50px',
      height: '50px',
    });
    var $holdsDie = $('<div>', { id: 'diceHolder' });
    $('body').append($holdsDie);
    $holdsDie.append($die1, $die2);
    var $paragraph = $('<p>', { id: 'holderPara' });
    $('#diceHolder').append($paragraph);
    $paragraph.text('Click here to roll the dice');
  }
  function renderDisplay() {
    $('#die1').text(engine.die1);
    $('#die2').text(engine.die2);
    $('#player1Box').text(`Player 1 Current Score: ${engine.player1Score()}`);
    $('#player2Box').text(`Player 2 Current Score: ${engine.player2Score()}`);
    $('#pastScorePlayer1').text(
      `Previous Rolls Player One: ${engine.player1Rolls}`
    );
    $('#pastScorePlayer2').text(
      `Previous Rolls Player Two: ${engine.player2Rolls}`
    );
  }
  var engine = {
    currentPlayer: currentPlayer,
    turnCount: 1,
    diceVal: diceVal,
    rollDice: rollDice,
    die1: 0,
    die2: 0,
    player1Rolls: [],
    player2Rolls: [],
    checkWin: checkWin,
    whereisGoal: whereisGoal,
    player1Score: player1Score,
    player2Score: player2Score,
    player1: { name: 'Player One' },
    player2: { name: 'Player Two' },
  };
  var app = {
    init: init,
  };
  var ui = {
    renderDice: renderDice,
    renderPlayers: renderPlayers,
  };
  //objects for game

  init();
});
