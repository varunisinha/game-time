const API_KEY = "0773ca9aaf5c56e841a981221d072a10";
var tableEl = document.querySelector("table");
var formEl = document.querySelector("#city-date-form");
var cityEl = document.querySelector("#city-dropdown");
var saveButton = document.querySelector(".save-button");
var clearButton = document.querySelector(".clear-button");
var city;

var stadiumCoor = {
    NewYork: {
        lon: "-74.0745",
        lat: "40.8135"
    },
    KansasCity: {
        lon: "-94.4839",
        lat: "39.0489"
    },
    SanFran: {
        lon: "-121.9697",
        lat: "37.4032"
    },
    Philadelphia: {
        lon: "-75.1679",
        lat: "39.9007"
    },
    Houston: {
        lon: "-95.4107",
        lat: "29.6847"
    }
}

var events = JSON.parse(localStorage.getItem("events")) || {
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
}

// create save and clear buttons
var saveButton = document.createElement("button");
var clearButton = document.createElement("button");
saveButton.innerHTML = "Save";
clearButton.innerHTML = "Clear";
formEl.appendChild(saveButton);
formEl.appendChild(clearButton);

saveButton.setAttribute("class", "save-button button button-primary");
clearButton.setAttribute("class", "clear-button button button-primary");

// Create table to display weather
function displayWeatherTable() {

    // Create header row
    var rowEl = document.createElement("tr");
    var headers = ["Date", "Weather", "Event"];
    for (var i = 0; i < headers.length; i++) {
        var tableHeadEl = document.createElement("th");
        tableHeadEl.innerHTML = headers[i];
        rowEl.appendChild(tableHeadEl);
    }
    tableEl.appendChild(rowEl);

    // Create row for each day
    for (var i = 0; i < 7; i++) {
        rowEl = document.createElement("tr");
        rowEl.setAttribute("id", "day" + i);

        // Create td and span element to display date 
        var tableDataEl = document.createElement("td");
        var dateEl = document.createElement("span");
        dateEl.setAttribute("id", "date-day-" + i);
        tableDataEl.appendChild(dateEl);
        rowEl.appendChild(tableDataEl);

        // Create td and img element to display the weather icon
        tableDataEl = document.createElement("td");
        var weatherIconEl = document.createElement("img");
        weatherIconEl.setAttribute("id", "weather-day-" + i);
        tableDataEl.appendChild(weatherIconEl);
        rowEl.appendChild(tableDataEl);

        // Create td and textarea element to display event information
        tableDataEl = document.createElement("td");
        var textAreaEl = document.createElement("textarea");
        textAreaEl.setAttribute("id", "notes-day-" + i);
        tableDataEl.appendChild(textAreaEl);
        rowEl.appendChild(tableDataEl);

        tableEl.appendChild(rowEl);
    }
}

// Fetch weather data
formEl.addEventListener("submit", formSubmit);

// access data-city for each drop down menu item and use that information to read in api weather
function formSubmit(event) {
    event.preventDefault();
    getFromLocalStorage(cityEl.value);
    getLatLon(cityEl.value);
}

// Get latitude and longitude of city
function getLatLon(city) {
    var lat;
    var lon;
    if (city === "New York City") {
        lat = stadiumCoor.NewYork.lat;
        lon = stadiumCoor.NewYork.lon;
    } else if (city === "Kansas City") {
        lat = stadiumCoor.KansasCity.lat;
        lon = stadiumCoor.KansasCity.lon;
    } else if (city === "San Francisco") {
        lat = stadiumCoor.SanFran.lat;
        lon = stadiumCoor.SanFran.lon;
    } else if (city === "Philadelphia") {
        lat = stadiumCoor.Philadelphia.lat;
        lon = stadiumCoor.Philadelphia.lon;
    } else if (city === "Houston") {
        lat = stadiumCoor.Houston.lat;
        lon = stadiumCoor.Houston.lon;
    } else {
        alert("Please choose a city!");
    }

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + API_KEY;
    getWeather(weatherUrl);

    showMap(lat, lon);

}

