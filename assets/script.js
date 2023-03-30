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

// function to set the content of start page when it's refreshed
function initial() {
  question.textContent = challenge; //sets the question text as the title of the quiz
  main.style.alignItems = "center"; //centers quiz name
  main.style.textAlign = "center";
  quizButton.style.display = "none"; //makes other elements invisble
  score.style.display = "none";
  input.style.display = "none";
  submitButton.style.display = "none";
  output.style.display = "none";
  output.textContent = "";
}
// calling function initial
initial();

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
  quizButton.style.display = "block";
  startButton.style.display = "none";
  output.style.display = "block";

  qtext(0); //runs qtext function to get text value for questions and answers on the first question (0 index)

  //end function to be triggered by final question answered or by timer running out
  var endFunction = function () {
    clearInterval(timerInterval); //kill the timer
    question.textContent = Done;
    quizButton.style.display = "none";
    score.style.display = "block";
    input.style.display = "flex";
    submitButton.style.display = "block";
    output.style.display = "none";
    score.textContent = "Your score is: " + secondsLeft;
    ScoreButton.className = "";
  };

  // When a button is clicked, it calls the following function
  quizButton.addEventListener("click", function (event) {
    checker(event);
    if (Qnumber == QuestionArray.length) {
      endFunction(); //end the quiz
    }
  });
});

// When submit button is clicked, it stores the value entered in <form> in local storage
submitButton.addEventListener("click", function submit() {
  let OldScores = localStorage.getItem("Score");
  if (OldScores == "No High scores yet") {
    localStorage.clear();
    localStorage.setItem("Score", `${candidate.value};${secondsLeft}`);
  } else {
    localStorage.setItem(
      "Score",
      `${OldScores},${candidate.value};${secondsLeft}`
    );
  }
  location.reload();
});

candidate.addEventListener("keypress", function (event) {
  //listen for keypress in the candidate box
  if (event.key === "Enter") {
    // if the key is enter
    event.preventDefault(); //stop the reload
    submitButton.click(); //simulate a click on the submit button
  }
});

//high scores logic

var ScoreContainer = document.getElementById("ScoresContainer");
var ResetButton = document.getElementById("ResetButton");
var StorageClear = document.getElementById("StorageClear");

var PullScores = function () {
  var ScoreObject = localStorage.getItem("Score").split(",");
  ScoreObject.forEach((score) => {
    const Scoredata = score.split(";");
    const ScoreCard = document.createElement("card");
    const ScoreName = document.createElement("p");
    const ScoreNumber = document.createElement("p");
    ScoreName.textContent = Scoredata[0];
    ScoreNumber.textContent = Scoredata[1];
    ScoreCard.append(ScoreName, ScoreNumber);
    ScoreContainer.append(ScoreCard);
  });
};

var displayswitch = function () {
  var ScoreMain = document.getElementById("MainScores");
  var QuestionMain = document.getElementById("MainQuestion");
  QuestionMain.className = "hidden";
  ScoreButton.className = "hidden";
  ScoreMain.classList.remove("hidden");
  ResetButton.classList.remove("hidden");
  StorageClear.classList.remove("hidden");
};
//switches the quiz off
//Switches scores on
//removes button
ScoreButton.addEventListener("click", function () {
  //hide quiz
  PullScores();
  displayswitch();
  //unhide scores
});
ResetButton.addEventListener("click", function () {
  location.reload();
});
StorageClear.addEventListener("click", function () {
  localStorage.clear();
  localStorage.setItem("Score", "No High scores yet");
  location.reload();
});
