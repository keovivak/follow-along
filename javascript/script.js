/**
 * Global consts
 */
const timelimit = 60;
var quizTime = timelimit;
var countdownTime = null
var userCorrectAnswers = 0;
var currentQuestion = -1;
var correctAnswer = 1;
var leaderboard = []

/**
 * array of objects of quiz questions plus choices
 * stored the actual html within the functions
 * VERY HACKY and manual
 * There is probably a more efficient way to generate HTML from javascript
 * but I can't remember off the top of my head or bother to look at this time
 * it works good enough but def could use a lot of improvements
 * 
 * LOTS OF ROOM for improvement
 * using jquery and event listeners that will handle multiple functions
 * using the create functions to generate the HTML
 */
const quizQuestions = [
    {
        "question": "What kind of fish is Nemo from Finding Nemo?",
        "correctChoice": 0,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">Clownfish</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">Shark</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">Dory</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">Goldfish</label><br>"
        ]
    },
    {
        "question": "Who lives in a pineapple under the sea?",
        "correctChoice": 1,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">Mr. Crabbs</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">Spongebob</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">Squidward</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">Patrick</label><br>"
        ]
    },
    {
        "question": "What kind of animal is Simba",
        "correctChoice": 2,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">Baboon</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">Warthog</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">Lion</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">Meerkat</label><br>"
        ]
    },
    {
        "question": "What is Shrek?",
        "correctChoice": 3,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">Goblin</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">Troll</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">Orc</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">Ogre</label><br>"
        ]
    },
    {
        "question": "How many sides does a square have?",
        "correctChoice": 0,
        "choices" : [
            "<input type=\"radio\" id=\"choice1\" name=\"choices\" value=\"C1\"><label for=\"choice1\">4</label><br>",
            "<input type=\"radio\" id=\"choice2\" name=\"choices\" value=\"C2\"><label for=\"choice1\">6</label><br>",
            "<input type=\"radio\" id=\"choice3\" name=\"choices\" value=\"C3\"><label for=\"choice1\">8</label><br>",
            "<input type=\"radio\" id=\"choice4\" name=\"choices\" value=\"C4\"><label for=\"choice1\">5</label><br>"
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

/**
 * timer function - taken from stackoverflow
 * modified to not display negative time
 */
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

/**
 * Essentially the driver for the whole app
 * On button click for start, it'll init the first question then process the next questions
 * as long as not end of quiz or time is up will iterate through questions
 * if starting quiz will start the timer
 * end condition where if last question is answered or time is up will go to the submit name screen
 */
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

/**
 * Initializes the quiz at the start
 * Changes the HTML to represent the correct flow
 * Gets the first question and sets
 * Displays the choices for the first question
 */
function initializeQuiz() {
    document.getElementById("quizStart").innerHTML = "Next";
    document.getElementById("quizStart").id = "quizNext";
    console.log(quizQuestions[currentQuestion].choices);
    getQuestion();
    iterateChoices(quizQuestions[currentQuestion].choices);
}

/**
 * This function gets the current question and sets it within the quizBox p tag on the HTML side
 * using the question object within the questions array
 */
function getQuestion() {
    document.getElementById("quizBox").innerHTML = quizQuestions[currentQuestion].question;
}

/**
 * questionChoices is the array object of the set of choices
 * @param {*} questionChoices
 * This function loops through the set of choices and then calls the setChoices() to display the values
 */
function iterateChoices(questionChoices) {
    for (let questionChoice=0; questionChoice<questionChoices.length; questionChoice++) {
        setChoices(questionChoice, questionChoices[questionChoice]);
    }
}

/**
 * questionChoice represenets the value of the iterator from the loop who calls this function
 * @param {*} questionChoice
 * questionValue represents the actual value within the choices objects
 * @param {*} questionValue 
 * Called by a loop
 * This function sets the choice value to the p tag
 */
function setChoices(questionChoice, questionValue) {
    let quizQuestionChoice = "quizQuestionChoice" + (questionChoice + 1);
    document.getElementById(quizQuestionChoice).innerHTML = questionValue;
}

/**
 * Caputres the user selected answer
 * iterates through all the buttons and determines which one the user selected
 * saves the user choice then does a comparison to see if the user selected the right answer
 * no need to iterate the choices because the object knows the correct index of the correct answer
 * time does get subtracted if the answer is wrong by using the current question number multiplied by a factor of 3
 */
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

/**
 * Generates the next question
 * Retrieves the current question
 * Then iterates those the choice list and displays it
 */
function nextQuestion() {
    getQuestion();
    iterateChoices(quizQuestions[currentQuestion].choices);
}

/**
 * Saves the score
 * Gets the user inputted value
 * pushes the value to the leaderboard array
 * renames button variable to represent start over
 * calls nextQuestion() to generate the next page by using the leaderboard objects
 * THERE IS A BUG - because of how I store the leaderboard using an array and just outputting it
 * the array output object is kept and there is a , present in the names
 */
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

/**
 * Future function, maybe...
 */
function viewLeaderboard() {
    console.log("view leaderboard");
}

/**
 * Reset quiz global variables;
 * init current question back to -1
 * reset correct answers and sets the time back to original
*/
function restartQuiz() {
    currentQuestion = -1;
    userCorrectAnswers = 0;
    quizTime = timelimit;
}

/**
 * Clears the leaderboard
 * Sets the leaderboard to empty, regenerate the webpage by calling the nextQuestion()
 * to display the leadboard object
 * Reset the leaderboard back to leaderboard
*/
function clearLeaderboard() {
    leaderboard = [];
    quizQuestions[currentQuestion].choices[0] = "";
    nextQuestion();
    quizQuestions[currentQuestion].choices[0] = leaderboard;
    restartQuiz();
}