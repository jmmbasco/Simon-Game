
var buttonColours = ["red", "blue","yellow","green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++
  $("h1").text("Level "+ level)
  userClickedPattern = [];
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour)
  playSound(userChosenColour)

  var currentLevel = userClickedPattern.length - 1
  checkAnswer(currentLevel);

})

function playSound(name){
  var colorAudio = new Audio('sounds/'+name+'.mp3');
  colorAudio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
   }, 100);
}

$(document).keypress(function(event){
  if (level === 0){
    nextSequence()
  }
  else{
  }
})

function checkAnswer(currentLevel){
  if ( userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === level){
      setTimeout(nextSequence, 1000)
    }
    else{}
  }
  else{
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio  .play()
    $("body").addClass("game-over");
    setTimeout(function() {
         $("body").removeClass("game-over");
     }, 200);
      $("h1").text("Game Over, Press Any Key to Restart ")
      startOver()
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = []
}
