var quizTime = 10;
var countdownTime = null
var userCorrectAnswers = 0;
var currentQuestion = -1;
var leaderboard = []

const quizQuestions = [
    {
        "question": "q1",
        "correctChoice": 1,
        "choices" : [
            "c1",
            "c2",
            "c3",
            "c4"
        ]
    },
    {
        "question": "q2",
        "correctChoice": 2,
        "choices" : [
            "c11", 
            "c2",
            "c3","c4"
        ]
    },
    {
        "question": "q3",
        "correctChoice": 3,
        "choices" : [
            "c111",
            "c2",
            "c3",
            "c4"
        ]
    },
    {
        "question": "q4",
        "correctChoice": 4,
        "choices" : [
            "c1111",
            "c2",
            "c3",
            "c4"
        ]
    },
    {
        "question": "q5",
        "correctChoice": 1,
        "choices" : [
            "c11111",
            "c2",
            "c3",
            "c4"
        ]
    },
    {
        "question": "Final Score: " + userCorrectAnswers,
        "choices" : [
            "<input id=\"userInitials\">",
            "<button type=\"button\" onclick=\"saveScore()\">Submit</button>",
            "",
            ""
        ]
    },
    {
        "question": "Highscores",
        "choices" : [
            leaderboard,
            "<button type=\"button\" onclick=\"clearLeaderboard()\">Clear Leaderboard</button>",
            "",
            ""
        ]
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
    if (currentQuestion == 6) {
        restartQuiz();
    }
    if (currentQuestion == -1) {
        countdownTime = setInterval(myTimer, 1000);
        console.log("currentQuestion = " + currentQuestion);
        currentQuestion = 0;
        console.log("currentQuestion = " + currentQuestion);
        console.log(quizQuestions.length);
        initializeQuiz();
    } else if (currentQuestion < (quizQuestions.length - 2) && quizTime > 0) {
        console.log("NEXT!!");
        nextQuestion();
    } else {
        console.log("quiz over");
        clearInterval(countdownTime);
        if (currentQuestion < (quizQuestions.length - 2)) {
            currentQuestion = 5;
        }
        document.getElementById("quizNext").innerHTML = ""
        nextQuestion();
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

function nextQuestion() {
    console.log("NEXT QUESTION!!");
    getQuestion();
    iterateChoices(quizQuestions[currentQuestion].choices);
}

function saveScore() {
    let initials = document.getElementById("userInitials").value;
    let initialsAndScore = initials + " - " + userCorrectAnswers + "<br>";
    leaderboard.push(initialsAndScore);
    console.log(currentQuestion);
    console.log(leaderboard.toString());
    nextQuestion();
    document.getElementById("quizNext").innerHTML = "Start Over";
    document.getElementById("quizNext").id = "quizStart";
}

function viewLeaderboard() {
    console.log("view leaderboard");
}

function restartQuiz() {
    currentQuestion = -1;
    quizTime = 10;
}

function clearLeaderboard() {
    console.log("clear");
    leaderboard = [];
    quizQuestions[currentQuestion].choices[0] = "";
    nextQuestion();
    quizQuestions[currentQuestion].choices[0] = leaderboard;
    restartQuiz();
}