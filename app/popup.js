$(document).ready(function () {

    var $numberOfAssignmnets = parseInt($("#slider").val());
    var $runningTotal = new Array();

    $("#slider").on("input", function () {
        //Fix issue with slider, I think it is varibale related

        if (parseInt($(this).val()) > $numberOfAssignmnets) {
            $("#mySpan").html($(this).val());
            $("#myTable").append("<tr><td class='rowHeader'>Assignment " + $(this).val() +
                "</td><td class='score' >0</td><td class='score'>1</td><td class='score'>2</td><td class='score'>3</td><td class='assignmentMessage'></td></tr>");

            $numberOfAssignmnets++;

        } else if (parseInt($(this).val()) < $numberOfAssignmnets) {
            $("#mySpan").html($(this).val());
            $("tr").last().remove();
            $numberOfAssignmnets--;
        }
    });

    $("#myTable").on("click", ".score", function () {
        $(this).toggleClass("selected");
        DisplayAssignmentFeedback($(this));
        $(this).siblings().removeClass('selected');

        //and text to list
        

        $("#total").text(parseInt($("#total").text()) + parseInt($(this).text()));
        //displan in span
    });


});

function DisplayAssignmentFeedback(score) {
    if ($(score).text() == "0") {
        $(score).parent().find(".assignmentMessage").html("Assignment Not Done.");
    }

    if ($(score).text() == "1") {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, But Clearly Incorrect.");
    }

    if ($(score).text() == "2") {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, But Only Partially Correct.");
    }

    if ($(score).text() == "3") {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, and Clearly Correct.");
    }
}