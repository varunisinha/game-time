var tableEl = document.querySelector("table");
var formEl = document.querySelector("#city-date-form");
var cityEl = document.querySelector("#city-dropdown");
var saveButton = document.getElementById("btn-save");
var clearButton = document.getElementById("btn-clear");
var stadiumTitleEl = document.querySelector("#event-title");

var eventsList = null;

// access data-city for each drop down menu item and use that information to read in api weather
function loadStadiumData(stadium) {
    // If no stadium/city is selected alert the user without continuing
    if (stadium != null) {
        loadEventsFromLocalStorage();
        showMap(stadium.lat, stadium.lon, stadium.description);
        stadiumTitleEl.innerHTML = stadium.stadiumName;
        displayWeatherDetails(stadium, function () {
            displayEventDetails(cityEl.value);
        });
    }
}

// Event handler for stadium dropdown change
function onStadiumCityChange(event) {
    event.preventDefault();
    var stadium = stadiumCoor[cityEl.value];
    // If no stadium/city is selected alert the user without continuing
    if (stadium == null) {
        // Show message to the user
        showMessage("Please select a venue");

        // Clear the weather data for any previously selected stadium
        clearWeatherTable();

        // Disable buttons        
        saveButton.setAttribute("disabled", "true");
        clearButton.setAttribute("disabled", "true");

        // Return from the function if no staidum is selected
        return;
    } else {
        // Enable buttons
        saveButton.removeAttribute("disabled");
        clearButton.removeAttribute("disabled");
    }
    loadStadiumData(stadium);
}
// Fetch weather data 
cityEl.addEventListener("change", onStadiumCityChange); // it's not registering the first change

// Save to local storage 
saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    saveToLocalStorage(cityEl.value);
    showMessage("Successfully saved the events");
});

// Clear button event handler
clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 500,
        modal: true,
        buttons: {
            "Yes": function () {
                clearVenueEvents();
                $(this).dialog("close");
            },
            "No": function () {
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

});

// Load all venues from the stadiumCoor object from data-stadium.js
function loadVenues() {
    for (var itemKey in stadiumCoor) {
        var stadium = stadiumCoor[itemKey];
        var opt = document.createElement("option");
        opt.value = itemKey;
        opt.text = stadium.cityName;
        cityEl.appendChild(opt);
    }
}

// Function to execute all related functions to initialize the page 
function intializeApp() {
    loadVenues();
    initMap();
    displayWeatherTable();
    displayGiph();
}

// Initialize all data for the page
intializeApp();