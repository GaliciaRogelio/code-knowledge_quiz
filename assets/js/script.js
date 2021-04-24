// Get elements from the HTML
var startEl = document.getElementById("start");
var startQuizButton = document.getElementById("start-btn");
var timerEl = document.getElementById("countdown");
var quizEl = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOverEl = document.getElementById("gameover");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreContainer = document.getElementById("highscoreContainer");
var highScoreEl = document.getElementById("high-score");
var initialsInputEl = document.getElementById("initials");
var initialsDisplayEl = document.getElementById("highScore-initials");
var displayHighScoreEl = document.getElementById("highScore-score");
var finalBtnsContainerEl = document.getElementById("endGameBtns");
// html elements that trigger the answer buttons 
var btnA = document.getElementById("1");
var btnB = document.getElementById("2");
var btnC = document.getElementById("3");
var btnD = document.getElementById("4");

// array of questions 
var questions = [{
    question: "Arrays in the JavaScript are used to store_______",
    answer1: "Numbers and Strings",
    answer2: "Other Arrays",
    answer3: "Booleans",
    answer4: "All of The Above",
    correctAnswer: "d"},
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer1: "javascript",
    answer2: "js",
    answer3: "script",
    answer4: "scripting",
    correctAnswer: "c"},
   {
    question: "Where is the correct place to insert JavaScript?",
    answer1: "The body section",
    answer2: "Both the head section and the body section are correct",
    answer3: "The head section",
    answer4: "None of the above",
    correctAnswer: "c"},
    {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answer1: "name='xxx.js'",
    answer2: "href='xxx.js'",
    answer3: "src='xxx.js",
    answer4: "id='xxx.js'",
    correctAnswer: "c"},
    {
    question: "How do you write 'Hello World' in an alert box?",
    answer1: "msgBox('Hello World');",
    answer2: "alert('Hello World');", 
    answer3: "msg('Hello World');",
    answer4: "alertBox('Hello World')",
    correctAnswer: "b"},  
    {
    question: "How do you call a function named 'myFunction'?",
    answer1: "myFunction()",
    answer2: "call function myFunction()",
    answer3: "call myFunction()",
    answer4: "function myFunction",
    correctAnswer: "a"},

];
// set countdown
var finalQuestionIndex = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// question generatior
function generateQuizQuestion(){
    gameOverEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = questions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.answer1;
    btnB.innerHTML = currentQuestion.answer2;
    btnC.innerHTML = currentQuestion.answer3;
    btnD.innerHTML = currentQuestion.answer4;
};

// start quiz function
function startQuiz(){
    gameOverEl.style.display = "none";
    startEl.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizEl.style.display = "block";
}
// function to show final score at the end of the quiz 
function showScore(){
    quizEl.style.display = "none"
    gameOverEl.style.display = "flex";
    clearInterval(timerInterval);
    initialsInputEl.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + questions.length + " correct!";
}

// save initials in local storage once the game is over 
submitScoreBtn.addEventListener("click", function highscore(){
    
    if(initialsInputEl.value === "") {
        alert("Please type initials");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initialsInputEl.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOverEl.style.display = "none";
        highscoreContainer.style.display = "flex";
        highScoreEl.style.display = "block";
        finalBtnsContainerEl.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

//  function to retrieve high scores from local storage
function generateHighscores(){
    initialsDisplayEl.innerHTML = "";
    displayHighScoreEl.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameLiEl = document.createElement("li");
        var newScoreLiEl = document.createElement("li");
        newNameLiEl.textContent = highscores[i].name;
        newScoreLiEl.textContent = highscores[i].score;
        initialsDisplayEl.appendChild(newNameLiEl);
        displayHighScoreEl.appendChild(newScoreLiEl);
    }
}

// function to display high score 
function showHighscore(){
    startEl.style.display = "none"
    gameOverEl.style.display = "none";
    highscoreContainer.style.display = "flex";
    highScoreEl.style.display = "block";
    finalBtnsContainerEl.style.display = "flex";

    generateHighscores();
}

// clear previous scores from local storage
function clearScore(){
    window.localStorage.clear();
    initialsDisplayEl.textContent = "";
    displayHighScoreEl.textContent = "";
}

// function to restart quiz and set variables back to initial 
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameOverEl.style.display = "none";
    startEl.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// check if answers are correct 
function checkAnswer(answer){
    correct = questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        // if answer is wrong, subtract 15 secs from timer 
        timeLeft = (timeLeft - 15);

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// click button to start the quiz 
startQuizButton.addEventListener("click",startQuiz);