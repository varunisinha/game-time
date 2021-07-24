function saveToLocalStorage(city) {
    var stadiumEvents = eventsList[city];
    for (var i = 0; i < 7; i++) {
        var eventDateEl = document.querySelector("#date-day-" + i);
        var eventNotesEl = document.querySelector("#notes-day-" + i);
        var eventDate = eventDateEl.getAttribute("data-date");
        var eventNotes = eventNotesEl.value;
        //Save only the dates which has non-empty event notes
        if (eventNotes.trim() != "") {
            stadiumEvents[eventDate] = eventNotes;
        }
    }
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
}

function getEmptyEventsList() {
    var emptyEventsList = {};
    for (var stadiumKey in stadiumCoor) {
        emptyEventsList[stadiumKey] = {}
    }
    return emptyEventsList;
}

// Get from local storage
function getFromLocalStorage(city) {
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || getEmptyEventsList();

    var cityEvents = eventsList[city];
    if (cityEvents) {
        for (var i = 0; i < 7; i++) {
            var eventDateEl = document.querySelector("#date-day-" + i);
            var eventNotesEl = document.querySelector("#notes-day-" + i);
            var eventDate = eventDateEl.getAttribute("data-date");

            eventNotesEl.value = cityEvents[eventDate] || "";
        }
    }
}

// Now, it's clearing properly, but when we refresh the page, it's not automatically displaying
function clearVenueEvents() {
    var stadiumEvents = eventsList[cityEl.value];
    for (var i = 0; i < 7; i++) {
        var eventNotesId = "#notes-day-" + i;
        var eventNotes = document.querySelector(eventNotesId);
        var eventDateEl = document.querySelector("#date-day-" + i);
        var eventDate = eventDateEl.getAttribute("data-date");
        delete stadiumEvents[eventDate];
        eventNotes.value = "";
    }
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
}