// Get and display weather based on lat and lon
function getWeather(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < 7; i++) {
                var dateId = "#date-day-" + i;
                var weatherId = "#weather-day-" + i;
                var dayEl = document.querySelector(dateId);
                var weatherEl = document.querySelector(weatherId);
                var dailyDate = getDate(data.daily[i].dt);
                var icon = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";

                dayEl.innerHTML = dailyDate.shortWeekday + ", " + dailyDate.monthNum + "/" + dailyDate.day;
                weatherEl.setAttribute("src", icon);
            }
        })
}

// Read in unix date and return standard date
function getDate(unix) {
    var timeStamp = unix * 1000;
    var date = new Date(timeStamp);

    var dateObj = {
        shortWeekday: date.toLocaleString("en-US", {
            weekday: "short"
        }),
        longWeekday: date.toLocaleString("en-US", {
            weekday: "long"
        }),
        monthName: date.toLocaleString("en-US", {
            month: "long"
        }),
        monthNum: date.toLocaleString("en-US", {
            month: "numeric"
        }),
        day: date.toLocaleString("en-US", {
            day: "numeric"
        })
    };
    return dateObj;
}

//Map object 
var map = null;
var mapTarget = null;

function initMap() {
    // Where you want to render the map.
    var element = document.getElementById('osm-map');

    // Height has to be set. You can do this in CSS too.
    element.style = 'height:300px;';

    // Create Leaflet map on map element.
    map = L.map(element);

    // Add OSM tile layer to the Leaflet map.
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Target's GPS coordinates.
    mapTarget = L.latLng(stadiumCoor.NewYork.lat, stadiumCoor.NewYork.lon);

    // Set map's center to target with zoom 14.
    map.setView(mapTarget, 14);

}

function showMap(lat, lon) {
    //Remove the previously added marker
    if (mapTarget != null) {
        L.marker(mapTarget).remove(map);
    }
    // Target's GPS coordinates.
    mapTarget = L.latLng(lat, lon);
    // Set map's center to target with zoom 14.
    map.setView(mapTarget, 14);
    // Place a marker on the same location.
    L.marker(mapTarget).addTo(map);

}

// Save to local storage //
saveButton.addEventListener("click", saveEvents);

function saveEvents(event) {
    event.preventDefault();
    saveToLocalStorage(cityEl.value);
}

function saveToLocalStorage(city) {
    if (city === "New York City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.NewYork[i] = eventNotes.value;
        }
    } else if (city === "Kansas City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.KansasCity[i] = eventNotes.value;
        }
    } else if (city === "San Francisco") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.SanFran[i] = eventNotes.value;
        }
    } else if (city === "Philadelphia") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.Philadelphia[i] = eventNotes.value;
        }
    } else if (city === "Houston") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.Houston[i] = eventNotes.value;
        }
    }
    localStorage.setItem("events", JSON.stringify(events));
}

// Get from local storage
function getFromLocalStorage(city) {
    if (city === "New York City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            eventNotes.value = events.NewYork[i];
        }
    } else if (city === "Kansas City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            eventNotes.value = events.KansasCity[i];
        }
    } else if (city === "San Francisco") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            eventNotes.value = events.SanFran[i];
        }
    } else if (city === "Philadelphia") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            eventNotes.value = events.Philadelphia[i];
        }
    } else if (city === "Houston") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            eventNotes.value = events.Houston[i];
        }
    }
}

clearButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (cityEl.value === "New York City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.NewYork[i] = "";
            eventNotes.value = "";
        }
    } else if (cityEl.value === "Kansas City") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.KansasCity[i] = "";
            eventNotes.value = "";
        }
    } else if (cityEl.value === "San Francisco") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.SanFran[i] = "";
            eventNotes.value = "";
        }
    } else if (cityEl.value === "Philadelphia") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.Philadelphia[i] = "";
            eventNotes.value = "";
        }
    } else if (cityEl.value === "Houston") {
        for (var i = 0; i < 7; i++) {
            var eventNotesId = "#notes-day-" + i;
            var eventNotes = document.querySelector(eventNotesId);
            events.Houston[i] = "";
            eventNotes.value = "";
        }
    }
    localStorage.setItem("events", JSON.stringify(events));
});

initMap();
displayWeatherTable();