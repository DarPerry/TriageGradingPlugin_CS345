$(document).ready(function () {
    var $currentMode = "Triage";

    $("#toggleSwitch").change(function () {

        $("#standardModeHeader").toggleClass("unselectedMode");
        $("#triageModeHeader").toggleClass("unselectedMode");



        if ($("#toggleSwitch").prop("checked")) {
            $currentMode = "Standard";
        } else {
            $currentMode = "Triage";
        }

        $("#status").text($currentMode + " Mode")

        $("#status").toggleClass("magentaText");
        $("#output").toggleClass("magentaText");
        $("td").toggleClass("triage");
        $("td").toggleClass("standard");

        if ($currentMode == "Standard") {
            ShowStandardGrade();
            $(".standard.selected").each(function (selectedScore) {
                if ($(this).text() == '0') {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'F'");
                }
                if ($(this).text() == '1') {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'D'");
                }
                if ($(this).text() == '2') {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'C' (Average)");
                }
                if ($(this).text() == '3') {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'A'");
                }
            })
        } else if ($currentMode == "Triage") {
            ShowTriageGrade();
            $(".triage.selected").each(function (selectedScore) {
                if ($(this).text() == '0') {
                    $(this).parent().find(".assignmentMessage").html("Assignment Not Done.");
                }
                if ($(this).text() == '1') {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, But Clearly Incorrect.");
                }
                if ($(this).text() == '2') {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, But Only Partially Correct.");
                }
                if ($(this).text() == '3') {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, and Clearly Correct.");
                }
            })
        }
    });

    var $numberOfAssignmnets = parseInt($("#slider").val());
    var $runningTotal = new Array();

    $("#slider").on("input", function () {

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


        if ($currentMode == "Standard") {
            $(this).toggleClass("selected");
            DisplayStandardAssignmentFeedback($(this));
            $(this).siblings().removeClass('selected');
            ShowStandardGrade();

        }

        if ($currentMode == "Triage") {

            $(this).toggleClass("selected");
            DisplayTriageAssignmentFeedback($(this));
            $(this).siblings().removeClass('selected');
            ShowTriageGrade();

        }
    });
});

function DisplayTriageAssignmentFeedback(score) {
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

function DisplayStandardAssignmentFeedback(score) {
    if ($(score).text() == "0") {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'F'");
    }

    if ($(score).text() == "1") {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'D'");
    }

    if ($(score).text() == "2") {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'C' (Average)");
    }

    if ($(score).text() == "3") {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'A'");
    }
}

function ShowTriageGrade() {
    var count = 0;
    $(".selected").each(function () {
        count += parseInt($(this).text());
    });

    var averageTriageGrade = (count / $(".selected").length);
    $("#total").text(averageTriageGrade.toFixed(2));
}

function ShowStandardGrade() {
    var studentScore = 0;
    var totalPoints = 0;

    $(".selected").each(function () {
        studentScore += parseInt($(this).text());
        totalPoints += 3;
    });


    var standardPercentage = (studentScore / totalPoints);
    var letterGrade = "";

    if (standardPercentage >= 0.95) {
        letterGrade = 'A';
    } else if (standardPercentage >= 0.90) {
        letterGrade = 'A-';
    } else if (standardPercentage >= 0.84) {
        letterGrade = 'B+';
    } else if (standardPercentage >= 0.79) {
        letterGrade = 'B';
    } else if (standardPercentage >= 0.73) {
        letterGrade = 'B-';
    } else if (standardPercentage >= 0.68) {
        letterGrade = 'C+';
    } else if (standardPercentage >= 0.57) {
        letterGrade = 'C';
    } else if (standardPercentage >= 0.45) {
        letterGrade = 'C-';
    } else if (standardPercentage >= 0.34) {
        letterGrade = 'D+';
    } else if (standardPercentage >= 0.18) {
        letterGrade = 'D';
    } else if (standardPercentage >= 0.90) {
        letterGrade = 'F';
    }


    $("#total").text(letterGrade);
}