var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedColour = [];
var level = 0;
var gameStart = false;

function nextSequence() {
    userClickedColour = []; //precisa adicionar para limpar os botões que já foram clicados
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    
    buttonAnimation(randomChosenColour);
    playButton(randomChosenColour);
    gamePattern.push(randomChosenColour);

    level++;
    $("h1").text(`Level ${level}`);
}

//Animation Button - add class on the buttons
function buttonAnimation(color){
    $(`#${color}`).addClass("pressed");
        setTimeout(function() {
            $(`#${color}`).removeClass("pressed");
        }, 100);
}

//Sound Button - add play button sound
function playButton(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//Player click
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedColour.push(userChosenColour);

    playButton(userChosenColour);
    buttonAnimation(userChosenColour);

    checkAnswer(userClickedColour.length - 1);
});

//Step - Start the game

$("body").on("keypress", function(event) {  
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    }
});

//Step - Check Answer
function checkAnswer(currentLevel) {
    if (userClickedColour[currentLevel] === gamePattern[currentLevel]) {
        //Aqui ele espera os dois arrays terem o mesmo tamanho para dar seguimento
        if (userClickedColour.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        gameOver();  
        startOver();      
    }
}

function gameOver() {
    $("h1").text(`Game Over, Press Any Key to Restart`);
        
    var audioWrong = new Audio(`sounds/wrong.mp3`);
    audioWrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
        $(`body`).removeClass("game-over");
    }, 300);
}

function startOver() {
    gameStart = false
    level = 0;
    gamePattern = [];
    userClickedColour = [];
}