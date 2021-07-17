var tableEl = document.querySelector("table");
var formEl = document.querySelector("#city-date-form");
var cityEl = document.querySelector("#city-dropdown");

// Create header row
var rowEl = document.createElement("tr");
var headers = ["Date", "Venue", "Event"];
for(var i=0; i<3; i++){
    var tableHeadEl = document.createElement("th");
    tableHeadEl.innerHTML = headers[i];
    rowEl.appendChild(tableHeadEl);
}
tableEl.appendChild(rowEl);

// Create row for each day
for(var i=0; i<7; i++){
    rowEl = document.createElement("tr");
    for(var j=0; j<3; j++){
        var tableDataEl = document.createElement("td");
        tableDataEl.innerHTML = headers[j];
        rowEl.appendChild(tableDataEl);
    }
    tableEl.appendChild(rowEl);
}

// Fetch weather data
const API_KEY = "0773ca9aaf5c56e841a981221d072a10";

// access data-city for each drop down menu item and use that information to read in api weather
var city;
formEl.addEventListener("submit", formSubmit);

function formSubmit(event){
    event.preventDefault();
    getLatLon(cityEl.value);
}

// Get latitude and longitude of city
function getLatLon(city){
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + API_KEY;
            getWeather(weatherUrl);
        })
        .catch(function (err) {
            alert("Please choose a city!");
            return err;
        })
}

// Get weather based on lat and lon
function getWeather(url){
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}
