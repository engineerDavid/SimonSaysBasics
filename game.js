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


//Start the game by listing if the user pressed ENTER
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



//Generates the next sequence of the game
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


//Checks to see if the user has the correct answer as the random color generated
//If it is wrong, the game ends
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






//plays the audio sound corisponding to the button chosen
function playAudio(buttonClicked){

  var audiofile = new Audio ('sounds/' + buttonClicked + '.mp3');

  audiofile.play(); 
}


//plays an animation corrisponding to the button chosean
function buttonAnnimation(buttonClicked){

  $("#"+buttonClicked).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}


//Used to restart the game 
function startOver(){
  playAudio("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over press ENTER to restart");
  level = 0;

  
}
