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
    application.initialTurnOrder();
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
    this.manifestMoveSpace($movementZone1, 1);
    this.manifestMoveSpace($movementZone2, 2);
    this.manifestMoveSpace($movementZone3, 3);
    this.manifestMoveSpace($movementZone4, 4);
    this.manifestDice();
    this.manifestSigil();
    this.manifestPassTurnBtn();
    this.mainfestCurrentPlayer();
    // var $holdsDie = $('#dieHolder');
    // $holdsDie.click(gameEngine.rollDice); // this line creates click event to roll die
    console.log(application);
  }
  function manifestDice() {
    var $homeSquare = $('#pieceHome5');
    var $die1 = $('<div>', { class: 'dice', id: 'die1' });
    var $die2 = $('<div>', { class: 'dice', id: 'die2' });
    $die2.css({ marginLeft: '10px' });
    var $holdsDie = $('<div>', { id: 'dieHolder' });
    $holdsDie.append($die1, $die2);
    $homeSquare.append($holdsDie);
    return [$die1, $die2];
  }
  function manifestSigil() {
    var $firstPlayer = $('#pieceHome1'),
      $secondPlayer = $('#pieceHome7'),
      $thirdPlayer = $('#pieceHome3'),
      $fourthPlayer = $('#pieceHome9');

    for (var i = 0; i < 4; i++) {
      var $playerToken1 = $('<div>', { class: 'firstT tokens' }),
        $playerToken2 = $('<div>', { class: 'secondT tokens' }),
        $playerToken3 = $('<div>', { class: 'thirdT tokens' }),
        $playerToken4 = $('<div>', { class: 'fourthT tokens' });
      $playerToken1.css({ background: 'red' });
      $playerToken2.css({ background: 'green' });
      $playerToken3.css({ background: 'purple' });
      $playerToken4.css({ background: 'blue' });
      $firstPlayer.append($playerToken1);
      $secondPlayer.append($playerToken2);
      $thirdPlayer.append($playerToken3);
      $fourthPlayer.append($playerToken4);
    }
  }
  function manifestMoveSpace(zone, indx) {
    for (var i = 0; i < 30; i++) {
      var $smallDiv = $('<div>', {
        id: `space${i + 1}`,
        class: `movementSpace zone${indx}`,
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
  function manifestPassTurnBtn() {
    var $passTurnBtn = $('<div>', { id: 'passTurnBtn', class: 'red' });
    $passTurnBtn.css({ width: '40px', height: '20px', display: 'none' });
    $passTurnBtn.text(`Click Here end ${application.currentPlayer}'s turn`);
    $('#dieHolder').append($passTurnBtn);

    return (application.$passTurnBtn = $passTurnBtn);
  }
  function mainfestCurrentPlayer() {
    var $whosTurnDisplay = $('<div>', { id: 'currentPlayerDisplay' });
    $whosTurnDisplay.css({
      width: '200px',
      height: '60px',
      background: 'gray',
    });
    $('body').prepend($whosTurnDisplay);
  }
  //End Of manifestations

  function players() {
    var playerSigil1 = document.querySelectorAll('.firstT'),
      playerSigil2 = document.querySelectorAll('.secondT'),
      playerSigil3 = document.querySelectorAll('.thirdT'),
      playerSigil4 = document.querySelectorAll('.fourthT');
    var playersArray = [
      {
        name: 'Player 1',
        isTurnEnd: false,
        hasRolled: null,
        hasMoved: true,
        currentTurn: true,
        PlayerSigil: playerSigil1,
        turnOrderDieRoll: 0,
      },
      {
        name: 'Player 2',
        isTurnEnd: false,
        hasRolled: null,
        hasMoved: null,
        currentTurn: false,
        PlayerSigil: playerSigil2,
        turnOrderDieRoll: 0,
      },
      {
        name: 'Player 3',
        isTurnEnd: false,
        hasRolled: null,
        hasMoved: null,
        currentTurn: false,
        PlayerSigil: playerSigil3,
        turnOrderDieRoll: 0,
      },
      {
        name: 'Player 4',
        isTurnEnd: false,
        hasRolled: null,
        hasMoved: null,
        currentTurn: false,
        PlayerSigil: playerSigil4,
        turnOrderDieRoll: 0,
      },
    ];
    application.players = playersArray;
    return playersArray;
  }
  // function whosTurn() {
  //   var players = this.players();

  //   for (var i = 0; i < players.length; i++) {
  //     if (players[i].isMyturn || !players[i].hasMoved || players[i].hasRolled) {
  //       application.currentPlayer = players[i];
  //       return players[i].name;
  //     }
  //   }
  // }
  function initialTurnOrder() {
    var players = gameEngine.players();
    var $displayBox = $('#currentPlayerDisplay');
    for (var i = 0; i < players.length; i++) {
      if (players[i].currentTurn === true) {
        var currentPlayer = players[i];
        $displayBox.text(currentPlayer.name);
      }
    }
  }
  function endTurnQuery() {
    var currentPlayer = this.whosTurn().isTurnEnd,
      hasPlayerRolled = currentPlayer.hasRolled,
      hasMoved = currentPlayer.hasMoved;
    players;
    if (hasPlayerRolled && hasMoved) {
      var $passTurnBtn = application.$passTurnBtn;
      $passTurnBtn.css({ display: 'block' });
    }
  }

  function diceVal() {
    var random = Math.floor(1 + Math.random() * 6);
    var random2 = Math.floor(1 + Math.random() * 6); //random integer between 1-6
    this.dice1LastRoll = random;
    this.dice2LastRoll = random2;
  } //sets dice roll
  function rollDice() {
    gameEngine.diceVal();
    var valueOfDice = gameEngine.dice1LastRoll,
      valueOfDice2 = gameEngine.dice2LastRoll,
      $die1 = $('#die1'),
      $die2 = $('#die2');
    if (!haveTheyRolled) {
      $die1.text(valueOfDice);
      $die2.text(valueOfDice2);
      haveTheyRolled.hasRolled = false;
    }
  } // sets last roll and displays in on the screen
  function whoGoesFirst() {}
  var gameEngine = {
      // howManyPlayers: howManyPlayers,
      diceVal: diceVal,
      rollDice: rollDice,
      dice1LastRoll: 0,
      dice2LastRoll: 0,
      players: players,
      endTurnQuery: endTurnQuery,
      // movePieces: movePieces,
    },
    application = {
      initApp: initApp,
      initialTurnOrder: initialTurnOrder,
    },
    userInterphase = {
      // startLanding: startLanding,
      // fadeLanding: fadeLanding,
      manifestPassTurnBtn: manifestPassTurnBtn,
      manifestSigil: manifestSigil,
      manifestDice: manifestDice,
      gameBoard: gameBoard,
      manifestMoveSpace: manifestMoveSpace,
      mainfestCurrentPlayer: mainfestCurrentPlayer,
    };
  application.initApp();
  // function movePieces() {
  //   var $movementSpace = $('.movementSpace');
  //   var
  // }
});
