function Game()
{
    this.game_board = null;
    this.curr_state = null;
    this.winner = 'O';
    this.turn = 'X';
    this.game_over = false;
    this.win_conditions = [];
    this.games_played = 0;
    this.players = [];

    this.game_over_sounds = [];
    this.init();
}


/**
 * init - starts the entire game
 */
Game.prototype.init = function()
{
    this.createPlayers();
    this.getGameOverSounds();
    this.updateStatsDisplay();
    this.enableButtons();
    this.game_board = new GameBoard();
    this.constructBoardInDom();
    this.setWinConditions();
    this.changeState(new StateInit(this));
    this.run();
};


Game.prototype.createPlayers = function()
{
    this.players.push(new PlayerX());
    this.players.push(new PlayerO());
};


Game.prototype.getGameOverSounds = function()
{
    //this.game_over_sounds.push(document.getElementById('sfx_almostthere'));
    //this.game_over_sounds.push(document.getElementById('sfx_jarjar'));
    this.game_over_sounds.push(document.getElementById('sfx_tooeasy'));
    //this.game_over_sounds.push(document.getElementById('sfx_breath'));
    this.game_over_sounds.push(document.getElementById('sfx_father'));
    //this.game_over_sounds.push(document.getElementById('sfx_rebelscum'));
    //this.game_over_sounds.push(document.getElementById('sfx_stayontarget'));
    //this.game_over_sounds.push(document.getElementById('sfx_theyvestopped'));
    this.game_over_sounds.push(document.getElementById('sfx_trap'));
    //this.game_over_sounds.push(document.getElementById('sfx_itsworking'));
};
Game.prototype.playGameOverSound = function()
{
    var which_sound = Math.floor((Math.random() * this.game_over_sounds.length));
    this.game_over_sounds[which_sound].play();
};


/**
 * setWinConditions - creates the set of win conditions for the game
 */
Game.prototype.setWinConditions = function()
{
    this.win_conditions.push(new Win_Cond_Row());
    this.win_conditions.push(new Win_Cond_Col());
    this.win_conditions.push(new Win_Cond_Diag());
};


/**
 * checkWinConditions - checks each win condition if any of them have been met
 * @returns {boolean} - whether a win condition has been met
 */
Game.prototype.checkWinConditions = function()
{
    // Go through each win condition in the array
    for (var i = 0; i < this.win_conditions.length; i++)
    {
        // If we meet a win condition, we can return the function right there;
        // no need to check the other win conditions anymore.
        if (this.win_conditions[i].check(this.game_board.board, this.turn))
            return true;
    }
    return false;
};


/**
 * run - the main controller of the game's state-machine
 */
Game.prototype.run = function(index)
{
    this.display(index);
    this.curr_state.execute(this);
    // For the skeleton html
    //this.displayTest();
    //this.display(index);
};


/**
 * Changes the state for the state-machine
 * @param new_state - the state to change to
 */
Game.prototype.changeState = function(new_state)
{
    delete this.curr_state;

    this.curr_state = new_state;
    this.curr_state.init(this);
};


/**
 * restart - Start a brand new game (don't reset stats)
 */
Game.prototype.restartGame = function()
{
    this.enableButtons();
    this.game_board.restartBoard();
    this.constructBoardInDom();
    this.game_over = false;
    this.changeState(new StateInit(this));
    this.run();
    this.updateStatsDisplay();
};


/**
 * resetGame - Basically the constructor.
 */
Game.prototype.resetGame = function()
{
    // Call this to prevent the current game board from being clickable
    // if it's not yet getting garbage-collected.
    this.disableButtons();

    delete this.game_board;
    delete this.curr_state;
    this.winner = 'O';
    this.turn = 'X';
    this.game_over = false;
    this.win_conditions = [];
    this.games_played = 0;
    this.players = [];
    this.game_over_sounds = [];

    this.init();
};


/**
 * constructBoardInDom - Uses the game board to layout the game board squares
 *  in the page view.
 */
