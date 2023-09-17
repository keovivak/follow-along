const timelimit = 60;
var quizTime = timelimit;
var countdownTime = null
var userCorrectAnswers = 0;
var currentQuestion = -1;
var correctAnswer = 1;
var leaderboard = []

const quizQuestions = [
    {
        "question": "q1",
        "correctChoice": 0,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">C1</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">C2</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">C3</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">C4</label><br>"
        ]
    },
    {
        "question": "q2",
        "correctChoice": 1,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">C11</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">C2</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">C3</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">C4</label><br>"
        ]
    },
    {
        "question": "q3",
        "correctChoice": 2,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">C111</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">C2</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">C3</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">C4</label><br>"
        ]
    },
    {
        "question": "q4",
        "correctChoice": 3,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">C1111</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">C2</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">C3</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">C4</label><br>"
        ]
    },
    {
        "question": "q5",
        "correctChoice": 0,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">C1111</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">C2</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">C3</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">C4</label><br>"
        ]
    },
    {
        "question": "",
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
    if (quizTime > 0) {
        document.getElementById('timer').innerHTML = quizTime;
    } else {
        quizTime = 0;
        document.getElementById('timer').innerHTML = quizTime;
    }
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
        captureAnswer();
        nextQuestion();
    } else {
        if (quizTime > 0) {
            captureAnswer();
        }
        console.log("quiz over");
        clearInterval(countdownTime);
        if (currentQuestion < (quizQuestions.length - 2)) {
            currentQuestion = 5;
        }
        document.getElementById("quizNext").innerHTML = ""
        quizQuestions[currentQuestion].question = "Final Score: " + userCorrectAnswers;
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

function captureAnswer() {
    var choiceSelection = "";
    var userChoice;
    for (let questionChoice=0; questionChoice<4; questionChoice++) {
        choiceSelection = "choice" + (questionChoice + 1);
        console.log(choiceSelection);
        console.log(document.getElementById(choiceSelection).checked);
        if (document.getElementById(choiceSelection).checked) {
            userChoice = questionChoice;
        }
    }
    console.log("USER SELECTED: " + userChoice);
    console.log("CORRECT CHOICE: " + quizQuestions[currentQuestion].correctChoice);
    if (quizQuestions[currentQuestion-1].correctChoice == userChoice) {
        console.log("CORRECT!");
        userCorrectAnswers += 1;
    } else {
        console.log("wrong");
        quizTime -= currentQuestion * 3;
    }
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
    userCorrectAnswers = 0;
    quizTime = timelimit;
}

function clearLeaderboard() {
    console.log("clear");
    leaderboard = [];
    quizQuestions[currentQuestion].choices[0] = "";
    nextQuestion();
    quizQuestions[currentQuestion].choices[0] = leaderboard;
    restartQuiz();
}