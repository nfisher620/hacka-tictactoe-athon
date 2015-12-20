var debug = false;

function Win_Cond() {}

function Win_Cond_Row() {
    Win_Cond.call(this);
}

Win_Cond_Row.prototype = new Win_Cond();
Win_Cond_Row.prototype.constructor = Win_Cond_Row;
Win_Cond_Row.prototype.check = function (board, turn) {
    var row_length = Math.sqrt(board.length);
    var num_rows = Math.sqrt(board.length);
    if (debug) console.log('row_length and num_rows is: ', row_length, num_rows);
    for (var i = 0; i < row_length; i++) {
        var rows_filled = 0;
        for (var j = 0; j < num_rows; j++) {
            if (debug) console.log('i and j are: ' + i + ' ' + j);
            if (board[(i * row_length) + j][turn]) {
                rows_filled++;
                if (debug) console.log('rows_filled is: ', rows_filled);
            }
            else {
                break;
            }
        }
        if (rows_filled == row_length) {
            return true;
        }
    }
    return false;
};

function Win_Cond_Col() {
    Win_Cond.call(this);
}

Win_Cond_Col.prototype = new Win_Cond();
Win_Cond_Col.prototype.constructor = Win_Cond_Col;
Win_Cond_Col.prototype.check = function(board,turn){
    var col_length = Math.sqrt(board.length);
    var num_cols = Math.sqrt(board.length);
    var cols_filled = 0;
    for (var i = 0; i < num_cols; i++)
    {
        cols_filled = 0;
        for (var j = i; j < board.length; j += num_cols)
        {
            if (board[j][turn])
            {
                cols_filled++;
            }
        }
        if(cols_filled == col_length){
            return true;
        }
    }

    return false;
};

function Win_Cond_Diag() {
    Win_Cond.call(this);
}

Win_Cond_Diag.prototype = new Win_Cond();
Win_Cond_Diag.prototype.constructor = Win_Cond_Diag;
Win_Cond_Diag.prototype.check = function(board,turn){
    var col_length = Math.sqrt(board.length);
    var num_cols = Math.sqrt(board.length);
    var right_diagonals_filled = 0;
    var left_diagonals_filled = 0;
    for(var i=0;i<col_length;i++) {
        var j = i;
        if(board[(i*col_length) + j][turn]){
            right_diagonals_filled++;
        }
        else{
            break;
        }
    }
    for(a=0;a<num_cols; a++){
        var b = num_cols - 1 - a;
        if(board[(b*col_length) + a][turn]){
            left_diagonals_filled++;
        }
        else{
            break;
        }
    }
    if(right_diagonals_filled == num_cols || left_diagonals_filled == num_cols){
        return true;
    }
    return false;
};

