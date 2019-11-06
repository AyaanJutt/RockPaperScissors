// ROCK PAPER SCISSORS

// Global Vars (you may add more global vars, but you don't need to)
let count = 3;
let pPick = '';
let cPick = '';

let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 650;
cnv.height = 800;
initGraphics(800, 700);

// Event Listeners 
// All necessary listeners added for you. Note that the first three have arguments that are used in the event function's parameter variable.
// DO NOT ALTER THIS SECTION
document.getElementById('rock').addEventListener('click', () => pick('rock'));
document.getElementById('paper').addEventListener('click', () => pick('paper'));
document.getElementById('scissors').addEventListener('click', () => pick('scissors'));
document.getElementById('name-btn').addEventListener('click', setNames);

// Event Functions

// When the appropriate picture is selected, pPick and cPick
// are set, then a countdown timer begins.
// DO NOT ALTER THIS FUNCTION
function pick(playerClicked){
    pPick = playerClicked;
    cPick = computerChooses();
    countdown();
}

// Allows a 3, 2, 1 countdown before displaying the results of the round.
// DO NOT ALTER THIS SECTION
function countdown() {
    document.getElementById('countdown-area').style.visibility = "visible";
    if (count > 0) {
        document.getElementById('countdown-area').innerHTML = count
        count--;
        setTimeout(countdown, 700);
    }
    else {
        count = 3;
        document.getElementById('countdown-area').style.visibility = "hidden";
        showPicks(pPick, cPick);
        updateScoreArea(getWinner());
    }
}
/*---------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------*/

// Helper Functions

// Prompt the user for player and computer names, then display them in the appropriate area
// Parameters: none
// Return value: none
// Appx lines of code: 4
function setNames(){
    //prompts up a name for both comp and player and then displays it in appropriate area
    let playerName=prompt('Please enter your name','')
    document.getElementById('p-name').innerHTML=playerName
    let compName=prompt("Please enter the Computer's name",'')
    document.getElementById('c-name').innerHTML=compName
}

// Read the players name from the appropriate section in the HTML ()
// Parameters: none
// Return value: the player's name
// Appx lines of code: 1
function getPlayerName(){
    //returns player name
    return document.getElementById('p-name')
}

// Read the computer's name from the appropriate section in the HTML
// Parameters: none
// Return value: the computer's name
// Appx lines of code: 1
function getCompName(){
    //returns computer name
    return document.getElementById('c-name')
}



// Simulate the computer randomly choosing between rock, paper or scissors at 0.33 chance for each.
// Parameters: none
// Return value: A string - 'rock' , 'paper', or 'scissors'
// Appx lines of code: 8
function computerChooses(){
    //randomly chooses a number
   let randChoice=Math.random()
   //checks the number and displays rock, paper or scissors
   if (randChoice<=.33){
       return 'rock'
   } else if(randChoice<=.66){
       return 'paper'
   } else{
       return 'scissors'
   }
}

// Compare player pick and computer pick to see who wins
// Parameters: none
// Return value: The name of the player who won, or the string 'tie'
// Appx lines of code: 10
function getWinner(){
    //gets the points of both players
    let pScore=Number(document.getElementById('p-score').innerHTML)
    let cScore=Number(document.getElementById('c-score').innerHTML)

    //checks if player wins and adds a point to their board
    if(pScore==4 || cScore==4){
        //calls the creative function to produce confetti
        creative();
        console.log('test')
    }
    
    if(pPick=='scissors' && cPick=='paper'){
        pScore++
        document.getElementById('p-score').innerHTML=pScore
        return getPlayerName()
    } else if (pPick=='paper'&&cPick=='rock'){
        pScore++
        document.getElementById('p-score').innerHTML=pScore
        return getPlayerName()
    } else if(pPick=='rock'&&cPick=='scissors'){
        pScore++
        document.getElementById('p-score').innerHTML=pScore
        return getPlayerName()
    //checks if player and computer has the same score and ties it
    } else if(pPick===cPick){
        document.getElementById('p-score').innerHTML=pScore
        document.getElementById('c-score').innerHTML=cScore
        return 'tie'
    //if none of the above, comp wins
    }else{
        cScore++
        document.getElementById('c-score').innerHTML=cScore
        return getCompName()
    }
    
    
}

// Show the updated player/computer score in the table and display in text who won in the 'winner-text' area of the HTML
// Parameters: The name of the winner (you must use this parameter in your code, and not a global variable)
// Return value: none
// Appx lines of code: 12
//UNABLE TO WORK. Tried to manually obtain the comp/player name(doc.getElbyID('winner-text').innerHTML=getCompName()) console.log'ed winner and it produces the right name, however it does not display it
function updateScoreArea(winner){
    console.log(winner)
    //if player has the higher score then player wins
    if(winner==getPlayerName()){
        let winner=getPlayerName()
        document.getElementById('winner-text').innerHTML=winner+ "wins!"
    //if computer has the higher score then computer wins
    } else if (winner==getCompName()){
        let winner=getCompName()
        document.getElementById('winner-text').innerHTML=winner+ "wins!"
    //if tie display tie
    } else {
        document.getElementById('winner-text').innerHTML="It's a tie!"
    }
}

// Update the display area to show what the player/computer chose for this round
// Parameters: none
// Return value: none
// Appx lines of code: 2
function showPicks(){
    document.getElementById('p-move').src = 'images/' + pPick + '.png';
    document.getElementById('c-move').src = 'images/' + cPick + '.png';  
}

// Creativity Function. Add your own unique aspect to this project by coding
// your own function(s). Your function must have either parameters or return values
// or both. Change the name of the function to indicate what it will do.
//INCASE INCOMPLETED: Theory is that if the player/comp reaches 5 points, confetti drops from the screen.
//points of characters
function creative(){
    //draws canvas
    requestAnimationFrame(draw);
    
    function draw() {
        // Logic
        //creates a random color
        let colorNames = ['red', 'green', 'blue', 'orange', 'magenta', 'purple']
        //confetti array
        let confetti = []
        //random confetti
        for(let n=0; n<25;n++){
            confetti.push({ x: Math.randomDec(0, cnv.width), 
            y: Math.randomDec(0, cnv.height), 
            w: Math.randomDec(5, 10),
            h:Math.randomDec(5,10), 
            col: Math.randomElement(colorNames),
            spd:Math.randomDec(1,3) })
        }
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        //if either reaches 5 points then drop confetti
        
        for (let i = 0; i < confetti.length; i++) {
        //speed of confetti
         confetti[i].y += confetti[i].spd
        //color
        ctx.fillStyle=confetti[i].col
         // creates confetti
        ctx.fillRect(confetti[i].x, confetti[i].y, confetti[i].w,confetti[i].h)
        }
    // Request another Animation Frame
    requestAnimationFrame(draw);
    }
}
