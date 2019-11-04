//todo: refactor global variables to local as appropriate
var timeLeft = document.getElementById("timeLeft");
var startButton = document.getElementById("start");
var navBarDiv = document.getElementById("navBar");
var viewHighscoresButton = document.getElementById("viewHighscores");
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
var submitScoreButton = document.getElementById("submitScore");
var startOverButton = document.getElementById("startOver");
var clearHighscoresButton = document.getElementById("clearHighscores");
const totalNumberQuestions = questions.length - 1; //0-based array
var secondsLeft = questions.length * 15; //15 seconds/question
var currentQuestion = 0;
var timerInterval;
var timerFlashResult;
var secondsLeftFlashResult = 2;
var scores = [];

init();

function init() {
    //set initial display state of various divs
    navBarDiv.setAttribute("style", "visibility: visible;");
    startDiv.setAttribute("style", "display");
    questionDiv.setAttribute("style", "display: none;");
    resultDiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: none;");
    highscoresDiv.setAttribute("style", "display: none;");

    //populate scores[] fromlocalstorage
    getScoresLS = localStorage.getItem("scoresLS");
    scores = getScoresLS ? JSON.parse(getScoresLS): [];
}

function startQuiz() {
    startTimer();
    displayNextQuestion(currentQuestion);
}

function startTimer() {
    timerInterval = setInterval(function() {
    secondsLeft--;

    timeLeft.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
        // console.log("Time has run out.")
        clearInterval(timerInterval);
        endQuiz();
    }

  }, 1000);
}

function endQuiz() {
    //hide question/result divs, show game over div
    questionDiv.setAttribute("style", "display: none;");
    resultDiv.setAttribute("style", "display: none;");
    score.innerHTML = secondsLeft;
    timeLeft.textContent = "Time: " + secondsLeft;
    gameOverDiv.setAttribute("style", "display");
    clearInterval(timerInterval);
}

function displayNextQuestion() {
    startDiv.setAttribute("style", "display: none;");
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
    } else {
        secondsLeft = secondsLeft - 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
            endQuiz();
        }
        resultDiv.innerHTML = "Incorrect!";
    }

    resultDiv.setAttribute("style", "display");
    timerFlashResult = setInterval(function() {
        secondsLeftFlashResult--;
        if (secondsLeftFlashResult === 0) {
            resultDiv.setAttribute("style", "display: none;");
            clearInterval(timerFlashResult);
        }    
    }, 1000);
    secondsLeftFlashResult = 2;

    if (currentQuestion < totalNumberQuestions) {
        currentQuestion++;
        displayNextQuestion();
    } else {
        endQuiz();
    }    
}

function storeScores() {
    //hide divs not necessary for highscore screen
    navBarDiv.setAttribute("style", "visibility: hidden;");
    gameOverDiv.setAttribute("style", "display: none;");
    highscoresDiv.setAttribute("style", "display");

    //get values from player-submitted form
    strPlayerInitials = document.getElementById("playerInitials").value.trim();
    strScore = secondsLeft;
    
    //add to scores[]
    scores.push([strPlayerInitials, strScore]);

    //sort scores, high to low
    scores.sort(function(a,b) {
        return b[1] - a[1];
    });

    //write to localstorage
    localStorage.setItem('scoresLS', JSON.stringify(scores));

    //display high scores
    renderHighscores();

}

function getHighscores() {
    var storedScores = JSON.parse(localStorage.getItem("todos"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      todos = storedTodos;
    }
  
    // Render todos to the DOM
    renderTodos();
}

function renderHighscores() {
    // Clear highscoreList element
    var highscoreList = document.getElementById("highScoreList");
    highscoreList.innerHTML = "";
  
    // Render a new li for each score
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        console.log(scores[i] + " " + score);
        var li = document.createElement("li");
        li.textContent = [i+1] + ". " + scores[i][0].toString().toUpperCase() + " - " + scores[i][1];
        li.setAttribute("data-index", i);
        highscoreList.appendChild(li);
    }
}

function viewHighscores() {
    navBarDiv.setAttribute("style", "visibility: hidden;");
    startDiv.setAttribute("style", "display: none;");
    highscoresDiv.setAttribute("style", "display");
    renderHighscores();
}


viewHighscoresButton.addEventListener("click", function() {
    viewHighscores();
});

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

submitScoreButton.addEventListener("click", function(event) {
    event.preventDefault();
    storeScores();
});

startOverButton.addEventListener("click", function() {
});

clearHighscoresButton.addEventListener("click", function(event) {
    // localStorage.clear();
    event.preventDefault();
    scores = [];
    localStorage.removeItem('scoresLS');

    renderHighscores();
});
