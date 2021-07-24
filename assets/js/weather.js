const WEATHER_API_KEY = "0773ca9aaf5c56e841a981221d072a10";

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

// Get latitude and longitude of city
function getLatLon(stadium) {
    var lat;
    var lon;
    if (stadium != null) {
        lat = stadium.lat;
        lon = stadium.lon;
    } else {

        $("#dialog-alert").dialog({
            resizable: false,
            height: "auto",
            width: 340,
            modal: true,
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                }
            },
            open: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
                $(event.target).parent().css('top', '5px');
                var winWidth = $(window).width() / 2 - 250;
                $(event.target).parent().css('left', winWidth);
            }
        });
        $("#dialog-confirm").dialog("open");
    }

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon 
        + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + WEATHER_API_KEY;
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

                var formattedDate = dailyDate.year + "/" + dailyDate.monthNum + "/" + dailyDate.day;
                var formattedDisplayDate = dailyDate.shortWeekday + ", " + dailyDate.monthNum + "/" + dailyDate.day;
                dayEl.setAttribute("data-date", formattedDate);

                dayEl.innerHTML = formattedDisplayDate;
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
        }),
        year: date.toLocaleString("en-US", {
            year: "numeric"
        })
    };
    return dateObj;
}