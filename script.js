const API_KEY = "0773ca9aaf5c56e841a981221d072a10";
var tableEl = document.querySelector("table");
var formEl = document.querySelector("#city-date-form");
var cityEl = document.querySelector("#city-dropdown");
var city;

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
        var dateEl = document.createElement("p");
        var weatherIconEl = document.createElement("img");
        
        tableDataEl.appendChild(dateEl);
        tableDataEl.appendChild(weatherIconEl);
        rowEl.appendChild(tableDataEl);
        // set ids for first column
        if(j===0){
            tableDataEl.setAttribute("id", "day" + i);
            dateEl.setAttribute("id", "date" + i);
            weatherIconEl.setAttribute("id", "weather" + i);
        }
    }
    tableEl.appendChild(rowEl);
}

// Fetch weather data
formEl.addEventListener("submit", formSubmit);

// access data-city for each drop down menu item and use that information to read in api weather
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

// Get and display weather based on lat and lon
function getWeather(url){
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i=0; i<7; i++){
                var dateId = "#date" + i;
                var weatherId = "#weather" + i;
                var dayEl = document.querySelector(dateId);
                var weatherEl = document.querySelector(weatherId);
                var icon = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";

                dailyDate = getDate(data.daily[i].dt);
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
        shortWeekday: date.toLocaleString("en-US", { weekday: "short" }), 
        longWeekday: date.toLocaleString("en-US", { weekday: "long" }),
        monthName: date.toLocaleString("en-US", {month: "long"}), 
        monthNum: date.toLocaleString("en-US", { month: "numeric" }), 
        day: date.toLocaleString("en-US", { day: "numeric" })
    };
    return dateObj;
}
