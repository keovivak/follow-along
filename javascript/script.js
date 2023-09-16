var quizTime = 60;
var countdownTime = null;

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
    var numberOfQuestions = 5
    document.getElementById("home").innerHTML = "Begin quiz";
    time = setInterval(myTimer, 1000);
    console.log("Number of questions = " + quizQuestions.length);
    console.log("First question is " + quizQuestions[0].question);
    // questions.forEach(question => {
    //     console.log(question.value);
    // });
}



// const numbers = [45, 4, 9, 16, 25];

// let txt = "";
// numbers.forEach(myFunction);
// document.getElementById("demo").innerHTML = txt;

// function myFunction(value, index, array) {
//   txt += value + "<br>"; 
// }