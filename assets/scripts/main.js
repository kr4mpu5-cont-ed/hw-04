var mainEl = document.getElementById("main");
var timeEl = document.getElementById("time");
var startButton = document.getElementById("start");
var startDiv = document.getElementById("startDiv");
var questionDiv = document.getElementById("questionDiv");
var resultDiv = document.getElementById("resultDiv");
var gameOverDiv = document.getElementById("gameOverDiv");
var score = document.getElementById("score");
var highscoresDiv = document.getElementById("highscoresDiv");
var questionDivTitle = document.getElementById("questionDivTitle");
var questionDivChoice0 = document.getElementById("questionDivChoice0");
var questionDivChoice1 = document.getElementById("questionDivChoice1");
var questionDivChoice2 = document.getElementById("questionDivChoice2");
var questionDivChoice3 = document.getElementById("questionDivChoice3");
var secondsLeft = 75;
var currentQuestion = 0;
var timerInterval;
const totalNumberQuestions = questions.length - 1; //0-based array

function startQuiz() {
    startTimer();
    displayNextQuestion(currentQuestion);
}

function endQuiz() {
    questionDiv.setAttribute("style", "display:none");
    resultDiv.setAttribute("style", "display:none");
    score.innerHTML = secondsLeft;
    timeEl.textContent = "Time: " + secondsLeft;
    gameOverDiv.setAttribute("style", "display:");
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(function() {
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
    startDiv.setAttribute("style", "display: none");
    questionDiv.setAttribute("style", "display");

    questionDivTitle.innerHTML = questions[currentQuestion].title;
    questionDivChoice0.innerHTML = questions[currentQuestion].choices[0];
    questionDivChoice0.setAttribute("data-choice", questions[currentQuestion].choices[0]);
    questionDivChoice1.innerHTML = questions[currentQuestion].choices[1];
    questionDivChoice1.setAttribute("data-choice", questions[currentQuestion].choices[1]);
    questionDivChoice2.innerHTML = questions[currentQuestion].choices[2];
    questionDivChoice2.setAttribute("data-choice", questions[currentQuestion].choices[2]);
    questionDivChoice3.innerHTML = questions[currentQuestion].choices[3];
    questionDivChoice3.setAttribute("data-choice", questions[currentQuestion].choices[3]);
}

function checkResponse(str) {
    if (str == questions[currentQuestion].answer) {
        resultDiv.innerHTML = "Correct!";
        resultDiv.setAttribute("style", "display");
        //todo: only display briefly
    } else {
        secondsLeft = secondsLeft - 10;
        resultDiv.innerHTML = "Incorrect!";
        resultDiv.setAttribute("style", "display");
        //todo: only display briefly
    }
    if (currentQuestion < totalNumberQuestions) {
        currentQuestion++;
        displayNextQuestion();
    } else {
        endQuiz();
    }    
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

questionDivChoice0.addEventListener("click", function() {
    checkResponse(questionDivChoice0.getAttribute("data-choice"));
});

questionDivChoice1.addEventListener("click", function() {
    checkResponse(questionDivChoice1.getAttribute("data-choice"));
});

questionDivChoice2.addEventListener("click", function() {
    checkResponse(questionDivChoice2.getAttribute("data-choice"));
});

questionDivChoice3.addEventListener("click", function() {
    checkResponse(questionDivChoice3.getAttribute("data-choice"));
});
