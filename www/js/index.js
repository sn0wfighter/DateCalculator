/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


$("body").on("deviceready", onDeviceReady(), false);

function onDeviceReady() {

    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
    "August", "September", "Oktober", "November", "Dezember"];

    // create day dropdown menu items
    for (var i = 1; i <= 31; i++) {
        $("#day").append('<option>' + i + '</option>');
    }

    // create month dropdown menu items
    for (var i = 1; i <= months.length; i++) {
        $("<option>" + months[i-1] + "</option>").attr("value", i).appendTo("#month");

    }

    // $("#ergebnis").html( $("#year option[selected=selected]").val() );


    // create year dropdown menu items
    for (var i = 1600; i <= 2099; i++) {
        $("#year").append('<option>' + i +  '</option>');
    }



    /* Section for search in listview */
    $.mobile.document
    // "filter-menu-menu" is the ID generated for the listview when it is created
    // by the custom selectmenu plugin. Upon creation of the listview widget we
    // want to prepend an input field to the list to be used for a filter.
    .on("listviewcreate", "#year-menu", function (e) {

        var input,
        listbox = $("#year-listbox"),
        form = listbox.jqmData("filter-form"),
        listview = $(e.target);
        // We store the generated form in a variable attached to the popup so we
        // avoid creating a second form/input field when the listview is
        // destroyed/rebuilt during a refresh.
        if (!form) {
            input = $("<input data-type='search'></input>");
            form = $("<form></form>").append(input);
            input.textinput();
            $("#year-listbox")
            .prepend(form)
            .jqmData("filter-form", form);
        }
        // Instantiate a filterable widget on the newly created listview and
        // indicate that the generated input is to be used for the filtering.
        listview.filterable({
            input: input
        });
    })
    // The custom select list may show up as either a popup or a dialog,
    // depending how much vertical room there is on the screen. If it shows up
    // as a dialog, then the form containing the filter input field must be
    // transferred to the dialog so that the user can continue to use it for
    // filtering list items.
    //
    // After the dialog is closed, the form containing the filter input is
    // transferred back into the popup.
    .on("pagebeforeshow pagehide", "#year-dialog", function (e) {
        var form = $("#year-listbox").jqmData("filter-form"),
        placeInDialog = (e.type === "pagebeforeshow"),
        destination = placeInDialog ? $(e.target).find(".ui-content") : $("#year-listbox");
        form.find("input")
        // Turn off the "inset" option when the filter input is inside a dialog
        // and turn it back on when it is placed back inside the popup, because
        // it looks better that way.
        .textinput("option", "inset", !placeInDialog)
        .end()
        .prependTo(destination);
    });



    $("#calculator").on("swipeleft", function() {

        $("body").pagecontainer("change", "#about", { transition: "slide" });

    });

    $("#about").on("swiperight", function() {

        $("body").pagecontainer("change", "#calculator", { transition: "slide",
        reverse: "true" });

    });

    $(".date-container").on("change", function () {
        var result = calculate();
        if (result == undefined) {
            result = "Angabe ungültig/unvollständig";
        }

        $("#result").html("Ergebnis: " + result.toString());
    });

    $("#contents p").css({
        "font-size": "16px",
        "font-family": "Verdana",
        "text-transform": "uppercase",
        "font-variant": "small-caps"
    });


}
