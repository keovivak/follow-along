var quizTime = 10;
var countdownTime = null
var userCorrectAnswers = 0;

const quizQuestions = [
    {
        "question": "q1",
        "choice1": "1",
        "choice2": "2",
        "choice3": "3",
        "choice4": "4",
        "correctChoice": 2
    },
    {
        "question": "q2",
        "choice1": "1",
        "choice2": "2",
        "choice3": "3",
        "choice4": "4",
        "correctChoice": 2
    },
    {
        "question": "q3",
        "choice1": "1",
        "choice2": "2",
        "choice3": "3",
        "choice4": "4",
        "correctChoice": 2
    },
    {
        "question": "q4",
        "choice1": "1",
        "choice2": "2",
        "choice3": "3",
        "choice4": "4",
        "correctChoice": 2
    },
    {
        "question": "q5",
        "choice1": "1",
        "choice2": "2",
        "choice3": "3",
        "choice4": "4",
        "correctChoice": 2
    }
];


function myTimer() {
    document.getElementById('timer').innerHTML = quizTime;
    quizTime--;
    if (quizTime == -1) {
        clearInterval(countdownTime);
        alert("Time out!! :(");
    }
}

function startQuiz() {
    initializeQuiz();
    countdownTime = setInterval(myTimer, 1000);
    console.log("Number of questions = " + quizQuestions.length);
    console.log("First question is " + quizQuestions[0].question);
    // questions.forEach(question => {
    //     console.log(question.value);
    // });
    questionLoop();
}

function initializeQuiz() {
    document.getElementById("quizBox").innerHTML = quizQuestions[0].question;
    document.getElementById("quizQuestionChoices").innerHTML = "choices"
    document.getElementById("quizStart").innerHTML = "Next";
    document.getElementById("quizStart").id = "quizNext";
}

function questionLoop() {
    let questionDisplay = "";
    document.getElementById("home").innerHTML = questionDisplay;
    questionDisplay += quizQuestions[0].question;
}



// const numbers = [45, 4, 9, 16, 25];

// let txt = "";
// numbers.forEach(myFunction);
// document.getElementById("demo").innerHTML = txt;

// function myFunction(value, index, array) {
//   txt += value + "<br>"; 
// }