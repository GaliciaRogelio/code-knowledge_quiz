var timerEl = document.getElementById("countdown");
var startBtn = document.getElementById("start-btn");
var nextBtn = document.querySelector(".next-btn");
var questionContEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerBtnEl = document.getElementById("answer-buttons");

let randomQuestions, currentQuestionIndex

startBtn.addEventListener('click', startQuiz)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});

function startQuiz(){
    count = 60;
    console.log('started');
    startBtn.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContEl.classList.remove('hide');
    setNextQuestion()
};


function setNextQuestion() {
    resetState()
    showQuestion(randomQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    });
}

function resetState() {
    nextBtn.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild
        (answerBtnEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusclass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusclass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex +1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'restart'
        startBtn.classList.remove('hide')
    }
};

 function setStatusclass(element, correct) {
     clearStatusClass(element)
     if (correct) {
         
         element.classList.add('correct')
     } else {
         element.classList.add('wrong')
     }
 }

 function clearStatusClass(element) {
     element.classList.remove('correct')
     element.classList.remove('wrong')
 }

// the array of questions for the quiz
var questions = [
    {
        question: "Arrays in the JavaScript are used to store_____",
        answer: [
            { text: "numbers and strings", correct: false},
            { text:  "Other arrays", correct: false},
            { text:  "booleans", correct: false},
            { text:  "All of the above", correct: true}
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: [
            {text: "<javascript>", correct: false},
            {text: "<js>", correct: false},
            {text: "<script>", correct: true},
            {text: "<scripting>", correct: false},
        ]
    },
    {
        question: "Where is the correct place to insert JavaScript?",
        answer: [
            {text: "The <body> section", correct: false},
            {text: "Both the <head> section and the <body> section are correct", correct: false},
            {text: "The <head> section", correct: true},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answer: [
            {text: "<script name='xxx.js'>", correct: false},
            {text: "<script href='xxx.js'>", correct: false},
            {text: "<script src='xxx.js>", correct: true},
            {text: "<script id='xxx.js'>;", correct: false},
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answer: [
            {text: "msgBox('Hello World');", correct: false},
            {text:  "alert('Hello World');", correct: true},
            {text:  "msg('Hello World');", correct: false},
            {text: "alertBox('Hello World');", correct: false}
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answer: [
            {text: "myFunction()", correct: true},
            {text: "call function myFunction()", correct: false},
            {text: "call myFunction()", correct: false},
            {text: "function myFunction", correct: false},
        ]
    },
];

function timer() {
    count = count - 1;
    if (count < 60) {
        countdown.innerHTML = count;
    }
    if (count < 1) {
        window.clearInterval(update);
    }
}

update = setInterval("timer()", 1000);