// All common generic functions are defined here

// To custom date object
function toCustomDateObj(date) {
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


// Read in unix date and return standard date object 
function converToDateFromUnix(unix) {
    var timeStamp = unix * 1000;
    var date = new Date(timeStamp);
    return date;
}

function formatDateForDisplay(dateObj) {
    var dt = toCustomDateObj(dateObj);
    var res = dt.shortWeekday + ", " + dt.monthNum + "/" + dt.day;
    return res;
}

function formatDateToYMD(dateObj) {
    var dt = toCustomDateObj(dateObj);
    var res = dt.year + "/" + dt.monthNum + "/" + dt.day;
    return res;
}

// Function to show the message as alert using modal
function showMessage(messageHtml, dialogTitle) {
    var msg = "<span class='ui-icon ui-icon-alert' style='margin:12px 12px 20px 0;'></span>" +
        messageHtml;

    $("#dialog-alert").html(msg);

    var dlg = $("#dialog-alert").dialog({
        title: dialogTitle || "Game Time",
        autoOpen: false,
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
    dlg.dialog("open");

}