var gamesPlayed=0;
var xWins=0;
var oWins=0;

//need a conditional statement for if x wins, increase xWins counter by 1 and vice versa

$(document).ready(function(){
    $('.stats-container, #reset-game').on("click", "button", function () {
        console.log('you been clicked');
        $('.games-played-val').text(gamesPlayed).css("text-align","center:");
        $('.x-wins-val').text(xWins).css("text align","center");
        $('.o-wins-val').text(oWins).css("text align","center");
        gamesPlayed+=1;
        xWins=0;
        oWins=0;
        displayStats();
    });
});
function displayStats(){

    $('.games-played-val').text(gamesPlayed).css("text-align","center");
    $('.x-wins-val').text(xWins).css("text-align","center");
    $('.o-wins-val').text(oWins).css("text-align","center");
}








