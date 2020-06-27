var userClickedPattern=[];
var gamePattern=[];
var randomColor=["red","blue","yellow","green"];
var started=false;
var level=0;

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=randomColor[randomNumber];
  gamePattern.push(randomChosenColor);
  var colorid="#"+randomChosenColor;
  $(colorid).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(tune)
{
  var sound=new Audio("sounds/"+tune+".mp3");
  sound.play();
}

$(document).keypress(function() {
    if(!started)
    {
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
    }
});

$(".btn").click(function()
{
  var chosenColor=$(this).attr("id");
  userClickedPattern.push(chosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);

  checkAnswer(userClickedPattern.length-1);

});

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length)
      {

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    }
    else
    {

      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}

function startOver()
{
   level = 0;
  gamePattern = [];
  started = false;
}