# JS Quiz

### I'd like to make a quiz to test the knowledge of the user in an array of questions

#### Below i have detailed the process of making this quiz.

<br>

Link to live site: https://michaelw1996.github.io/JavaQuiz/

<br>

## HTML:

    I used the HTML to structure my quiz and hid a number of elements on first loading, notably the quiz answers and my hi score section.

    I created 2 different main elements with one holding the quiz & the other being the score board

## Javascript:

Question creation:

    To store my questions i created elements with 6 key value pairs, these were for a question, 4 possible answers and an answer key to inform which is correct. i decided to do this to enable for additional questions to be added with minial disruption and to allow for answers to displayed in a random order if the feature was needed. Question objects were added to an array, which also allows for changing of question order.

    The content of a question object is displayed into the answer boxes in the qtext function and the hidden class is removed from the answers when the quiz is initalised, this also starts the time (see below)

Answer checker:

    The checker function takes in the event of a click and checks the target, if the target matches the answer according the the key (user is correct) the quiz advances and the user is displayed a "Correct" message, if the answer and key do not match (user is wrong) the user is given a message of "Wrong" and must select another answer, a time penalty is also applied to wrong answers.

Element/content manipulation:

    The qtext function inserts the text for each question and answe into the answer buttons using the .textContent method.

    I made use of the .className and .ClassList.remove methods extensively to show and hide elements throughout the quiz.

    Scoreboard creation is completed through createElement() methods, each scorecard being made from a dynamically created card with 2 text tags inside to hold the initals and score of the user, this info is taken from local storage.

Timer:

    The time used in the quiz makes use of the setInterval() method and counts down from a set time (the secondsLeft variable), this can be augmented by a wrong answer encuring a penalty of a number of seconds.

    The time also contains a trigger to the end function meaning if the timer gets to zero (or less) the quiz ends and the user is asked to provide initials to save their score

Local Storage:

    Local storage is used to save and later display user scores.

    Storing the data is done under the key "Scores", i have combined scores to keep all the data in this one key value pair, this was done with a comma seperating scorecards and a semicolon to seperate initals and scores.

    Each time a score is to be save we first look at the local storage, if it is the deafault value, we replace with the new value, if the local storage already has data we extract that data and add our new record to the end and save back to the storage

## Deployed video

Video of deployed usage:

https://drive.google.com/file/d/1m50Vspc5f_yOvvshIpfQ991YngixIMdO/view

Coded by Michael Walters
