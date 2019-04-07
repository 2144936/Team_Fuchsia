//var hints = []; // array for hints
var answers = []; // array for the answers
var lessonVersion = document.getElementById("lessonVersion").value; // gets the version of the lesson
var guessThis = ""; // correct answer
var alpha= []; // letter inputs by user
var fillMe = []; // this will get filled if the correct letter is guessed
var wrongLetters = []; // array for wrong letter guesses
var maxLetter = 0; // max length of the word
var livesLeft = 10; // max guess by user
var corrects = 0; 
var wrongs = 0;
var startQuest = 0; // starting question array(questions[0])
var maxQuest = 4; // max question array(question[2])
var totalScore = 0; // total score of the user after finishing the activity
var maxPoints = 0; // max 
var canPress = true; // boolean to decide to start or to stop the event listener

versionValidate();

function versionValidate(){ //Validates the version of the lesson
	if(lessonVersion==0){ // if the lesson version = 0 then it will make use of this questions/answers/maxPoints.
		answers = ["string", "number","objects","array","boolean"];
		maxPoints = 5;
	}else if(lessonVersion==1){
		answers = ["string", "numbers","boolean"];
		maxPoints = 5;
	}else{
		console.log('something went wrong');
	}
}

function start() { // Starts the activity
	canPress = true;
	document.getElementById("startBtn").style.visibility="hidden";
	document.getElementById("start").style.visibility="visible";
    guessThis = answers[startQuest]; //assigns the value of guessThis to answers[0]
    alpha = guessThis.split(""); //splits the value of guessThis
    maxLetter = alpha.length; //gets the totalLength of letters
    wrongLetters = [];
    fillMe = [];
	
    for(var i = 0; i < maxLetter; i++) { //loops _ until it reaches the value of maxLetter
      fillMe.push("_")
    }
    //document.getElementById("question").innerHTML = guessThis;    
	if(guessThis==answers[0]){ //if guessThis value is at answer[0] then it will print question[0] at the specified element in the document
		document.getElementById("picture").src = "../images/q1.png";
	}else if(guessThis==answers[1]){
		document.getElementById("picture").src = "../images/q2.png";
	}else if(guessThis==answers[2]){
		document.getElementById("picture").src = "../images/q3.png";
	}else if(guessThis==answers[3]){
		document.getElementById("picture").src = "../images/q4.png";
	}else if(guessThis==answers[4]){
		document.getElementById("picture").src = "../images/q5.png";
	}else{
		console.log("Something went wrong~!")
	}
    document.getElementById("tries").innerHTML = livesLeft; //prints the lives left of the user

  };
  
function checker (alphabet) { //function to check if the guess of the user is correct or not
  var isCorrect = false; // variable to check if the guess is correct
  for(var x = 0; x < maxLetter; x++) { // loops letter by letter to check if the user input matches a letter in the word
    if (alphabet == guessThis[x]) { 
      isCorrect = true; // if correct then set variable to true
    }
  }
  if (isCorrect) {
    for(var x = 0; x < maxLetter; x++) { // loops letter by letter to find the index of the guessed letter
      if (guessThis[x] == alphabet) { 
        fillMe[x] = alphabet; // if found then fills that index with the letter.
      }         
    }
  } else {
      wrongLetters.push(alphabet); // pushes the wrong guesses to the variable wrongLetters
      livesLeft--; // deducts lives 
  }
};
  
function restart(){
	document.getElementById("restartBtn").style.visibility="hidden";
	startQuest = startQuest-1;
	quest();
}

function rounds() {
  document.getElementById("tries").innerHTML = livesLeft; //Prints guesses left every start of round
  document.getElementById("guesses").innerHTML = wrongLetters; //Prints guesses left every start of round
  document.getElementById("answer").innerHTML = fillMe.join(" "); //join letters with blank space as seperator
   
  if(alpha.toString() == fillMe.toString()) { 
	corrects++ //Adds the correct guesses of the user
	 //Prints out if the user guessed the correct answer
	//document.getElementById("result").innerHTML = "Correct!";
	/*nextBtn = document.createElement('input');
	setElementAttr(nextBtn,{"type": "button", "value": "Next Word!", "onclick": "quest()"});
	document.getElementById("nextQ").appendChild(nextBtn);*/
	document.getElementById("nextBtn").style.visibility="visible";
	canPress = false;
	//quest();
  } else if (livesLeft===0) { 
    wrongs++ //Adds the wrong guesses of the user
	//document.getElementById("result").innerHTML = "Wrong!"; //Notifies the user that they ran out of guesses left
	//document.getElementById("warning").innerHTML = "Consider reviewing lesson 1 before taking the activity";
	document.getElementById("restartBtn").style.visibility="visible";
	canPress = false;
  }
};

function setElementAttr(x, y) { //Set multiple attribute helper to be used maybe? :(
  for(var key in y) {
    x.setAttribute(key, y[key]);
  }
}

function quest(){
	document.getElementById("nextBtn").style.visibility="hidden";
	if(startQuest!=maxQuest){ //checks if currentQuest is not equal to maxQuest
		startQuest++; //iterate currentQuest by 1
		livesLeft=10;
		start(); //start game
	}else if(startQuest==maxQuest){ //checks if the currentQuest is equal to maxQuest
		isEligible();
		document.getElementById("score").innerHTML = "Result: <br>"; //Prints the game results
		document.getElementById("wins").innerHTML = "Correct: " +corrects; //score for correct guesses
		document.getElementById("loses").innerHTML = "Wrong: " +wrongs; //score for wrong guesses
		document.getElementById("totalScore").innerHTML = "Total score: " +totalScore+"%"; //prints the computed total score in %
		canPress = false; // ends the activity and stops the event listener
	}
}

function isEligible(){ //checks 
	totalScore = (corrects/maxPoints)*100; //computes the total score of the user 
	if(wrongs == 0){ 
		totalScore = 100;
	}else if(totalScore >= 60){
		document.getElementById("warning").innerHTML = "Goodwork you can proceed to the next lesson if you would like to.";
	}else if(totalScore < 60 && totalScore >= 0){
		document.getElementById("warning").innerHTML = "Sorry please review the lesson once more <br> and retake the activity."; //prints this message if the user did not pass the activity
	}else{
		console.log('Something went wrong~!');
	}
}	

document.onkeypress = function(event) { //this functions listens to the key input of the user
  if(canPress){  
	  var guess = String.fromCharCode(event.keyCode).toLowerCase();
	  checker(guess); //passes the keystroke input of the user to the function checker
	  rounds(); 
  }
};
