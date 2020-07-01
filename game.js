///Used to keep track of the game pattern
var gamePattern = [];

//used to keep track of the user pattern input
var userChoseanColor;

//keep track of the users input values
var userClickedPattern = [];

var level = 0;
//An array used to store the available options for the game pattern
var buttonColours = ["green", "red", "yellow", "blue"];

//used to keep track of the next random pattern the was generated
var randomChosenColour = null;


//Used to start the game
$(document).on('keypress',function(e) {
  if(e.which == 13) {
      nextSequence();
      if ($("body").is(".game-over") ) {
 
        $("body").removeClass("game-over");
     
    }
     
  }
});



// This function generates the next sequence of the simon says pattern the user
// must follow
function userClicked(buttonClicked){

  userChoseanColor = buttonClicked;

  userClickedPattern.push(userChoseanColor);

  playAudio(userChoseanColor);

  buttonAnnimation(userChoseanColor);

  checkAnswer(userClickedPattern.length-1);
  
  
  

};




function nextSequence() {
  userClickedPattern = [];

   

    var randomNumber = (Math.floor(Math.random() * 4));

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
  
    playAudio(randomChosenColour);

    buttonAnnimation(randomChosenColour);

    $("#level-title").text("Level " + level);

    level++;




}

function checkAnswer(curentLevel){
  
    console.log(userClickedPattern[curentLevel]);
    console.log(gamePattern[curentLevel]);
  
  if(gamePattern[curentLevel] === userClickedPattern[curentLevel]){
    
  

  if(gamePattern.length === userClickedPattern.length){
    
    setTimeout(function () {
     
      nextSequence();
    }, 1000);

    
  }
}

  else{
    startOver();

  };

}







function playAudio(buttonClicked){

  var audiofile = new Audio ('sounds/' + buttonClicked + '.mp3');

  audiofile.play(); 
}


function buttonAnnimation(buttonClicked){

  $("#"+buttonClicked).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}

function startOver(){
  playAudio("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over press ENTER to restart");
  level = 0;

  
}
