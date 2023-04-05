//Quiz Section of JS code

//Globally available variables
var challenge = "JS Quiz"; //title of quiz
var Done = "Finished, well done!"; //message to finish quiz
var secondsLeft = 60; //total time for quiz, in seconds
var penalty = 10; //time penalty for a wrong answer

// global variables to specify the class/id within html
var timeEl = document.querySelector(".time"); //counter
var startButton = document.getElementById("start"); //button to start quiz
var submitButton = document.getElementById("submit"); //button to submit high score
var quizButton = document.getElementById("quiz"); //possible answers
var question = document.getElementById("question"); //question item in html
var main = document.querySelector("main");
var score = document.getElementById("score");
var input = document.getElementById("input");
var output = document.getElementById("output");
var candidate = document.getElementById("candidate");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var ScoreButton = document.getElementById("ScoreButton");

//The questions, saved as objects
var question1 = {
  Q: "What symbol is used to contain an object?", //question
  A1: "()", //options
  A2: "[]",
  A3: "<>",
  A4: "{}",
  CA: "A4", //correct answer is A4 "{}"
};

var question2 = {
  Q: " The statement '2' === 2 would return",
  A1: "true, because statement is checking the values are same ",
  A2: "false, because the statement checks for value and data type",
  A3: "undefined, because statement is not for this purpose",
  A4: "false, because the statement checks the data type only",
  CA: "A2",
};

var question3 = {
  Q: "Where should the script tag to our JS file be in the HTML document?",
  A1: "Before the head element",
  A2: "In the head element",
  A3: "At the top of the body",
  A4: "At the bottom of the body",
  CA: "A4",
};

//build a catalogue of questions
var QuestionArray = [question1, question2, question3];
var currentA; //empty variable that acts an answer key later
var Qnumber = 0; //which question are we on

//Logic for working out the questions from the question number
var qtext = function (qnumber) {
  //Working out the text value for questions and the answer
  if (qnumber < QuestionArray.length) {
    //runs the function if there is another question in the array
    var currentQobj = QuestionArray[qnumber]; //current question object is found by using qnumber as index in Question array
    var currentQ = currentQobj.Q; //current question is the value of the Q key in the question object
    var currentOptions = [
      currentQobj.A1,
      currentQobj.A2,
      currentQobj.A3,
      currentQobj.A4,
    ]; //array of possible answers, from keys A1,A2,A3,A4 from current question object
    var answerkey = currentQobj.CA; //answer defined in object, eg Q1 answer is in the A4 slot, so this equals A4
    currentA = currentQobj[answerkey]; //Answer to current question is found by using the value of the the above variable (A4 for Q1) as a key on the question object (returning value {})

    question.textContent = currentQ; //Write the current question into the question text
    one.textContent = currentOptions[0]; //Write possible answers in the spaces for them
    two.textContent = currentOptions[1];
    three.textContent = currentOptions[2];
    four.textContent = currentOptions[3];
  }
};

var checker = function (event) {
  //function to check answers agains the key, takes in the event as input
  var element = event.target; //what did you click?
  if (element.innerHTML == currentA) {
    //does the text in the button you clicked match the correct answer?
    //Yes, correct
    output.textContent = "Correct!"; //Correct text at bottom
    Qnumber++; //Next question
    qtext(Qnumber); //generate text for next question
    return;
  } else {
    //No, incorrect
    output.textContent = "Wrong!"; //Wrong text at the bottom
    //Idea? Style incorect answers?
    secondsLeft = secondsLeft - penalty; //A penalty score is applied - penalty is defined in the timer
    //changed to match required behaviour
    Qnumber++; //Next question
    qtext(Qnumber); //generate text for next question
    return;
  }
};

