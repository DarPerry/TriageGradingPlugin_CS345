$(document).ready(function () {
    var $currentMode = "Triage";

    $("#toggleSwitch").change(function () {

        if ($("#toggleSwitch").prop("checked")) {
            $currentMode = "Standard";
        } else {
            $currentMode = "Triage";
        }


        //toggling

        $("#status").text($currentMode)

        $("#output").toggleClass("magentaText");
        // $(".score").toggleClass("magentaBorder");
        // $(".selected").toggleClass("magentaGradient");
        $("td").toggleClass("triage");
        $("td").toggleClass("standard");
    });

    var $numberOfAssignmnets = parseInt($("#slider").val());
    var $runningTotal = new Array();

    $("#slider").on("input", function () {
        //Fix issue with slider, I think it is varibale related

        if ($currentMode == "Standard") {
            if (parseInt($(this).val()) > $numberOfAssignmnets) {
                $("#mySpan").html($(this).val());
                $("#myTable").append("<tr><td class='rowHeader'>Assignment " + $(this).val() +
                    "</td><td class='score standard' >0</td><td class='score standard'>1</td><td class='score standard'>2</td><td class='score standard'>3</td><td class='assignmentMessage'></td></tr>");

                $numberOfAssignmnets++;

            } else if (parseInt($(this).val()) < $numberOfAssignmnets) {
                $("#mySpan").html($(this).val());
                $("tr").last().remove();
                $numberOfAssignmnets--;
            }





        } else if ($currentMode == "Triage") {
            if (parseInt($(this).val()) > $numberOfAssignmnets) {
                $("#mySpan").html($(this).val());
                $("#myTable").append("<tr><td class='rowHeader'>Assignment " + $(this).val() +
                    "</td><td class='score triage' >0</td><td class='score triage'>1</td><td class='score triage'>2</td><td class='score triage'>3</td><td class='assignmentMessage'></td></tr>");

                $numberOfAssignmnets++;

            } else if (parseInt($(this).val()) < $numberOfAssignmnets) {
                $("#mySpan").html($(this).val());
                $("tr").last().remove();
                $numberOfAssignmnets--;
            }
        }













    });

    $("#myTable").on("click", ".score", function () {
        $(this).toggleClass("selected");
        DisplayAssignmentFeedback($(this));
        $(this).siblings().removeClass('selected');

        var count = 0;
        $(".selected").each(function () {
            count += parseInt($(this).text());
        });

        var averageTriageGrade = (count / $(".selected").length);
        $("#total").text(averageTriageGrade);


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