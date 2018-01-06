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
    this.renderCellClass();
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
  function renderCellClass() {
    var movementCells = document.querySelectorAll('.movementSpace');
    for (var i = 0; i < movementCells.length; i++) {
      movementCells[i].setAttribute('class', `cell${i + 1}`);
    }
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
  //End Of renders

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
  function manifestSharedSpace() {
    var moveZones = new Array(84); // shared move space
    moveZones.fill(null);

    moveZones.splice(15, 1, ['goalBreak1']); //at index 15 in the shared space arra I create goalBreak1 array
    moveZones.splice(36, 1, ['goalBreak2']); //at index 36 in the shared space array I create goalBreak2 array
    moveZones.splice(57, 1, ['goalBreak3']); //at index 57 in the shared space array I create goalBreak3 array
    moveZones.splice(78, 1, ['goalBreak4']); //at index 78 in the shared space array I create goalBreak4 array
    moveZones.splice(0, 1, ['home4']); //at index 0 in the shared space array i create home4 array
    moveZones.splice(21, 1, ['home1']); //at index 21 in the shared space array i create home1 array
    moveZones.splice(42, 1, ['home2']); //at index 42 in the shared space array i create home2 array
    moveZones.splice(63, 1, ['home3']); //at index 63 in the shared space array i create home3 array

    return moveZones;
  }
  function manifestGoalZones() {
    var theGoalZones = [];
    for (var i = 0; i < 4; i++) {
      //create 4 goal zone arrays
      var goalZones = new Array(11);
      goalZones.fill(null);
      goalZones.splice(10, 1, 'goal');
      theGoalZones.push(goalZones);
    }
    return theGoalZones;
  }
  function manifestSigilandSpace() {
    var sharedMoveZone = this.manifestSharedSpace(),
      player_1 = new Array(4).fill('first'),
      player_2 = new Array(4).fill('second'),
      player_3 = new Array(4).fill('third'),
      player_4 = new Array(4).fill('fourth');
    sharedMoveZone[21].splice(0, 0, player_1);
    sharedMoveZone[42].splice(0, 0, player_2);
    sharedMoveZone[63].splice(0, 0, player_3);
    sharedMoveZone[0].splice(0, 0, player_4);
    return sharedMoveZone;
  }
  function joinGoalToMoveSpace() {
    var sharedSpace = this.manifestSigilandSpace();
    var theGoalZones = this.manifestGoalZones();
    var firstGoalZone = theGoalZones[0];
    var secondGoalZone = theGoalZones[1];
    var thirdGoalZone = theGoalZones[2];
    var fourthGoalZone = theGoalZones[3];
    sharedSpace[15].splice(0, 0, firstGoalZone);
    sharedSpace[36].splice(0, 0, secondGoalZone);
    sharedSpace[57].splice(0, 0, thirdGoalZone);
    sharedSpace[78].splice(0, 0, fourthGoalZone);
    return sharedSpace;
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
      manifestSharedSpace: manifestSharedSpace,
      manifestSigilandSpace: manifestSigilandSpace,
      manifestGoalZones: manifestGoalZones,
      joinGoalToMoveSpace: joinGoalToMoveSpace,
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
      renderCellClass: renderCellClass,
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
