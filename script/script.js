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
  function manifestDice() {}
  function diceRoll() {
    var random = Math;
  }
  var gameEngine = {
      // howManyPlayers: howManyPlayers,
      diceRoll: diceRoll,
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
