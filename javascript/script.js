var sec = 60;
var time = null

function myTimer() {
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}

function startQuiz() {
    document.getElementById("home").innerHTML = "Begin quiz";
    time = setInterval(myTimer, 1000);
}

const question1 = {
    question: "text",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4"
};

const question2 = {
    question: "text",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4"
};

const question3 = {
    question: "text",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4"
};

const question4 = {
    question: "text",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4"
};

const question5 = {
    question: "text",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4"
};