Game.prototype.constructBoardInDom = function()
{
    var game_area = $('.game-area');

    // Empty out the game board display
    game_area.html('');

    var row_size = this.game_board.size;
    var num_rows = this.game_board.size;

    // Calculate the height and width of each square as a percentage in
    // relation to its container div.
    var div_width = 100.0 / row_size;
    var div_height = 100.0 / num_rows;
    // Display each square according to how it's been filled.
    for (var i = 0; i < this.game_board.board.length; i++)
    {
        var img_path = EMPTY_IMAGE_PATH;
        var square_button = $('<button>').addClass('empty-square');
        square_button.css(
            {
                width: div_width + '%',
                height: div_height + '%',
                float: 'left'
            }
        );
        square_button.attr('index', i);
        var bg_img  = $('<img>').attr('src', img_path);
        square_button.append(bg_img);
        game_area.append(square_button);
    }
};


/**
 * Sets the image to be shown for the square picked in the game
 * @param index - the specific square on the board to set an image to it
 */
Game.prototype.display = function(index)
{
    var square = $('.empty-square[index=' + index + ']>img');

    switch(this.turn)
    {
        case 'X':
            square.attr('src', X_IMAGE_PATH);
            break;
        case 'O':
            square.attr('src', O_IMAGE_PATH);
            break;
        default:
            square.attr('src', EMPTY_IMAGE_PATH);
            break;
    }
};


/**
 * displayTest - updates the game in the DOM
 */
Game.prototype.displayTest = function()
{
    var game_area = $('#game-area');

    // Empty out the game board display
    game_area.html('');

    // Display whose turn it is
    if (!this.game_over)
        $('#player-turn').text('Turn ' + this.turn);

    var row_size = this.game_board.size;
    var num_rows = this.game_board.size;

    // Display each square according to how it's been filled.
    for (var i = 0; i < num_rows; i++)
    {
        for (var j = 0; j < row_size; j++)
        {
            var square = 'E';
            if (this.game_board.board[i*row_size + j]['X'] == true)
                square = 'X';
            else if (this.game_board.board[i*row_size + j]['O'] == true)
                square = 'O';
            game_area.append($('<span>').text(square));
        }
        game_area.append($('<br>'));
    }
};


/**
 * squarePicked - event-handler for when the player picks a square to fill
 * @param button - the button that was clicked (unnecessary)
 */
Game.prototype.squarePicked = function(button)
{
    //var index = $('#square-number').val();
    var index = $(button).attr('index');
    console.log("Square picked: " + index);

    if (this.game_board.setSquare(index, this.turn))
    {
        if (this.turn == 'X')
            this.players[PLAYER_X].playSound();
        else
            this.players[PLAYER_O].playSound();

        this.run(index);
    }
}


/**
 * declareWinner - sets win variables and stats
 */
Game.prototype.declareWinner = function()
{
    this.disableButtons();

    // This is only for the skeleton test html page
    //this.displayWinnerTest();

    this.games_played++;

    if (this.turn == 'X')
    {
        this.players[PLAYER_X].stopSound();
        this.players[PLAYER_X].winGame();
    }
    else
    {
        this.players[PLAYER_O].stopSound();
        this.players[PLAYER_O].winGame();
    }

    this.game_over = true;
    this.winner = this.turn;

    this.updateStatsDisplay();
    $(".game-area").append($("<h3>").addClass("neon-tubing").html(this.winner + " won!"));
    this.playGameOverSound();
};


/**
 * declareDraw - Changes game stats and declares a tie
 */
Game.prototype.declareDraw = function()
{
    this.disableButtons();

    this.games_played++;

    this.game_over = true;

    this.updateStatsDisplay();
    $(".game-area").append($("<h3>").addClass("neon-tubing").html("Draw"));
    this.players[PLAYER_X].stopSound();
    this.players[PLAYER_O].stopSound();
    this.playGameOverSound();
};


/**
 * updateStatsDisplay - updates the DOM view of the game stats
 */
Game.prototype.updateStatsDisplay = function()
{
    // Grab the winner's DOM element
    $('.x-wins-val').text(this.players[PLAYER_X].getWins());
    $('.o-wins-val').text(this.players[PLAYER_O].getWins());
    $('.games-played-val').text(this.games_played);
};


/**
 * disableButtons - removes clickablity of the game board squares
 */
Game.prototype.disableButtons = function()
{
    $('.game-area').off('click', 'button');
};


/**
 * enableButtons - adds clickability of the game board squares
 */
Game.prototype.enableButtons = function()
{
    var the_game = this;

    $('.game-area').on('click', 'button', function()
    {
        the_game.squarePicked(this);
    });
};