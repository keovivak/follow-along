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
        // console.log("Number of questions = " + quizQuestions.length);
        // console.log("First question is " + quizQuestions[0].question);
    } else if (quizState == 0) {
        console.log("NEXT!!");
    }
    
    // questions.forEach(question => {
    //     console.log(question.value);
    // });
    // questionLoop();
    
}

function initializeQuiz() {
    // console.log(quizQuestionsSet[0].choices.forEach(iterateChoices));
    // document.getElementById("quizQuestionChoices").innerHTML = choiceOutput;
    document.getElementById("quizStart").innerHTML = "Next";
    document.getElementById("quizStart").id = "quizNext";
    iterateChoices();
    // document.getElementById("quizBox").innerHTML = quizQuestions[0].question;
    // input.map(elem => Object.fromEntries(elem))
    // // document.getElementById("quizQuestionChoices").innerHTML = "choices"
    // setChoices();
    // document.getElementById("quizNext").onclick = "nextQustion()"
}

function iterateChoices() {
    for (i=1; i<4; i++) {

    }
    // choiceOutput += choice + "<br>";
    // choiceOutput = "<input type=\"radio\" id="c1" name=" + choice + " value=" + HTML+ "></input>";
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
