$(document).ready(function () {
    var $currentMode = "triage";
    var numberOfAssignmnets = 0;

    $("#addAssignmentBtn").click(function () {
        numberOfAssignmnets++;
        $("#assignmentNumber").html(numberOfAssignmnets);
        $("#scoreTable").append("<tr><td class='rowHeader'>New Assignment</td><td id='decrease'>-</td><td class='score " + $currentMode + "' value = 'first' >0</td><td class='score " + $currentMode + "'>1</td><td class='score " + $currentMode + "'>2</td><td class='score " + $currentMode + "'>3</td><td id='increase'>+</td><td class='assignmentMessage'></td></tr>");
    });

    $("#subtractAssignmentBtn").click(function () {
        if (numberOfAssignmnets > 0) {
            numberOfAssignmnets--;
            $("#assignmentNumber").html(numberOfAssignmnets);
            $("tr").last().remove();
        }
    });

    $("#scoreTable").on("dblclick", ".rowHeader", function () {
        $(this).replaceWith("<td class='rowHeader'><input type = 'text' id = 'newText'></td>");
    });

    $("#scoreTable").on("keypress", "#newText", function (event) {
        if (event.which == 13) {
            $newText = $(this).val();
            $(this).replaceWith("<td class='rowHeader'> " + $newText + "</td>");
        }
    });

    $("#scoreTable").on("click", "#increase", function () {
        var counter = -1;
        $(this).parent().find(".score").each(function (score) {
            counter += 1;
            $(this).text(parseInt($(this).text()) + counter);
        })
        if ($currentMode == "triage") {
            ShowTriageGrade();
        } else if ($currentMode == "standard") {
            ShowStandardGrade();
        }
    });

    $("#scoreTable").on("click", "#decrease", function () {
        if (parseInt($(this).parent().find(".score:nth-child(4)").html()) > 1) {
            var counter = -1;
            $(this).parent().find(".score").each(function (score) {
                counter += 1;
                $(this).text(parseInt($(this).text()) - counter);
            })
            if ($currentMode == "triage") {
                ShowTriageGrade();
            } else if ($currentMode == "standard") {
                ShowStandardGrade();
            }
        }
    });

    $("#toggleSwitch").change(function () {

        if ($("#toggleSwitch").prop("checked")) {
            $currentMode = "standard";
        } else {
            $currentMode = "triage";
        }

        AlternateColors();

        if ($currentMode == "standard") {
            ShowStandardGrade();
            $(".standard.selected").each(function () {
                DetermineStandardDisplayMessage($(this));
            });

        } else if ($currentMode == "triage") {
            ShowTriageGrade();
            $(".triage.selected").each(function () {
                DetermineTriageDisplayMessage($(this));
            })
        }
    });


    $("#scoreTable").on("click", ".score", function () {
        $(this).toggleClass("selected");
        $(this).siblings().removeClass('selected');
        if ($currentMode == "standard") {
            DisplayStandardAssignmentFeedback($(this));
            ShowStandardGrade();
        }
        if ($currentMode == "triage") {
            DisplayTriageAssignmentFeedback($(this));
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

        totalPoints += parseInt($(this).parent().find(".score:nth-child(6)").html());
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
    } else if (standardPercentage < 0.18) {
        letterGrade = 'F';
    }


    $("#total").text(letterGrade);
}

function DisplayMessage(element, message) {
    element.parent().find(".assignmentMessage").html(message);
}

function AlternateColors() {
    $("#standardModeHeader").toggleClass("unselectedMode");
    $("#triageModeHeader").toggleClass("unselectedMode");
    $("#output").toggleClass("magentaText");
    $("td").toggleClass("triage");
    $("td").toggleClass("standard");
}

function DetermineStandardDisplayMessage(element) {
    if (element.is(" tr .score:nth-child(3)")) {
        DisplayMessage(element, "Letter Grade: 'F'");
    }
    if (element.is(" tr .score:nth-child(4)")) {
        DisplayMessage(element, "Letter Grade: 'D'");
    }
    if (element.is(" tr .score:nth-child(5)")) {
        DisplayMessage(element, "Letter Grade: 'C' (Average)");
    }
    if (element.is(" tr .score:nth-child(6)")) {
        DisplayMessage(element, "Letter Grade: 'A'");
    }
}

function DetermineTriageDisplayMessage(element) {
    if (element.is(" tr .score:nth-child(3)")) {
        DisplayMessage(element, "Assignment Not Done.");
    }
    if (element.is(" tr .score:nth-child(4)")) {
        DisplayMessage(element, "Assignment Done, But Clearly Incorrect.");
    }
    if (element.is(" tr .score:nth-child(5)")) {
        DisplayMessage(element, "Assignment Done, But Only Partially Correct.");
    }
    if (element.is(" tr .score:nth-child(6)")) {
        DisplayMessage(element, "Assignment Done, and Clearly Correct.");
    }
}