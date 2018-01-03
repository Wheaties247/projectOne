$(function() {
  // function howManyPlayers() {
  //   var $playerSelection = $('<select>', { id: 'playerSelection' });
  //   $('#startingScreen').append($playerSelection);
  //   var $numOfPlayers = $('<option>');
  //   $numOfPlayers;
  //   $playerSelection.append(numOfPlayers);
  // }
  // function startLanding() {
  //   var $startGameScreen = $('<div>', { id: 'startingScreen' }).css({
  //     background: 'black',
  //     width: '99%',
  //     height: '700px',
  //     border: '4px solid orange',
  //   });
  //   $('body').append($startGameScreen);
  //   //created background div for start game UI
  //   var $startButton = $('<div>', { id: 'startButton' });
  //   $startButton.css({
  //     height: '70px',
  //     width: '200px',
  //     background: 'red',
  //     border: '1px solid black',
  //     borderRadius: '20px',
  //     cursor: 'pointer',
  //   });
  //   $startButton.text('Click here to start');
  //   $startGameScreen.append($startButton);
  //   startButton.addEventListener('click', fadeLanding);
  //   return $startGameScreen;
  //   //created startButton Element and added to document
  // }
  // function fadeLanding() {}

  function initApp() {
    // userInterphase.startLanding();
    userInterphase.gameBoard();
  }
  function gameBoard() {
    var $mainGameScreen = $('<div>', { id: 'gameScreen' }).css({
      background: 'black',
      width: '790px',
      height: '790px',
      border: '4px solid red',
    });
    $('body').append($mainGameScreen);
    //created game Background Screen
    for (var i = 0; i < 9; i++) {
      var $div = $('<div>', { id: 'pieceHome' + (i + 1) });
      //gave each home div an id of PieceHome and a unique number coresponding with it
      $div.css({
        background: 'orange',
        width: '32%',
        height: '32%',
        border: '2px solid blue',
      });
      $($mainGameScreen).append($div);
    } //created 9 division elements in the main game screen

    var $movementZone1 = $('#pieceHome4'),
      $movementZone2 = $('#pieceHome2'),
      $movementZone3 = $('#pieceHome8'),
      $movementZone4 = $('#pieceHome6');
    this.createMoveSpace($movementZone1, 1);
    this.createMoveSpace($movementZone2, 2);
    this.createMoveSpace($movementZone3, 3);
    this.createMoveSpace($movementZone4, 4);
    this.manifestDice();
    this.manifestPlayers();
    var $holdsDie = $('#dieHolder');
    $holdsDie.click(gameEngine.rollDice); // this line creates click event to roll die
  }
  function createMoveSpace(zone, indx) {
    for (var i = 0; i < 30; i++) {
      var $smallDiv = $('<div>', {
        id: `space${i + 1}`,
        class: `movementSpace-zone${indx}`,
      }); //creates 30 divs
      $smallDiv.css({
        width: '32%',
        height: '8.5%',
        background: 'teal',
        border: '1px solid black',
      });
      zone.append($smallDiv);
    } //places 30 divisions in a Zone
  }

  function manifestDice() {
    var $homeSquare = $('#pieceHome5');
    var $die1 = $('<div>', { class: 'dice', id: 'die1' });
    var $die2 = $('<div>', { class: 'dice', id: 'die2' });
    $die2.css({ marginLeft: '10px' });
    var $holdsDie = $('<div>', { id: 'dieHolder' });
    $holdsDie.append($die1, $die2);
    $homeSquare.append($holdsDie);
  }
  function diceVal() {
    var random = Math.floor(1 + Math.random() * 6);
    var random2 = Math.floor(1 + Math.random() * 6); //random integer between 1-6
    this.dice1LastRoll = random;
    this.dice2LastRoll = random2;
  }
  function rollDice() {
    gameEngine.diceVal();
    var $valueOfDice = gameEngine.dice1LastRoll;
    var $valueOfDice2 = gameEngine.dice2LastRoll;
    var $die1 = $('#die1'),
      $die2 = $('#die2');
    $die1.text($valueOfDice);
    $die2.text($valueOfDice2);
  }
  function manifestPlayers() {
    var $firstPlayer = $('#pieceHome1'),
      $secondPlayer = $('#pieceHome7'),
      $thirdPlayer = $('#pieceHome3'),
      $fourthPlayer = $('#pieceHome9');

    for (var i = 0; i < 4; i++) {
      var $playerToken = $('<div>', { class: 'firstTokens' });
      $playerToken.css({
        width: '15px',
        height: '15px',
        background: 'red',
        border: '1px solid black',
        borderRadius: '6px',
        margin: '1px',
      });
      $firstPlayer.append($playerToken);
    }
    for (var i = 0; i < 4; i++) {
      var $player2Token = $('<div>', { class: 'secondTokens' });
      $player2Token.css({
        width: '15px',
        height: '15px',
        background: 'green',
        border: '1px solid black',
        borderRadius: '6px',
        margin: '1px',
      });
      $secondPlayer.append($player2Token);
    }
    for (var i = 0; i < 4; i++) {
      var $player3Token = $('<div>', { class: 'ThirdTokens' });
      $player3Token.css({
        width: '15px',
        height: '15px',
        background: 'blue',
        border: '1px solid black',
        borderRadius: '6px',
        margin: '1px',
      });
      $thirdPlayer.append($player3Token);
    }
    for (var i = 0; i < 4; i++) {
      var $player4Token = $('<div>', { class: 'FourthTokens' });
      $player4Token.css({
        width: '15px',
        height: '15px',
        background: 'purple',
        border: '1px solid black',
        borderRadius: '6px',
        margin: '1px',
      });
      $fourthPlayer.append($player4Token);
    }
  }
  var gameEngine = {
      // howManyPlayers: howManyPlayers,
      diceVal: diceVal,
      rollDice: rollDice,
      dice1LastRoll: 0,
      dice2LastRoll: 0,
    },
    userInterphase = {
      // startLanding: startLanding,
      // fadeLanding: fadeLanding,
      manifestPlayers: manifestPlayers,
      manifestDice: manifestDice,
      gameBoard: gameBoard,
      createMoveSpace: createMoveSpace,
    },
    application = {
      initApp: initApp,
    };
  application.initApp();
});
