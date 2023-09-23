const anteMeridiem = "AM";
const postMeridiem = "PM";
const noonTime = 12;
const startTime = 9;
const scheduleTime = 8;
const dayOfTheWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
];
const monthOfTheYear = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Will generate all time blocks with correct tense
    // no functionatilly till after button listener
    generateSchedule();
    
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    buttonListeners();


    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // Not sure - applied when generating the schedule - no need to put extra steps
    // when iniitally creating it - function will check current time to apply the
    // correct tense


    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    refreshSchedule();


    // TODO: Add code to display the current date in the header of the page.
    setToday();
});

/**
 * This will generate all the timeblocks from start time + 8 hours in a work day
 * setting the correct AM or PM
 */
function generateSchedule() {
    var timeSlotHTML = "";
    
    console.log("generate a days work of time slots");
    for (var timeHour = startTime; timeHour <= (startTime + scheduleTime); timeHour++) {
        if (timeHour < noonTime) {
            // console.log(timeHour + anteMeridiem);
            timeSlotHTML += getTimeBlock(timeHour,timeHour, anteMeridiem);
            timeSlotHTML += "\n";
        } else if (timeHour >= noonTime) {
            // console.log(timeHour + postMeridiem + " | " + convert12HourTime(timeHour) + postMeridiem);
            timeSlotHTML += getTimeBlock(timeHour, convert12HourTime(timeHour), postMeridiem);
            timeSlotHTML += "\n";
        }
    }

    document.getElementById("timeSlot").innerHTML = timeSlotHTML;
}

/**
 * This function will generate the timeblock for each hour
 * taking in the hour, tense, and AM or PM
 * @param {*} timeHour 
 * @param {*} timeView 
 * @param {*} meridiem 
 * @returns 
 */
function getTimeBlock(timeHour, timeView, meridiem) {
    var hourSlot = "hour-" + timeHour;
    var getTense = checkTimeTense(timeHour);
    var timeState = "row time-block " + getTense;
    var divHTML = ""
    
    divHTML += "<div id=\"" + hourSlot + "\" class=\"" + timeState + "\">" + "\n";
    divHTML += "<div class=\"col-2 col-md-1 hour text-center py-3\">" + timeView + meridiem + "</div>" + "\n";
    divHTML += "<textarea class=\"col-8 col-md-10 description\" rows=\"3\"> </textarea>" + "\n";
    divHTML += "<button id=\"btn-" + timeHour + "\" class=\"btn saveBtn col-2 col-md-1\" aria-label=\"save\">" + "\n";
    divHTML += "<i class=\"fas fa-save\" aria-hidden=\"true\"></i>" + "\n";
    divHTML += "</button>" + "\n";
    divHTML += "</div>" + "\n";

    return(divHTML);
}

/**
 * This will take the the current hour and compare if its greater, less, or equal
 * then make the decision of past, present or future
 * @param {int hour value} timeHour 
 * @returns 
 */
function checkTimeTense(timeHour) {
    var currentTime = dayjs().hour();
    var timeTense = "";

    if (timeHour < currentTime) {
        timeTense = "past";
    } else if (timeHour == currentTime) {
        timeTense = "present";
    } else {
        timeTense = "future";
    }

    return(timeTense);
}

/**
 * This function will take any value greater than 12 and convert it from 24hr time to 12hour time
 * if noon use 12
 * @param {hour >= 12} timeValue 
 * @returns 
 */
function convert12HourTime(timeValue) {
    var timeHour = 0;
    
    if (timeValue == noonTime) {
        timeHour = noonTime;
    } else if (timeValue > noonTime) {
        timeHour = timeValue - 12;
    }

    return(timeHour);
}

/**
 * Adds the eventlisteners to the buttons for each div time slot and button
 * links the button to the saveUserContents button to handle the process
 */
function buttonListeners() {
    var buttonPrefix = "btn-";
    var buttonId = "";

    for (var timeHour = startTime; timeHour <= (startTime + scheduleTime); timeHour++) {
        buttonId = buttonPrefix + timeHour
        // console.log("ADDING EVENT LISTENERS" + timeHour + "|" + buttonId);
        document.getElementById(buttonId).addEventListener("click", function(){
            saveUserContents($(this).parent().attr('id'), $(this).attr('id'));
        });
    }
}

/**
 * This function will get the parent id of the div and get the value of the contents
 * and saves the value into local storage
 * @param {hour-X} captureParent 
 * @param {*} captureChild // not in use
 */
function saveUserContents(captureParent, captureChild) {
    var userContents;

    userContents = document.getElementById(captureParent).firstElementChild.nextElementSibling.value;
    // console.log(userContents);
    console.log("SAVE! -> " + captureParent + " | " + userContents);
    saveLocalStorage(captureParent, userContents);
}

/**
 * This function will saved the contents typed into the textarea
 * using hour-X as the key and the contents as the value
 * @param {hour-X} hourSlot 
 * @param {value of textarea} userContents 
 */
function saveLocalStorage(hourSlot, userContents) {
    localStorage.setItem(hourSlot, userContents);
}

/**
 * When the page is loaded or refreshed
 * it will refresh all saved content values into the corresponding time slot box with its value
 * using a fixed loop based on time
 */
function refreshSchedule() {
    console.log("LOADING SAVED NOTES");
    var hourPrefix = "hour-";
    var savedUserContents;

    for (var timeHour = startTime; timeHour <= (startTime + scheduleTime); timeHour++) {
        savedUserContents = loadLocalStorage(hourPrefix + timeHour);
        document.getElementById(hourPrefix + timeHour).firstElementChild.nextElementSibling.value = savedUserContents;
    }
}

/**
 * This function will check local storage use the unique key of the timeslot box id
 * search for it in local storage and if not null return the saved value
 * @param {hour-X} hourSlot 
 * @returns savedUsercontents
 */
function loadLocalStorage(hourSlot) {
    var userContents;
    
    userContents = localStorage.getItem(hourSlot);
    if (userContents == null) {
        userContents = "";
    }

    return(userContents);
}

/**
 * set todays date in the html <p> of currentday
 * calls the function getToday() to do the conversion
 */
function setToday() {
    var currentDate = getToday();

    document.getElementById("currentDay").innerHTML = currentDate;
}

/**
 * This functions uses dayjs() to get the
 * day of the week
 * current month of the year
 * date of the month - will pass this day to convertpostfix to get the ending
 *  
 * @returns currentDate
 */
function getToday() {
    var currentDate = "";
    var currentDay = dayjs().day();
    var currentMonth = dayjs().month();
    var dayOfMonth = dayjs().date();

    currentDate += dayOfTheWeek[currentDay] + " ";
    currentDate += monthOfTheYear[currentMonth] + " ";
    currentDate += dayOfMonth + convertPostfix(dayOfMonth);
    console.log(currentDate);

    return(currentDate);
}

/**
 * This functions takes in the numeric value of the day and converts the postfix
 * returns either st, nd, rd, or th
 * 
 * @param {dayjs().day()} currentDay 
 * @returns postfix
 */
function convertPostfix(currentDay) {
    var postfix = "";

    switch(currentDay) {
        case 1:
        case 21:
        case 31:
            postfix = "st";
            break;
        case 2:
        case 22:
            postfix = "nd";
            break;
        case 3:
        case 23:
            postfix = "rd";
            break;
        default:
            postfix = "th";
    }

    return(postfix);
}