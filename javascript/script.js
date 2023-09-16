var quizTime = 10;
var countdownTime = null
var userCorrectAnswers = 0;
var quizState = -1

let quizQuestions = [
    {
        "question": "q1",
        "correctChoice": 1,
        "choices" : ["c1", "c2", "c3", "c4"]
    },
    {
        "question": "q2",
        "correctChoice": 2,
        "choices" : ["c1", "c2", "c3", "c4"]
    },
    {
        "question": "q3",
        "correctChoice": 3,
        "choices" : ["c1", "c2", "c3", "c4"]
    },
    {
        "question": "q4",
        "correctChoice": 4,
        "choices" : ["c1", "c2", "c3", "c4"]
    },
    {
        "question": "q5",
        "correctChoice": 1,
        "choices" : ["c1", "c2", "c3", "c4"]
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
    if (quizState == -1) {
        countdownTime = setInterval(myTimer, 1000);
        console.log("quizState = " + quizState);
        quizState = 0;
        console.log("quizState = " + quizState);
        initializeQuiz();
    } else if (quizState == 0) {
        console.log("NEXT!!");
    }
}

function initializeQuiz() {
    // console.log(quizQuestionsSet[0].choices.forEach(iterateChoices));
    // document.getElementById("quizQuestionChoices").innerHTML = choiceOutput;
    document.getElementById("quizStart").innerHTML = "Next";
    document.getElementById("quizStart").id = "quizNext";
    console.log(quizQuestions[0].choices);
    iterateChoices(quizQuestions[0].choices);
}

function iterateChoices(questionChoices) {
    document.getElementById("quizQuestionChoice1").innerHTML = questionChoices[0];
    document.getElementById("quizQuestionChoice2").innerHTML = questionChoices[1];
    document.getElementById("quizQuestionChoice3").innerHTML = questionChoices[2];
    document.getElementById("quizQuestionChoice4").innerHTML = questionChoices[3];
}

function setChoices() {
    console.log("SET QUESTION CHOICES");
    // console.log(quizQuestions.forEach());
}

function nextQustion() {
    console.log("NEXT QUESTION!!");
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

// let input = [
//     [['firstName', 'Joe'], ['lastName', 'Blow'], ['age', 42], ['role', 'clerk']],
//     [['firstName', 'Mary'], ['lastName', 'Jenkins'], ['age', 36], ['role', 'manager']]
// ]

// console.log(input.map(elem => Object.fromEntries(elem)))
