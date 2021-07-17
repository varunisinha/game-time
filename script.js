var tableEl = document.querySelector("table");

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