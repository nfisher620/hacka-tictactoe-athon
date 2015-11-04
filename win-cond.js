var board_sq_3 = [
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}
];

var board_sq_4 = [
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}
];

var board_sq_5 = [
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}
];

var board_sq_6 = [
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},{'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true},
    {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}, {'x':false, 'o':false, 'empty': true}
];

var win_condition = function(){
    self = this;
    self.check_row_win = function(board, turn){
        var row_length = Math.sqrt(board.length);
        var num_rows = Math.sqrt(board.length);
        for(var i=0;i<row_length - 1;i++){
            var rows_filled = 0;
            for(var j=0;j<num_rows - 1; j++){
                if(board[(i * row_length) + j][turn]){
                    rows_filled++;
                }
                else{
                    break;
                }
            }
            if(rows_filled == row_length){
                return true;
            }
        }
    }
    self.check_col_win = function(board,turn){
        var col_length = Math.sqrt(board.length);
        var num_cols = Math.sqrt(board.length);
        for(var i=0;i<col_length - 1;i++){
            var cols_filled = 0;
            for(var j=0;j<num_cols - 1; j+=num_cols){
                if(board[j][turn]){
                    cols_filled++;
                }
                else{
                    break;
                }
            }
            if(cols_filled == col_length){
                return true;
            }
        }
    }

    self.check_diagonal_win = function(board,turn){
        var col_length = Math.sqrt(board.length);
        var num_cols = Math.sqrt(board.length);
        var right_diagonals_filled = 0;
        var left_diagonals_filled = 0;
        for(var i=0;i<board.length - 1;i+=(col_length+1)) {
            if (board[i][turn]) {
                right_diagonals_filled++;
            }
            else{
                break;
            }
        }
        for(var j=col_length-1;j<num_cols - 1; j+=(col_length+1)){
            if(board[i][turn]){
                left_diagonals_filled++;
            }
            else{
                break;
            }
        }
        if(right_diagonals_filled || left_diagonals_filled == col_length){
            return true;
        }
    }
}