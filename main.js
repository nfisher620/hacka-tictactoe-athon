//document.addEventListener("DOMContentLoaded" , function(event)
$(document).ready(function()
{
    var game = new Game();
    game_ref = game;

    document.getElementById('restart-game').addEventListener('click', function()
    {
        game.restartGame();
    });
    document.getElementById('reset-game').addEventListener('click', function()
    {
        game.resetGame();
        console.log("Resetting game with board of size " + game_ref.game_board.board.length);
    });
});