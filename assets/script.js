// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score



var question1 = {
    Q:"What symbol is used to contain an object?",
    A1:"()",
    A2:"[]",
    A3:"<>",
    A4:"{}",
    CA: "A4",
}

var question2 = {
    Q:" The statement '2' === 2 would return",
    A1:"true, because statement is checking the values are same ",
    A2:"false, because the statement checks for value and data type",
    A3:"undefined, because statement is not for this purpose",
    A4:"false, because the statement checks the data type only",
    CA: "A2",
}

var question3 = {
  Q:"Where should the script tag to our JS file be in the HTML document?",
  A1:"Before the head element",
  A2:"In the head element",
  A3:"At the top of the body",
  A4:"At the bottom of the body",
  CA: "A4",
}
var QuestionArray = [question1,question2,question3]
var currentA
var Qnumber =0

var challenge = "Coding Quiz Challenge";
var allDone = "All done!"

// global variables to specify the class/id within html
var timeEl = document.querySelector(".time");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var quizButton = document.getElementById("quiz");


// function to return the the start page when page is refreshed
function initial() {
  question.textContent = challenge;
  document.querySelector("main").style.alignItems = "center";
  document.querySelector("main").style.textAlign = "center";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("score").style.display = "none";
  document.getElementById("input").style.display = "none";
  document.getElementById("submit").style.display = "none";
  document.getElementById("output").style.display = "none";
}

// calling function initial 
initial();
var secondsLeft =60
var penalty = 10
// When start button is clicked the following function is called
startButton.addEventListener("click", function start() { 
  // function to start counting down from 60seconds
  var timerInterval = setInterval (function() {
    timeEl.textContent = "Time: " + secondsLeft;
    secondsLeft--;
    // when the time reaches 0, the timer is stopped
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000)


  // changes the element display status, text alignments, and box alignments
  document.querySelector("main").style.alignItems = "flex-start";
  document.querySelector("main")
  .style.textAlign = "left";
  document.getElementById("desc").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("start").style.display = "none";
  document.getElementById("output").style.display = "block";

  // contenets of html changes in accordance with the global variable
  var qtext = function(qnumber){
    
    var currentQobj = QuestionArray[qnumber]
    var currentQ = currentQobj.Q
    var currentOptions = [currentQobj.A1,currentQobj.A2,currentQobj.A3,currentQobj.A4]
  question.textContent =currentQ;
  one.textContent = currentOptions[0];
  two.textContent = currentOptions[1];
  three.textContent = currentOptions[2];
  four.textContent = currentOptions[3];
  var answerkey = currentQobj.CA
  currentA = currentQobj[answerkey]
  }
  qtext(0)//first question

var checker = function(event){
  var element = event.target
  if (element.innerHTML != currentA) {
    output.textContent = "Wrong!";
    secondsLeft = secondsLeft - penalty;
    console.log("wrong")
  } else {
    output.textContent = "Correct!";
    Qnumber++
    qtext(Qnumber)
  }
} 
let i =0
while(i<QuestionArray.length){ 
// When a button is clicked, it calls the following function
quizButton.addEventListener("click", function (event) {
checker(event)
})
i++
}
  


// When a button is clicked, it calls the following function
quizButton.addEventListener("click", function (event) {
  var element = event.target

  // if the selection is incorrect, it displays message and deducts 10seconds from the time
  // if correct, changes the display status of html elements, contenets of html changes in accordance with the global variable
  // if correct, it also stoppes the countdown and the time left is stored in local storage
  if (element.innerHTML !== currentA) {
    output.textContent = "Wrong!";
    // secondsLeft = secondsLeft - penalty;
  } else {
    clearInterval(timerInterval);
    output.textContent = "Correct!";
    question.textContent = allDone;
    // document.getElementById("desc").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    // document.getElementById("start").style.display = "none";
    document.getElementById("score").style.display = "block";
    document.getElementById("input").style.display = "block";
    document.getElementById("submit").style.display = "block";
    document.getElementById("output").style.display = "none";
    score.textContent = "Your score is: " + (secondsLeft + 1);
    localStorage.setItem("score", secondsLeft + 1);
  }
})
})


// When submit button is clicked, it stores the value entered in <form> in local storage
submitButton.addEventListener("click", function submit() {
    localStorage.setItem("name", JSON.stringify(candidate.value))
})
