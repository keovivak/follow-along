const anteMeridiem = "AM";
const postMeridiem = "PM";
const noonTime = 12;
const startTime = 1;
const scheduleTime = 24;

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    generateSchedule();




    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    // test
    // document.getElementById("btn").addEventListener("click", func);
    var now = dayjs();
    console.log(now);
    now = dayjs().hour();
    console.log(now);
    // document.getElementById("timeSlot").innerHTML = getTimeBlock(1, "AM");
    
});

function generateSchedule() {
    console.log("generate a days work of schedules");
    
    var timeSlotHTML = "";

    for (var timeHour = startTime; timeHour < (startTime + scheduleTime); timeHour++) {
    // for (var timeHour = 9; timeHour <= (startTime + 8); timeHour++) {
        if (timeHour < noonTime) {
            console.log(timeHour + anteMeridiem);
            timeSlotHTML += getTimeBlock(timeHour,timeHour, anteMeridiem);
            timeSlotHTML += "\n";
        } else if (timeHour >= noonTime) {
            console.log(timeHour + postMeridiem + " | " + convert12HourTime(timeHour) + postMeridiem);
            timeSlotHTML += getTimeBlock(timeHour, convert12HourTime(timeHour), postMeridiem);
            timeSlotHTML += "\n";
        }
    }

    document.getElementById("timeSlot").innerHTML = timeSlotHTML;
}

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

function convert12HourTime(timeValue) {
    var timeHour = 0;
    
    if (timeValue == noonTime) {
        timeHour = noonTime;
    } else if (timeValue > noonTime) {
        timeHour = timeValue - 12;
    }

    return(timeHour);
}