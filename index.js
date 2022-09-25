
let userClickedPattern = [];
let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSecuence();
    started = true;
  }
});

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("sucsess");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSecuence();
      }, 1000);
    }
  }
    else {

    console.log("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

function nextSecuence() {

  userClickedPattern = [];

  level++

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {

  let colourAudio = new Audio("sounds/" + name + ".mp3");
  colourAudio.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
