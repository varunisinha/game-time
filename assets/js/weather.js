const WEATHER_API_KEY = "0773ca9aaf5c56e841a981221d072a10";

// Create table to display weather
function displayWeatherTable() {

    // Create header row
    var rowEl = document.createElement("tr");
    var headers = ["Date <br>[starting today]", "Weather", "Event"];
    for (var i = 0; i < headers.length; i++) {
        var tableHeadEl = document.createElement("th");
        tableHeadEl.innerHTML = headers[i];
        rowEl.appendChild(tableHeadEl);
    }
    tableEl.appendChild(rowEl);

    // Start Date
    var dailyDate = new Date();

    // Create row for each day
    for (var i = 0; i < 7; i++) {
        dailyDate.setDate(dailyDate.getDate() + i);

        rowEl = document.createElement("tr");
        rowEl.setAttribute("id", "day" + i);

        // Create td and span element to display date 
        var tableDataEl = document.createElement("td");
        var dateEl = document.createElement("span");
        dateEl.setAttribute("id", "date-day-" + i);
        dateEl.innerHTML = formatDateForDisplay(dailyDate); 

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

// Use the latitude and longitude from the stadium object to fetch the weather details for the location
function displayWeatherDetails(stadium, fnAfterWeatherLoad) {
    if (stadium != null) {
        var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?" +
            "&exclude=minutely,hourly,alerts&units=imperial&appid=" + WEATHER_API_KEY;
        var weatherUrl = weatherBaseUrl + "&lat=" + stadium.lat + "&lon=" + stadium.lon;
        getWeather(weatherUrl, fnAfterWeatherLoad);
    }
}

// Get and display weather based on lat and lon
function getWeather(url, fnAfterWeatherLoad) {
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
                var dailyDate = converToDateFromUnix(data.daily[i].dt);

                var icon = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";

                var formattedDate = formatDateToYMD(dailyDate);
                var formattedDisplayDate = formatDateForDisplay(dailyDate);

                dayEl.setAttribute("data-date", formattedDate);
                dayEl.innerHTML = formattedDisplayDate;
                weatherEl.setAttribute("src", icon);
            }

            // If function to execute after the weather details are fetched isnot empty
            // execute/call that function
            if (fnAfterWeatherLoad) {
                fnAfterWeatherLoad();
            }
        })
}