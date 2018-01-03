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
    var $holdsDie = $('#dieHolder');
    $holdsDie.click(gameEngine.rollDice);
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
    $die2.css({ margin: '0 10px 0 10px' });
    var $holdsDie = $('<div>', { id: 'dieHolder' });
    $holdsDie.append($die1, $die2);
    $homeSquare.append($holdsDie);
  }
  function diceVal() {
    var random = Math.floor(1 + Math.random() * 6); //random integer between 1-6
    return random;
  }
  function rollDice() {
    var $valueOfDice = gameEngine.diceVal();
    var $valueOfDice2 = gameEngine.diceVal();
    var $die1 = $('#die1'),
      $die2 = $('#die2');
    $die1.text($valueOfDice);
    $die2.text($valueOfDice2);
    this.dice1LastRoll = $valueOfDice;
    this.dice2LastRoll = $valueOfDice2;
    console.log(gameEngine);
  }
  var gameEngine = {
      // howManyPlayers: howManyPlayers,
      diceVal: diceVal,
      rollDice: rollDice,
      dice1LastRoll: null,
      dice2LastRoll: null,
    },
    userInterphase = {
      // startLanding: startLanding,
      // fadeLanding: fadeLanding,
      manifestDice: manifestDice,
      gameBoard: gameBoard,
      createMoveSpace: createMoveSpace,
    },
    application = {
      initApp: initApp,
    };
  application.initApp();
});
