$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


// call Flask API endpoint
function makePredictions() {
    var pokemon1 = $("#pokemon1").val();
    var pokemon2 = $("#pokemon2").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "pokemon1": pokemon1,
        "pokemon2": pokemon2
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            if (returnedData["prediction"] === "1") {
                $("#output").text(`${pokemon2} wins!`);
            } else {
                $("#output").text(`${pokemon1} wins!`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}