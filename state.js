function State(game)
{

}
State.prototype.init = function(game) {};
State.prototype.execute = function(game) {};


function StateInit(game)
{
    State.call(this, game);
}
StateInit.prototype = new State();
StateInit.prototype.constructor = StateInit;
StateInit.prototype.init = function(game)
{

};
StateInit.prototype.execute = function(game)
{
    if (game.winner == 'X')
        game.changeState(new StateTurnO(game));
    else
        game.changeState(new StateTurnX(game));
};


function StateTurnX(game)
{
    this.has_won = false;
    State.call(this, game);
}
StateTurnX.prototype = new State();
StateTurnX.prototype.constructor = StateTurnX;
StateTurnX.prototype.init = function(game)
{
    game.turn = 'X';
};
StateTurnX.prototype.execute = function(game)
{
    this.has_won = game.checkWinConditions();
    if (this.has_won)
        game.changeState(new StateGameOver(game));
    else if (game.game_board.isFull())
        game.changeState(new StateGameOverDraw(game));
    else
        game.changeState(new StateTurnO(game));
};


function StateTurnO(game)
{
    this.has_won = false;
    State.call(this, game);
}
StateTurnO.prototype = new State();
StateTurnO.prototype.constructor = StateTurnO;
StateTurnO.prototype.init = function(game)
{
    game.turn = 'O';
};
StateTurnO.prototype.execute = function(game)
{
    this.has_won = game.checkWinConditions();
    if (this.has_won)
        game.changeState(new StateGameOver(game));
    else if (game.game_board.isFull())
        game.changeState(new StateGameOverDraw(game));
    else
        game.changeState(new StateTurnX(game));
};


function StateGameOver(game)
{
    State.call(this, game);
}
StateGameOver.prototype = new State();
StateGameOver.prototype.constructor = StateGameOver;
StateGameOver.prototype.init = function(game)
{
    game.declareWinner();
};
StateGameOver.prototype.execute = function(game)
{
};


function StateGameOverDraw(game)
{
    State.call(this, game);
}
StateGameOverDraw.prototype = new State();
StateGameOverDraw.prototype.constructor = StateGameOverDraw;
StateGameOverDraw.prototype.init = function(game)
{
    game.declareDraw();
};
StateGameOverDraw.prototype.execute = function(game)
{
};