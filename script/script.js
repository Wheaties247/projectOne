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
    userInterphase.renderGameBoard();
    application.currentPlayer();
  }
  function renderGameBoard() {
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
    this.renderMoveSpace($movementZone1, 1);
    this.renderMoveSpace($movementZone2, 2);
    this.renderMoveSpace($movementZone3, 3);
    this.renderMoveSpace($movementZone4, 4);
    this.renderDice();
    this.renderSigil();
    this.renderPassTurnBtn();
    this.renderCurrentPlayer();
    // var $holdsDie = $('#dieHolder');
    // $holdsDie.click(gameEngine.rollDice); // this line creates click event to roll die
    console.log(application);
  }
  function renderDice() {
    var $homeSquare = $('#pieceHome5');
    var $die1 = $('<div>', { class: 'dice', id: 'die1' });
    var $die2 = $('<div>', { class: 'dice', id: 'die2' });
    $die2.css({ marginLeft: '10px' });
    var $holdsDie = $('<div>', { id: 'dieHolder' });
    $holdsDie.append($die1, $die2);
    $homeSquare.append($holdsDie);
    return [$die1, $die2];
  }
  function renderSigil() {
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
  function renderMoveSpace(zone, indx) {
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
  function renderPassTurnBtn() {
    var $passTurnBtn = $('<div>', { id: 'passTurnBtn', class: 'red' });
    $passTurnBtn.css({ width: '40px', height: '20px', display: 'none' });
    $passTurnBtn.text(`Click Here end ${application.currentPlayer}'s turn`);
    $('#dieHolder').append($passTurnBtn);

    return (application.$passTurnBtn = $passTurnBtn);
  }
  function renderCurrentPlayer() {
    var $divHUD = $('<div>', { id: 'containerHUD' });
    $('body').prepend($divHUD);
    for (var i = 0; i < 4; i++) {
      var $whosTurnDisplay = $('<div>', { id: `currentPlayerDisplay${i + 1}` });
      $whosTurnDisplay.css({
        width: '200px',
        height: '60px',
        background: 'gray',
        border: '1px solid black',
      });
      $($divHUD).append($whosTurnDisplay);
    }
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
  function manifestMoveSpace() {
    var moveZones = new Array(4);
    for (var i = 0; i < moveZones.length; i++) {
      moveZones[i] = new Array(89);
      moveZones[i].fill(null);
      moveZones[i].splice(78, 1, 'goalBreak');
      moveZones[i].splice(88, 1, 'goal');
    }
    return moveZones;
  }
  function manifestSigil() {
    var abstractSpaces = this.manifestMoveSpace(),
      moveZone1 = abstractSpaces[0],
      moveZone2 = abstractSpaces[1],
      moveZone3 = abstractSpaces[2],
      moveZone4 = abstractSpaces[3],
      player_1 = new Array(4).fill('first'),
      player_2 = new Array(4).fill('second'),
      player_3 = new Array(4).fill('third'),
      player_4 = new Array(4).fill('fourth');
    moveZone1.splice(0, 1, player_1);
    moveZone2.splice(0, 1, player_2);
    moveZone3.splice(0, 1, player_3);
    moveZone4.splice(0, 1, player_4);
    return [moveZone1, moveZone2, moveZone3, moveZone4];
  }
  function currentPlayer() {
    var players = gameEngine.players();
    var $displayBox1 = $('#currentPlayerDisplay1'),
      $displayBox2 = $('#currentPlayerDisplay2'),
      $displayBox3 = $('#currentPlayerDisplay3'),
      $displayBox4 = $('#currentPlayerDisplay4');

    for (var i = 0; i < players.length; i++) {
      if (players[i].currentTurn === true) {
        var currentPlayer = players[i],
          whosTurn = ` it is ${players[i].name}'s turn.`,
          hasRolled = `${players[i].name} rolled?: ${players[i].hasRolled}`,
          hasMoved = `${players[i].name} moved? : ${players[i].hasMoved}`,
          turnOver = `${players[i].name}'s turn over?: ${players[i].isTurnEnd}`;
        application.currentPlayer = players[i];
        $displayBox1.text(whosTurn);
        $displayBox2.text(hasRolled);
        $displayBox3.text(hasMoved);
        $displayBox4.text(turnOver);
      } else {
        // nextPlayersTurn(players[i + 1]);
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
    this.diceVal();
    var valueOfDice = gameEngine.dice1LastRoll,
      valueOfDice2 = gameEngine.dice2LastRoll,
      $die1 = $('#die1'),
      $die2 = $('#die2');
    if (this.players.haveTheyRolled) {
      $die1.text(valueOfDice);
      $die2.text(valueOfDice2);
      haveTheyRolled.hasRolled = false;
    }
  } // sets last roll and displays in on the screen
  function whoGoesFirst() {}
  var gameEngine = {
      manifestMoveSpace: manifestMoveSpace,
      manifestSigil: manifestSigil,
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
      currentPlayer: currentPlayer,
    },
    userInterphase = {
      // startLanding: startLanding,
      // fadeLanding: fadeLanding,
      renderPassTurnBtn: renderPassTurnBtn,
      renderSigil: renderSigil,
      renderDice: renderDice,
      renderGameBoard: renderGameBoard,
      renderMoveSpace: renderMoveSpace,
      renderCurrentPlayer: renderCurrentPlayer,
    };
  application.initApp();
  // function movePieces() {
  //   var $movementSpace = $('.movementSpace');
  //   var
  // }
});
