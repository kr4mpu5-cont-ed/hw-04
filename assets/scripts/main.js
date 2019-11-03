var mainEl = document.getElementById("main");
var timeEl = document.getElementById("time");
var startButton = document.getElementById("start");
var startCard = document.getElementById("startCard");
var questionCard = document.getElementById("questionCard");
var resultCard = document.getElementById("resultCard");
var highscoresCard = document.getElementById("highscoresCard");
var questionCardTitle = document.getElementById("questionCardTitle");
var questionCardChoice0 = document.getElementById("questionCardChoice0");
var questionCardChoice1 = document.getElementById("questionCardChoice1");
var questionCardChoice2 = document.getElementById("questionCardChoice2");
var questionCardChoice3 = document.getElementById("questionCardChoice3");
// var timerRunning = false;
var secondsLeft = 75;
var currentQuestion = 0;

function startQuiz() {
    startTimer();
    displayNextQuestion(currentQuestion);
}

function startTimer() {
    console.log("in startTimer()");
    // timerRunning = true;

    var timerInterval = setInterval(function() {
    secondsLeft--;

    timeEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
        console.log("Time has run out.")
        clearInterval(timerInterval);
        sendMessage();
    }

  }, 1000);
}

function displayNextQuestion(int) {
    //which question am i on? >> need questionCounter
    startCard.setAttribute("style", "display: none");
    questionCard.setAttribute("style", "display");

    questionCardTitle.innerHTML = questions[currentQuestion].title;
    questionCardChoice0.innerHTML = questions[currentQuestion].choices[0];
    questionCardChoice0.setAttribute("data-choice", questions[currentQuestion].choices[0]);
    questionCardChoice1.innerHTML = questions[currentQuestion].choices[1];
    questionCardChoice1.setAttribute("data-choice", questions[currentQuestion].choices[1]);
    questionCardChoice2.innerHTML = questions[currentQuestion].choices[2];
    questionCardChoice2.setAttribute("data-choice", questions[currentQuestion].choices[2]);
    questionCardChoice3.innerHTML = questions[currentQuestion].choices[3];
    questionCardChoice3.setAttribute("data-choice", questions[currentQuestion].choices[3]);
}

function checkResponse(str) {
    console.log("Checking...");
    if (str == questions[currentQuestion].answer) {
        console.log("ding ding ding!");
    }

    //done processing current question, get ready for next
    currentQuestion++;
    displayNextQuestion();
}

function pauseTimer() {
    //invoke when "view highscores" clicked during quiz
    //get secondsLeft
    //clear interval
}

function sendMessage() {
    // timeEl.textContent = " ";
    // var imgEl = document.createElement("img");
    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);
    console.log("in sendMessage()")
  }

startButton.addEventListener("click", function() {
    startQuiz();
}); 

questionCardChoice0.addEventListener("click", function() {
    checkResponse(questionCardChoice0.getAttribute("data-choice"));
});

questionCardChoice1.addEventListener("click", function() {
    checkResponse(questionCardChoice1.getAttribute("data-choice"));
});

questionCardChoice2.addEventListener("click", function() {
    checkResponse(questionCardChoice2.getAttribute("data-choice"));
});

questionCardChoice3.addEventListener("click", function() {
    checkResponse(questionCardChoice3.getAttribute("data-choice"));
});


//

// var imageContainer = document.querySelector(".img-container");

// imageContainer.addEventListener("click", function(event) {
//   var element = event.target;

//   if (element.matches("img")) {
//     var state = element.getAttribute("data-state");

//     if (state === "still") {
//       element.setAttribute("data-state", "animate");
//       element.setAttribute("src", element.getAttribute("data-animate"));
//     } else if (state === "animate") {
//       element.setAttribute("data-state", "still");
//       element.setAttribute("src", element.getAttribute("data-still"));
//     }
//   }
// });
