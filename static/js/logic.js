$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


// call Flask API endpoint
function makePredictions() {
    var pokemon1 = ($("#pokemon1").val() > 801) ? 1 : $("#pokemon1").val();
    var pokemon2 = ($("#pokemon2").val() > 801) ? 1 : $("#pokemon2").val();
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

            var pred_value = parseFloat(returnedData["prediction"]);
            var pred2_value = (1 - parseFloat(returnedData["prediction"]));

            var result1 = pred_value * 100;
            var result2 = pred2_value * 100;

            var percentage1 = result1.toString()
            var percentage2 = result2.toString()

            if (parseFloat(returnedData["prediction"]) > .5) {
                $("#output").text(`Pokemon ${pokemon2} wins, with a likelihood of ${percentage1.substring(0,2)}%`);
            } else {
                $("#output").text(`${pokemon1} wins, with a likelihood of ${percentage2.substring(0,2)}%`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}