// When start button is clicked the following function is called
startButton.addEventListener("click", function start() {
  ScoreButton.className = "hidden";
  timeEl.textContent = "Time: " + secondsLeft; //displays that 60 seconds remain at start
  // function to start counting down from 60seconds
  var timerInterval = setInterval(function () {
    // when the time reaches 0, the timer is stopped
    if (secondsLeft < 1) {
      endFunction(); //run the ending function if the time is 0
    } else {
      secondsLeft--; //if the time is not zero count down one second
      timeEl.textContent = "Time: " + secondsLeft; //timer is equal to the word "Time" concatted with number of seconds left
    }
  }, 1000);

  // changes the element display status, text alignments, and box alignments
  document.getElementById("desc").style.display = "none";
  quizButton.classList.remove("hidden");
  startButton.style.display = "none";
  // output.style.display = "block";
  output.classList.remove("hidden");

  qtext(0); //runs qtext function to get text value for questions and answers on the first question (0 index)

  //end function to be triggered by final question answered or by timer running out
  var endFunction = function () {
    clearInterval(timerInterval); //kill the timer
    question.textContent = Done; //display a completion message
    quizButton.className = "hidden"; //hide the answer boxes
    score.classList.remove("hidden"); //show score
    input.classList.remove("hidden"); //show input feild for givin intital for highscore
    submitButton.classList.remove("hidden");
    output.className = "hidden";
    score.textContent = "Your score is: " + secondsLeft;
    ScoreButton.classList.remove("hidden");
  };

  // When button is clicked, it calls the following function
  quizButton.addEventListener("click", function (event) {
    checker(event); //checks the button clicked is the correct answer
    if (Qnumber == QuestionArray.length) {
      //if the current question is the last
      endFunction(); //end the quiz
    }
  });
});

// When submit button is clicked, it stores the value entered in <form> in local storage
submitButton.addEventListener("click", function submit() {
  event.preventDefault();
  console.log("Triggered");
  let OldScores = localStorage.getItem("Score"); //gets the current value of score in local storage
  if (OldScores == "No High scores yet") {
    //if the default message is the only item in storage
    localStorage.clear(); //get rid of the message
    localStorage.setItem("Score", `${candidate.value};${secondsLeft}`); //add the score with inital
  } else {
    //if there was already 1 or more scores
    localStorage.setItem(
      "Score",
      `${OldScores},${candidate.value};${secondsLeft}` //set the value to the old score(s) then the newest score
    );
  }
  location.reload();
  //reset the page to allow user to reattempt
});

candidate.addEventListener("keypress", function (event) {
  //listen for keypress in the candidate box
  if (event.key === "Enter") {
    // if the key is enter
    event.preventDefault(); //stop the reload
    submitButton.click(); //simulate a click on the submit button
  }
});

//High scores

//Elements only used by High scores
var ScoreContainer = document.getElementById("ScoresContainer");
var ResetButton = document.getElementById("ResetButton");
var StorageClear = document.getElementById("StorageClear");
var ScoreMain = document.getElementById("MainScores");
var QuestionMain = document.getElementById("MainQuestion");

var PullScores = function () {
  //gets scores from local storage and splits them into different strings
  var ScoreObject = localStorage.getItem("Score").split(","); //splits into "inital;score"
  ScoreObject.forEach((score) => {
    const Scoredata = score.split(";"); //splits into an array of [inital, score]
    const ScoreCard = document.createElement("card"); //make the elements to hold the score
    const ScoreName = document.createElement("p");
    const ScoreNumber = document.createElement("p");
    ScoreName.textContent = Scoredata[0]; //insert inital
    ScoreNumber.textContent = Scoredata[1]; //insert score
    ScoreCard.append(ScoreName, ScoreNumber); //add to card
    ScoreContainer.append(ScoreCard); //put the card in the container
  });
};

var displayswitch = function () {
  //Hides unwanted content for scores and unhides the score board
  QuestionMain.className = "hidden";
  ScoreButton.className = "hidden";
  ScoreMain.classList.remove("hidden");
  ResetButton.classList.remove("hidden");
  StorageClear.classList.remove("hidden");
};

ScoreButton.addEventListener("click", function () {
  if (localStorage.getItem("Score") == null) {
    localStorage.setItem("Score", "No High scores yet");
  }
  PullScores();
  displayswitch();
});
ResetButton.addEventListener("click", function () {
  location.reload();
});
StorageClear.addEventListener("click", function () {
  localStorage.clear();
  localStorage.setItem("Score", "No High scores yet");
  location.reload();
});
