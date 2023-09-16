var quizTime = 10;
var countdownTime = null
var userCorrectAnswers = 0;
var currentQuestion = -1

let quizQuestions = [
    {
        "question": "q1",
        "correctChoice": 1,
        "choices" : ["c1", "c2", "c3", "c4"]
    },
    {
        "question": "q2",
        "correctChoice": 2,
        "choices" : ["c11", "c2", "c3", "c4"]
    },
    {
        "question": "q3",
        "correctChoice": 3,
        "choices" : ["c111", "c2", "c3", "c4"]
    },
    {
        "question": "q4",
        "correctChoice": 4,
        "choices" : ["c1111", "c2", "c3", "c4"]
    },
    {
        "question": "q5",
        "correctChoice": 1,
        "choices" : ["c11111", "c2", "c3", "c4"]
    }
]


function myTimer() {
    document.getElementById('timer').innerHTML = quizTime;
    quizTime--;
    if (quizTime == -1) {
        clearInterval(countdownTime);
        alert("Time out!! :(");
    }
}

function startQuiz() {
    if (currentQuestion == -1) {
        countdownTime = setInterval(myTimer, 1000);
        console.log("currentQuestion = " + currentQuestion);
        currentQuestion = 0;
        console.log("currentQuestion = " + currentQuestion);
        console.log(quizQuestions.length);
        initializeQuiz();
    } else if (currentQuestion < quizQuestions.length && quizTime > 0) {
        console.log("NEXT!!");
        nextQustion();
    } else {
        console.log("quiz over");
    }

    currentQuestion += 1;
}

function initializeQuiz() {
    document.getElementById("quizStart").innerHTML = "Next";
    document.getElementById("quizStart").id = "quizNext";
    console.log(quizQuestions[currentQuestion].choices);
    getQuestion();
    iterateChoices(quizQuestions[currentQuestion].choices);
}

function getQuestion() {
    document.getElementById("quizBox").innerHTML = quizQuestions[currentQuestion].question;
}

function iterateChoices(questionChoices) {
    for (let questionChoice=0; questionChoice<questionChoices.length; questionChoice++) {
        setChoices(questionChoice, questionChoices[questionChoice]);
    }
}

function setChoices(questionChoice, questionValue) {
    quizQuestionChoice = "quizQuestionChoice" + (questionChoice + 1);
    document.getElementById(quizQuestionChoice).innerHTML = questionValue;
}

function nextQustion() {
    console.log("NEXT QUESTION!!");
    getQuestion();
    iterateChoices(quizQuestions[currentQuestion].choices);
}


// const numbers = [45, 4, 9, 16, 25];

// let txt = "";
// numbers.forEach(myFunction);
// document.getElementById("demo").innerHTML = txt;

// function myFunction(value, index, array) {
//   txt += value + "<br>"; 
// }

// let input = [
//     [['firstName', 'Joe'], ['lastName', 'Blow'], ['age', 42], ['role', 'clerk']],
//     [['firstName', 'Mary'], ['lastName', 'Jenkins'], ['age', 36], ['role', 'manager']]
// ]

// console.log(input.map(elem => Object.fromEntries(elem)))
