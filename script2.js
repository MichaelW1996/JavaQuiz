
// When a button is clicked, it calls the following function
quiz1Button.addEventListener("click", function (event) {
    var element = event.target
  
    // if the selection is incorrect, it displays message and deducts 10seconds from the time
    // if correct, changes the display status of html elements & contenets of html changes in accordance with the global variable
    if (element.innerHTML !== currentA) {
      output.textContent = "Wrong!";
      secondsLeft = secondsLeft - penalty;
    } else {
      output.textContent = "Correct!";
  
      qtext(Qnumber)
    }
    })
  
  // When a button is clicked, it calls the following function
  quiz1Button.addEventListener("click", function (event) {
    var element = event.target
  
    // if the selection is incorrect, it displays message and deducts 10seconds from the time
    // if correct, changes the display status of html elements, contenets of html changes in accordance with the global variable
    // if correct, it also stoppes the countdown and the time left is stored in local storage
    if (element.innerHTML !== currentA) {
      output.textContent = "Wrong!";
      secondsLeft = secondsLeft - penalty;
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

  
  // When submit button is clicked, it stores the value entered in <form> in local storage
  submitButton.addEventListener("click", function submit() {
      localStorage.setItem("name", JSON.stringify(candidate.value))
  })
  







  // When a button is clicked, it calls the following function
quizButton.addEventListener("click", function (event) {
    checker(event)
  })