function GameBoard()
{
    this.board = null;
    this.size = 0;  // Number of square in each row AND the number of rows
    this.empty_squares = 0;

    this.resetBoard();
};

/**
 * constructBoard - create a square board array of a random row/column size and
 *  populates the board with empty square objects
 */
GameBoard.prototype.constructBoard = function()
{
    var size = Math.floor((Math.random() * (MAX_BOARD_SIZE - MIN_BOARD_SIZE)) + MIN_BOARD_SIZE);
    //var size = 3;
    this.size = size;

    // Populate board array with empty square objects
    for (var i = 0; i < size*size; i++)
    {
        this.board.push(
            {
                X: false,
                O: false,
                empty: true
            }
        );
    }

    this.empty_squares = this.board.length;
};

/**
 * resetBoard - "deletes" the current board and creates a new randomly-sized board
 */
GameBoard.prototype.resetBoard = function()
{
    this.board = [];
    this.size = 0;

    this.constructBoard();
};


/**
 * restartBoard - empties out all the squares of the current board
 */
GameBoard.prototype.restartBoard = function()
{
    this.empty_squares = this.board.length;

    for (var i = 0; i < this.board.length; i++)
    {
        this.board[i]['X'] = false;
        this.board[i]['O'] = false;
        this.board[i]['empty'] = true;
    }
}


/**
 *
 * @param square_index
 * @param player_char
 * @returns {boolean}
 */
GameBoard.prototype.setSquare = function(square_index, player_char)
{
    if ((this.board[square_index]['empty'] == true)
        && (square_index >= 0)
        && (square_index < this.board.length))
    {
        this.board[square_index][player_char] = true;
        this.board[square_index]['empty'] = false;

        this.empty_squares--;
        return true;
    }
    return false;
};

/**
 *
 */
GameBoard.prototype.isFull = function()
{
    return this.empty_squares == 0;
};


