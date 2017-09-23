var amountCorrect = 0;
var amountWrong = 0;
var unanswered = 0;
var number = 0;
var questions = [];
var time = 30;

questions[0] = {
    question: "How many public classes can you have delcared in one program",
    answers: ["1", "2", "3", "4"],
    correctIndex: 0,
};

questions[1] = {
    question: "How do you print something out?",
    answers: ["console.log", "System.print()", "System.out.println()", "print()"],
    correctIndex: 2,
};

questions[2] = {
    question: "What's the proper syntax for changing color in a GUI",
    answers: ["color", "COLOR", "BLUE", "blue"],
    correctIndex: 1,
};

questions[3] = {
    question: "What does the main method do?",
    answers: ["declares classes", "calls classes", "over-writes classes", "Saves class"],
    correctIndex: 1,
};



$(document).ready(function() {


    startScreen();
    $("#correctpic").hide();
    $("#incorrectpic").hide();
    $("#outoftimepic").hide();



    function startScreen() {
        number = 0;
        $("#display").html("<div id='start-screen'><div id='start'>Start</div></div>");
        $("#start").on("click", function() {
            questionsScreen();
        });
    };

    function correctScreen() {
        $("#display").html("<div class='transitions'>Correct!</div>");
        transition();
    };

    function incorrectScreen() {
        $("#display").html("<div class='transitions'>Nope!</div><div class='transitions'>The Correct Answer was: <span id='actual-answer'></span></div>");
        transition();
        $("#actual-answer").html(actualAnswer)
    };

    function outOfTime() {
        $("#display").html("<div class='transitions'>NO more time!</div><div class='transitions'>The Correct Answer was: <span id='actual-answer'></span></div>");
        transition();
        $("#actual-answer").html(actualAnswer)
    };

    function questionsScreen() {
        $("#display").html("<div id='questions-screen'><div id='header'>Time remaining: <span id='time'>30</span></div><div id='question'></div><div id='container'></div></div>");
        generateQuestion();
        timer();
        $("#correctpic").hide();
        $("#incorrectpic").hide();
        $("#outoftimepic").hide();
    };

    function finalScreen() {
        $("#display").html("<div id='final-screen'><div id='final'>All done, here's how you did!</div><div>Correct Answers: <span id='correct'></span></div><div>Incorrect Answers: <span id='incorrect'></span></div><div>Unanswered: <span id='unanswered'></span></div><div id='reset'>Start Over?</div></div>");
        $("#correct").html(amountCorrect);
        $("#incorrect").html(amountWrong);
        $("#unanswered").html(unanswered);
        $("#correctpic").hide();
        $("#incorrectpic").hide();
        $("#outoftimepic").hide();
        $("#reset").on("click", function() {
            startScreen();
        });
    };
    var clear;

    function timer() {
        var questionTime = setInterval(function() {
            clear = questionTime;
            time--;
            $("#time").html(time);
            if (time === 0) {
                unanswered++;
                number++;
                outOfTime();
                clearInterval(questionTime);
                time = 30;
                $("#outoftimepic").show();
            };
        }, 1000);
    };

    function transition() {
        var transitionTime = setTimeout(function() {
            if (number === 4) {
                finalScreen();
            } else {
                questionsScreen();
            };

        }, 5000);
    };

    var actualAnswer;

    function generateQuestion() {
        var correctLocation = questions[number].correctIndex;
        actualAnswer = questions[number].answers[correctLocation];
        $("#question").html(questions[number].question);
        for (var i = 0; i < 4; i++) {
            $("#container").append("<div class='selection' data-answer-index= " + i + ">" + questions[number].answers[i] + "</div>");
        }

        $("#container").on("click", ".selection", function() {
            clearInterval(clear);
            var answerIndex = ($(this).data("answer-index"));
            number++;



            if (answerIndex === correctLocation) {
                amountCorrect++;
                correctScreen();
                time = 30;
                $("#correctpic").show();

            } else {
                amountWrong++;
                incorrectScreen();
                time = 30;
                $("#incorrectpic").show();

            };

        });
    }

})