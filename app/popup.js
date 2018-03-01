$(document).ready(function () {
    var $currentMode = "Triage";
    var numberOfAssignmnets = 0;


    $("#addAssignmentBtn").click(function () {
        if ($currentMode == "Standard") {
            numberOfAssignmnets++;
            $("#mySpan").html(numberOfAssignmnets);
            $("#myTable").append("<tr><td class='rowHeader'>New Assignment</td><td id='decrease'>-</td><td class='score standard' value = 'first' >0</td><td class='score standard'>1</td><td class='score standard'>2</td><td class='score standard'>3</td><td id='increase'>+</td><td class='assignmentMessage'></td></tr>");


        } else if ($currentMode == "Triage") {
            numberOfAssignmnets++;
            $("#mySpan").html(numberOfAssignmnets);
            $("#myTable").append("<tr><td class='rowHeader'>New Assignment</td><td id='decrease'>-</td></td><td class='score triage' >0</td><td class='score triage'>1</td><td class='score triage'>2</td><td class='score triage'>3</td><td id='increase'>+</td><td class='assignmentMessage'></td></tr>");
        }

    })

    $("#subtractAssignmentBtn").click(function () {
        if (numberOfAssignmnets > 0) {
            numberOfAssignmnets--;
            $("#mySpan").html(numberOfAssignmnets);
            $("tr").last().remove();
        }
    })


    $("#myTable").on("dblclick", ".rowHeader", function () {

        $(this).replaceWith("<td class='rowHeader'><input type = 'text' id = 'newText'></td>");

    });

    $("#myTable").on("keypress", "#newText", function (e) {

        if (e.which == 13) {
            $newText = $(this).val();
            $(this).replaceWith("<td class='rowHeader'> " + $newText + "</td>");
        }
    })

    $("#myTable").on("click", "#increase", function () {
        var counter = -1;

        $(this).parent().find(".score").each(function (score) {
            counter += 1;

            $(this).text(parseInt($(this).text()) + counter);
        })
    })

    $("#myTable").on("click", "#decrease", function () {
        var counter = -1;


            $(this).parent().find(".score").each(function (score) {
                counter += 1;

                $(this).text(parseInt($(this).text()) - counter);
            })
    })

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
                if ($(this).is(" tr .score:nth-child(3)")) {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'F'");
                }
                if ($(this).is(" tr .score:nth-child(4)")) {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'D'");
                }
                if ($(this).is(" tr .score:nth-child(5)")) {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'C' (Average)");
                }
                if ($(this).is(" tr .score:nth-child(6)")) {
                    $(this).parent().find(".assignmentMessage").html("Letter Grade: 'A'");
                }
            })
        } else if ($currentMode == "Triage") {
            ShowTriageGrade();
            $(".triage.selected").each(function (selectedScore) {
                if ($(this).is(" tr .score:nth-child(3)")) {
                    $(this).parent().find(".assignmentMessage").html("Assignment Not Done.");
                }
                if ($(this).is(" tr .score:nth-child(4)")) {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, But Clearly Incorrect.");
                }
                if ($(this).is(" tr .score:nth-child(5)")) {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, But Only Partially Correct.");
                }
                if ($(this).is(" tr .score:nth-child(6)")) {
                    $(this).parent().find(".assignmentMessage").html("Assignment Done, and Clearly Correct.");
                }
            })
        }
    });

    var $numberOfAssignmnets = parseInt($("#slider").val());
    var $runningTotal = new Array();









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
    if ($(score).is(" tr .score:nth-child(3)")) {
        $(score).parent().find(".assignmentMessage").html("Assignment Not Done.");
    }

    if ($(score).is(" tr .score:nth-child(4)")) {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, But Clearly Incorrect.");
    }

    if ($(score).is(" tr .score:nth-child(5)")) {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, But Only Partially Correct.");
    }

    if ($(score).is(" tr .score:nth-child(6)")) {
        $(score).parent().find(".assignmentMessage").html("Assignment Done, and Clearly Correct.");
    }
}

function DisplayStandardAssignmentFeedback(score) {
    if ($(score).is(" tr .score:nth-child(3)")) {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'F'");
    }

    if ($(score).is(" tr .score:nth-child(4)")) {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'D'");
    }

    if ($(score).is(" tr .score:nth-child(5)")) {
        $(score).parent().find(".assignmentMessage").html("Letter Grade: 'C' (Average)");
    }

    if ($(score).is(" tr .score:nth-child(6)")) {
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