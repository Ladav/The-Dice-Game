/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- two consecutive six -> loss all score
*/


var scores, roundScore, previousDice, activePlayer, dice, gamePlaying, winningScore;

init();     // initialising variables

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying)
    {
        dice = Math.floor(Math.random()*6) + 1;  // generating a random number

        // displaying the result
        var diceDOM = document.querySelector('#dice-' + activePlayer);
        diceDOM.style.display = 'block';                    //displays the dice
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice !== 1)          // update the round score if the rolled number is not 1
            {
                if(previousDice === dice && previousDice === 6) 
                {
                    score[activePlayer] = 0;
                    document.getElementById('score-' + activePlayer).textContent = '0';
                    nextPlayer();                    
                }
                
                    
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                // twice six condition
                previousDice = dice;
            }
        else 
            {
                nextPlayer();               //next player
            }
    }
})


// updating the scores (global score)

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
    {
        // add current score to the global score
        score[activePlayer] += roundScore;

        // update UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        
        // getting new target score
        var target = document.querySelector('.text-box').value;
        //the next if will for all cases except ""(null string), flase, NaN, null, undefined
        if(target)
            {
                winningScore = target;
            }

        // check if any of them won
        if(score[activePlayer] >= winningScore)
        {
            document.getElementById('name-' + activePlayer).textContent = 'winner!'; 
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
        {
            nextPlayer();               // next player
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;
    document.getElementById('current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}

function init()
{
    score = [0, 0];         // total score of both the players
    roundScore = 0;         // dice result
    previousDice = 0;
    activePlayer = 0;       // 0->player 1 and 1->player 2
    gamePlaying = true;
    winningScore = 100;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    /// hiding the dice (image or component from the webpage) using 'style' object (display is a prop. or attri.)
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    
}






















