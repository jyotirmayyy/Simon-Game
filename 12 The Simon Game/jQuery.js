/* jshint esversion: 6 */

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

// Starting the game with key event only once or when the user loses
let started = true;
$(document).keydown(function() {
    if (started) {
        nextSequence();
        started = false;  // So that if we again press any key, it doesn't run
    }
});


let level = 0;
const nextSequence = function() {  // Function notation as function expression
    let randomNumber = Math.floor(Math.random() * 4);  // 0 - 3
    let randomChosenColour = buttonColours[randomNumber];  // "red", "blue", "green", "yellow"
    gamePattern.push(randomChosenColour);

    // Flash Effect (color names are also present as id's for the particular color)
    $("button#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];
};


// User clicking a button
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");  // "red", "blue", "green", "yellow"
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.indexOf(userChosenColour));
});
// console.log(userClickedPattern);


const checkAnswer = currentLevel1 => {  // Function notation as fat arrow
    if (userClickedPattern[currentLevel1] === gamePattern[currentLevel1]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {  // Iff user has clicked all the matching colors
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        let wrongAudioObject = new Audio("./sounds/wrong.mp3");
        wrongAudioObject.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
};


const startOver = () => {
    level = 0;
    gamePattern = [];
    started = true;
};

//==============================================================================

const playSound = name => {
    let audioObject = new Audio("./sounds/" + name + ".mp3");
    audioObject.play();
};

const animatePress = currentColor => {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};
