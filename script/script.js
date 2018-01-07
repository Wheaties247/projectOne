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
    gameEngine.joinGoalToMoveSpace();
    application.currentPlayer();
    application.joinDOMnDigitalArrays();
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
    this.renderCellId();
    this.moveSpaceSelect();
    // var $holdsDie = $('#dieHolder');
    // $holdsDie.click(gameEngine.rollDice); // this line creates click event to roll die
    console.log(application, userInterphase);
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
        class: 'cell',
      }); //creates 30 divs
      $smallDiv.css({
        width: '32%',
        height: '8.5%',
        border: '1px solid black',
      });
      zone.append($smallDiv);
    } //places 30 divisions in a Zone
  }
  function moveSpaceSelect() {
    var moveSpace = [];
    var cells = [].slice.call(document.querySelectorAll('.cell'));
    // grabs all elements with the class cell and converts array of node lists into an array to preform array methods on
    var portion1 = cells.slice(20, 25).reverse();
    var portion2 = cells.slice(60, 70);
    var portion3 = cells[79];
    var portion4 = cells.slice(80, 90).reverse();
    var portion5 = cells.slice(110, 120).reverse();
    var portion6 = cells[100];
    var portion7 = cells.slice(90, 100);
    var portion8 = cells.slice(50, 60).reverse();
    var portion9 = cells[40];
    var portion10 = cells.slice(30, 40);
    var portion11 = cells.slice(0, 10);
    var portion12 = cells[19];
    var portion13 = cells.slice(25, 30).reverse();
    var sharedMoveSpace = moveSpace.concat(
      portion1,
      portion2,
      portion3,
      portion4,
      portion5,
      portion6,
      portion7,
      portion8,
      portion9,
      portion10,
      portion11,
      portion12,
      portion13
    );
    application.sharedMoveSpace = sharedMoveSpace;
    //got the 84 spaces that the sigil move on
    var goalZone = [];

    var zone1 = cells.slice(10, 20).reverse();
    var zone2 = cells.slice(70, 80).reverse();
    var zone3 = cells.slice(100, 110);
    var zone4 = cells.slice(40, 50);
    goalZone.push(zone1, zone2, zone3, zone4);
    userInterphase.goalZones = goalZone;

    return sharedMoveSpace;
  }
  function renderCellId() {
    var movementCells = document.querySelectorAll('.cell');
    for (var i = 0; i < movementCells.length; i++) {
      movementCells[i].setAttribute('id', `cell${i + 1}`);
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

    moveZones.splice(15, 1, ['goalBreak3']); //at index 15 in the shared space arra I create goalBreak3 array
    moveZones.splice(36, 1, ['goalBreak2']); //at index 36 in the shared space array I create goalBreak2 array
    moveZones.splice(57, 1, ['goalBreak1']); //at index 57 in the shared space array I create goalBreak1 array
    moveZones.splice(78, 1, ['goalBreak4']); //at index 78 in the shared space array I create goalBreak4 array
    moveZones.splice(0, 1, ['home4']); //at index 0 in the shared space array i create home4 array
    moveZones.splice(21, 1, ['home3']); //at index 21 in the shared space array i create home3 array
    moveZones.splice(42, 1, ['home2']); //at index 42 in the shared space array i create home2 array
    moveZones.splice(63, 1, ['home1']); //at index 63 in the shared space array i create home3 array
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
      player_1 = [].slice.call(document.querySelectorAll('.firstT')),
      // [].slice.call()-grabs all elements with the class cell and converts
      //array of node lists into an array to preform array methods on
      player_2 = [].slice.call(document.querySelectorAll('.secondT')),
      player_3 = [].slice.call(document.querySelectorAll('.thirdT')),
      player_4 = [].slice.call(document.querySelectorAll('.fourthT'));
    sharedMoveZone[21].splice(0, 0, player_3);
    sharedMoveZone[42].splice(0, 0, player_2);
    sharedMoveZone[63].splice(0, 0, player_1);
    sharedMoveZone[0].splice(0, 0, player_4);
    return sharedMoveZone;
  }
  function joinGoalToMoveSpace() {
    var sharedSpaceDigital = this.manifestSigilandSpace();
    var theGoalZones = this.manifestGoalZones();
    var firstGoalZone = theGoalZones[0];
    var secondGoalZone = theGoalZones[1];
    var thirdGoalZone = theGoalZones[2];
    var fourthGoalZone = theGoalZones[3];
    sharedSpaceDigital[15].splice(0, 0, firstGoalZone);
    sharedSpaceDigital[36].splice(0, 0, secondGoalZone);
    sharedSpaceDigital[57].splice(0, 0, thirdGoalZone);
    sharedSpaceDigital[78].splice(0, 0, fourthGoalZone);
    //i am going to hard code all the dom elements into the digital array
    sharedSpaceDigital[0].splice(0, 0, document.querySelector('#cell25'));
    sharedSpaceDigital.splice(1, 1, document.querySelector('#cell24'));
    sharedSpaceDigital.splice(2, 1, document.querySelector('#cell23'));
    sharedSpaceDigital.splice(3, 1, document.querySelector('#cell22'));
    sharedSpaceDigital.splice(4, 1, document.querySelector('#cell21'));
    sharedSpaceDigital.splice(5, 1, document.querySelector('#cell61'));
    sharedSpaceDigital.splice(6, 1, document.querySelector('#cell62'));
    sharedSpaceDigital.splice(7, 1, document.querySelector('#cell63'));
    sharedSpaceDigital.splice(8, 1, document.querySelector('#cell64'));
    sharedSpaceDigital.splice(9, 1, document.querySelector('#cell65'));
    sharedSpaceDigital.splice(10, 1, document.querySelector('#cell66'));
    sharedSpaceDigital.splice(11, 1, document.querySelector('#cell67'));
    sharedSpaceDigital.splice(12, 1, document.querySelector('#cell68'));
    sharedSpaceDigital.splice(13, 1, document.querySelector('#cell69'));
    sharedSpaceDigital.splice(14, 1, document.querySelector('#cell70'));
    sharedSpaceDigital[15].splice(0, 0, document.querySelector('#cell80'));
    sharedSpaceDigital.splice(16, 1, document.querySelector('#cell90'));
    sharedSpaceDigital.splice(17, 1, document.querySelector('#cell89'));
    sharedSpaceDigital.splice(18, 1, document.querySelector('#cell87'));
    sharedSpaceDigital.splice(19, 1, document.querySelector('#cell86'));
    sharedSpaceDigital.splice(20, 1, document.querySelector('#cell85'));
    sharedSpaceDigital[21].splice(0, 0, document.querySelector('#cell84'));
    sharedSpaceDigital.splice(22, 1, document.querySelector('#cell83'));
    sharedSpaceDigital.splice(23, 1, document.querySelector('#cell82'));
    sharedSpaceDigital.splice(24, 1, document.querySelector('#cell81'));
    sharedSpaceDigital.splice(25, 1, document.querySelector('#cell120'));
    sharedSpaceDigital.splice(26, 1, document.querySelector('#cell119'));
    sharedSpaceDigital.splice(27, 1, document.querySelector('#cell118'));
    sharedSpaceDigital.splice(28, 1, document.querySelector('#cell117'));
    sharedSpaceDigital.splice(29, 1, document.querySelector('#cell116'));
    sharedSpaceDigital.splice(30, 1, document.querySelector('#cell115'));
    sharedSpaceDigital.splice(31, 1, document.querySelector('#cell114'));
    sharedSpaceDigital.splice(32, 1, document.querySelector('#cell113'));
    sharedSpaceDigital.splice(33, 1, document.querySelector('#cell112'));
    sharedSpaceDigital.splice(34, 1, document.querySelector('#cell111'));
    sharedSpaceDigital.splice(35, 1, document.querySelector('#cell101'));
    sharedSpaceDigital[36].splice(0, 0, document.querySelector('#cell91'));
    sharedSpaceDigital.splice(37, 1, document.querySelector('#cell92'));
    sharedSpaceDigital.splice(38, 1, document.querySelector('#cell93'));
    sharedSpaceDigital.splice(39, 1, document.querySelector('#cell94'));
    sharedSpaceDigital.splice(40, 1, document.querySelector('#cell95'));
    sharedSpaceDigital.splice(41, 1, document.querySelector('#cell96'));
    sharedSpaceDigital[42].splice(0, 0, document.querySelector('#cell97'));
    sharedSpaceDigital.splice(43, 1, document.querySelector('#cell98'));
    sharedSpaceDigital.splice(44, 1, document.querySelector('#cell99'));
    sharedSpaceDigital.splice(45, 1, document.querySelector('#cell100'));
    sharedSpaceDigital.splice(46, 1, document.querySelector('#cell60'));
    sharedSpaceDigital.splice(47, 1, document.querySelector('#cell59'));
    sharedSpaceDigital.splice(48, 1, document.querySelector('#cell58'));
    sharedSpaceDigital.splice(49, 1, document.querySelector('#cell57'));
    sharedSpaceDigital.splice(50, 1, document.querySelector('#cell56'));
    sharedSpaceDigital.splice(51, 1, document.querySelector('#cell55'));
    sharedSpaceDigital.splice(52, 1, document.querySelector('#cell54'));
    sharedSpaceDigital.splice(53, 1, document.querySelector('#cell53'));
    sharedSpaceDigital.splice(54, 1, document.querySelector('#cell52'));
    sharedSpaceDigital.splice(55, 1, document.querySelector('#cell51'));
    sharedSpaceDigital.splice(56, 1, document.querySelector('#cell41'));
    sharedSpaceDigital[57].splice(0, 0, document.querySelector('#cell31'));
    sharedSpaceDigital.splice(58, 1, document.querySelector('#cell32'));
    sharedSpaceDigital.splice(59, 1, document.querySelector('#cell33'));
    sharedSpaceDigital.splice(60, 1, document.querySelector('#cell34'));
    sharedSpaceDigital.splice(61, 1, document.querySelector('#cell35'));
    sharedSpaceDigital.splice(62, 1, document.querySelector('#cell36'));
    sharedSpaceDigital[63].splice(0, 0, document.querySelector('#cell37'));
    sharedSpaceDigital.splice(64, 1, document.querySelector('#cell38'));
    sharedSpaceDigital.splice(65, 1, document.querySelector('#cell39'));
    sharedSpaceDigital.splice(66, 1, document.querySelector('#cell40'));
    sharedSpaceDigital.splice(67, 1, document.querySelector('#cell1'));
    sharedSpaceDigital.splice(68, 1, document.querySelector('#cell2'));
    sharedSpaceDigital.splice(69, 1, document.querySelector('#cell3'));
    sharedSpaceDigital.splice(70, 1, document.querySelector('#cell4'));
    sharedSpaceDigital.splice(71, 1, document.querySelector('#cell5'));
    sharedSpaceDigital.splice(72, 1, document.querySelector('#cell6'));
    sharedSpaceDigital.splice(73, 1, document.querySelector('#cell7'));
    sharedSpaceDigital.splice(74, 1, document.querySelector('#cell8'));
    sharedSpaceDigital.splice(75, 1, document.querySelector('#cell9'));
    sharedSpaceDigital.splice(76, 1, document.querySelector('#cell10'));
    sharedSpaceDigital.splice(77, 1, document.querySelector('#cell20'));
    sharedSpaceDigital[78].splice(0, 0, document.querySelector('#cell30'));
    sharedSpaceDigital.splice(79, 1, document.querySelector('#cell29'));
    sharedSpaceDigital.splice(80, 1, document.querySelector('#cell28'));
    sharedSpaceDigital.splice(81, 1, document.querySelector('#cell27'));
    sharedSpaceDigital.splice(82, 1, document.querySelector('#cell26'));
    sharedSpaceDigital.splice(83, 1, document.querySelector('#cell25'));
    //end of hard coding
    application.sharedSpaceDigital = sharedSpaceDigital;
    return sharedSpaceDigital;
  }
  function joinDOMnDigitalArrays() {
    var sharedSpaceDigital = this.sharedSpaceDigital;
    var sharedSpaceDOM = this.sharedMoveSpace;
    for (var i = 0; i < sharedSpaceDOM.length; i++) {
      sharedSpaceDOM[i].dataset.index = `${i}`;
    }
    console.log(sharedSpaceDOM);
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
      joinDOMnDigitalArrays: joinDOMnDigitalArrays,
    },
    userInterphase = {
      // startLanding: startLanding,
      // fadeLanding: fadeLanding,
      renderCellId: renderCellId,
      renderPassTurnBtn: renderPassTurnBtn,
      renderSigil: renderSigil,
      renderDice: renderDice,
      renderGameBoard: renderGameBoard,
      renderMoveSpace: renderMoveSpace,
      renderCurrentPlayer: renderCurrentPlayer,
      moveSpaceSelect: moveSpaceSelect,
    };
  application.initApp();
  // function movePieces() {
  //   var $movementSpace = $('.movementSpace');
  //   var
  // }
});
