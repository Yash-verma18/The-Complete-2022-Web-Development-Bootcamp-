var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];


var level = 0;
var started = false;


$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour)
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});



$(document).on("keydown", function() {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 5000);

    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER, Press any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}
