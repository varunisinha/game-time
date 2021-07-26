// Function to save the event details for the selected city
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
        else {
            //Remove the property from the JSON object if it was not empty before
          delete  stadiumEvents[eventDate];
        }
    }
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
}

// Function to load event data from local storage
function loadEventsFromLocalStorage()
{
    var emptyEventsList = {};
    for (var stadiumKey in stadiumCoor) {
        emptyEventsList[stadiumKey] = {}
    }
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || emptyEventsList;
}

// Function to display the event details to the table fields
function displayEventDetails(city) {
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

// Function to just clear the fields in the table
function clearWeatherTable() {
    for (var i = 0; i < 7; i++) {
        var eventNotesId = "#notes-day-" + i;
        var weatherId = "#weather-day-" + i;
        var eventNotes = document.querySelector(eventNotesId);
        var weatherEl = document.querySelector(weatherId);
        eventNotes.value = "";
        weatherEl.setAttribute("src", "");
    }
}

// Function to clear the fields for the selected stadium/cityand save the data and reload it.
function clearVenueEvents() {
    clearWeatherTable();
    saveToLocalStorage(cityEl.value);
    var stadium = stadiumCoor[cityEl.value]; 
    loadStadiumData(stadium);
}