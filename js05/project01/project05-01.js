"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-01

      Project to present an online quiz with a countdown clock
      Author: Isabelle Samaniego
      Date:   October 22, 2022

      Filename: project05-01.js
*/

// Constants to set the time given for the quiz in seconds
// and the correct answers to each quiz question
const quizTime = 20;
const correctAnswers = ["10", "4", "-6", "5", "-7"];

// Elements in the quiz page
let startQuiz = document.getElementById("startquiz");
let quizClock = document.getElementById("quizclock");
let overlay = document.getElementById("overlay");

// Initialize the quiz time
quizClock.value = quizTime;
let timeLeft = quizTime;

// Declare the ID for timed commands
// and the node list for questions






// No. 3 Declare timeID with no value
let timeID;

// No. 4 Declare questionList
let questionList = document.querySelectorAll("div#quiz input");

// No. 5 add onclick event handler
startQuiz.onclick = function() {
    overlay.className = "showquiz";
    // repeat running countdown() interval of 1000 millisecond
    timeID = setInterval(function() {
        countdown();
    }, 1000);
}

// No. 6 create countdown() to update the quiz clock
function countdown() {
    // if else statement to test value of timeLeft
    if (timeLeft === 0) {
        clearInterval(timeID);
    }

    // 6.b. declare totalCorrect
    let totalCorrect = checkAnswers();

    // 6.c. if all answers are correct, set congrats alert
    if (totalCorrect === correctAnswers.length) {
        alert("Congratulations on scoring 100%");
    } else if (timeLeft !== 0) {
        // 7. decrease timeLeft by 1
        timeLeft -= 1;
        quizClock.value = timeLeft;
    } else {
        // 6.c.i. display alert window of incorrect answers
        alert("Incorrect answers: " + (questionList.length - totalCorrect));

        // 6.c.ii. change value of timeLeft
        timeLeft = quizTime;

        // 6.c.iii. set quizClocl value
        quizClock.value = timeLeft;

        // 6.c.iv. change class attribute of overlay
        overlay.className = "hidequiz";
    }
}



/*------------- Function to check the student answers ----------------*/
function checkAnswers() {
   let correctCount = 0;
   
   for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].value === correctAnswers[i]) {
         correctCount++;
         questionList[i].className = "";
      } else {
         questionList[i].className = "wronganswer";
      }      
   }
   return correctCount;
}

