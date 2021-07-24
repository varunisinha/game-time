const API_KEY = "0773ca9aaf5c56e841a981221d072a10";
var tableEl = document.querySelector("table");
var formEl = document.querySelector("#city-date-form");
var cityEl = document.querySelector("#city-dropdown");
var saveButton = document.querySelector(".save-button");
var clearButton = document.querySelector(".clear-button");
var stadiumTitleEl = document.querySelector("#event-title");
var city;

var stadiumCoor = {
    NewYork: {
        lon: "-74.0745",
        lat: "40.8135",
        stadiumName: "NYC Stadium",
        cityName: "New York City"
    },
    KansasCity: {
        lon: "-94.4839",
        lat: "39.0489",
        stadiumName: "Kansas City Stadium",
        cityName: "Kansas City"
    },
    SanFran: {
        lon: "-121.9697",
        lat: "37.4032",
        stadiumName: "San Fransisco Stadium",
        cityName: "San Francisco"

    },
    Philadelphia: {
        lon: "-75.1679",
        lat: "39.9007",
        stadiumName: "Philadelphia Stadium",
        cityName: "Philadelphia"
    },
    Houston: {
        lon: "-95.4107",
        lat: "29.6847",
        stadiumName: "Houston Stadium",
        cityName: "Houston"
    }
}

var events = null;

// create save and clear buttons
var saveButton = document.createElement("button");
var clearButton = document.createElement("button");
saveButton.innerHTML = "Save";
clearButton.innerHTML = "Clear";
formEl.appendChild(saveButton);
formEl.appendChild(clearButton);

saveButton.setAttribute("class", "save-button button button-primary");
clearButton.setAttribute("class", "clear-button button button-primary");

// Fetch weather data
formEl.addEventListener("submit", formSubmit);
cityEl.addEventListener("change", formSubmit);

// access data-city for each drop down menu item and use that information to read in api weather
function formSubmit(event) {
    event.preventDefault();
    getFromLocalStorage(cityEl.value);
    var stadium = stadiumCoor[cityEl.value];
    stadiumTitleEl.innerHTML = stadium.stadiumName;
    getLatLon(stadium.cityName);
}

// Save to local storage //
saveButton.addEventListener("click", saveEvents);

function saveEvents(event) {
    event.preventDefault();
    saveToLocalStorage(cityEl.value);
}

function saveToLocalStorage(city) {
    var stadiumEvents = events[city];
    for (var i = 0; i < 7; i++) {
        var eventNotesId = "#notes-day-" + i;
        var eventNotes = document.querySelector(eventNotesId);
        stadiumEvents[i] = eventNotes.value;
    }
    localStorage.setItem("events", JSON.stringify(events));
}

// Get from local storage
function getFromLocalStorage(city) {
    events = JSON.parse(localStorage.getItem("events")) || {
        NewYork: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        },
        KansasCity: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        },
        SanFran: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        },
        Philadelphia: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        },
        Houston: {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: ""
        }
    };
    var cityEvents = events[city];
    for (var i = 0; i < 7; i++) {
        var eventNotesId = "#notes-day-" + i;
        var eventNotes = document.querySelector(eventNotesId);
        eventNotes.value = cityEvents[i];
    }
}

clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    var stadiumEvents = events[cityEl.value];
    for (var i = 0; i < 7; i++) {
        var eventNotesId = "#notes-day-" + i;
        var eventNotes = document.querySelector(eventNotesId);
        stadiumEvents[i] = "";
        eventNotes.value = "";
    }
    localStorage.setItem("events", JSON.stringify(events));
});

initMap();
displayWeatherTable();
displayGiph();