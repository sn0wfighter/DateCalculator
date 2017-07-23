function convertResult(result) {
    const weekdays = ["Samstag", "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

    return weekdays[result];
}

function calculate() {

    var currentDay = $("#day option:checked").html();
    var currentMonth = $("#month option:checked").attr("value");
    var currentYear = $("#year option:checked").html();

    // get the relevant digits as string easily...
    var decade = (currentYear)[0] + (currentYear[1]);
    decade = parseInt(decade);
    var endnumber = (currentYear[2]) + (currentYear[3]);
    endnumber = parseInt(endnumber);

    // convert data from string to int
    currentDay = parseInt(currentDay);
    currentMonth = parseInt(currentMonth);
    currentYear = parseInt(currentYear);


    // if Month is Jan or Feb
    if (currentMonth < 3) {
        // if year ends on 0, e.g. 1900...
        if (endnumber == 0) {
            currentYear -= 1;
            decade = ('' + currentYear)[0] + ('' + currentYear[1]);
            decade = parseInt(decade);
            endnumber = ('' + currentYear[2]) + ('' + currentYear[3]);
            endnumber = parseInt(endnumber);

        } else {
            endnumber -= 1;
        }

        currentMonth += 12;

    }


    var result = (currentDay + Math.floor((currentMonth + 1) * 13 / 5) + endnumber
    + Math.floor(endnumber / 4) + Math.floor(decade / 4) - 2 * decade) % 7;


    while (result < 0) {
        result += 7;
    }

    return convertResult(result);

}
