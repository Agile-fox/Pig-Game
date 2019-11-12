 /*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLoBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();


document.querySelector('.btn-roll').addEventListener('click', function btn() {
    if(gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 +'.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 +'.png';

        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }


        /*
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice === 6 && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }  

        lastDice = dice;
        */
     }
}); 

document.querySelector('.btn-hold').addEventListener('click', function() { 
    if (gamePlaying) {
                // Add current score to global score
        scores[activePlayer] += roundScore;
        

        //update ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore

        //Undefined, 0, null or "" are coerced to false
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'YOU WON';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {     
            //next player
            nextPlayer(); 
        }
    }
});


function nextPlayer() {
            //next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
    
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
    
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    //changing style file by javascript, it changed css display attirbute to none
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
////method 1 output plain text
//document.querySelector('#current-' + activePlayer).textContent = dice; 

////method 2 output in html
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

////showing our variables in console
//var x = document.querySelector('#score-0').textContent;
//console.log(x);





/*
//callback is a function not called by us but by another function, in this exmaple EvenListener method

function btn(){
    //Do something here
}

btn(); //call a function

document.querySelector('.btn-roll').addEventListener('click', btn); 

*/

//annonymous function. we declare it inside a another method. it dont have name so we cannot call it outside function. Perfect solution when we need a function in one place for example clicking a button to generate random number