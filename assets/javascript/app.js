$(document).ready(function () {
    console.log("ready!");


    //create array of questions
    var questions = ["Who was the first president of the United States?", "Which country, unfortunately, borders the United States?", "Who is the Greatest President of all time?", "How can we stop Global Warming?"]
    //create array of arrays - answers to questions
    var answers = [
        [
            { option: "Barack Obama", correct: false }, { option: "George Washington", correct: true }, { option: "Benjamin Franklin", correct: false }, { option: "Pablo Escobar", correct: false }
        ],
        [
            { option: "Ecuador", correct: false }, { option: "Greenland", correct: false }, { option: "Alaska", correct: false }, { option: "Mexico", correct: true }
        ],
        [
            { option: "Donald Trump", correct: true}, {option: "Barack Obama", correct: false}, {option: "Ronald Reagan", correct: false}, {option:"Jim Carrey", correct: false}
        ],
        [
            { option: "Use less coal and oil", correct: false}, { option: "Explore renewable sources of energy", correct: false}, { option: "Eat less meat", correct: false}, {option: "Global warming is a myth made up by China", correct: true}
        ]
    ]
    // array of the correct answers + gifs to go with them
    var correctAnswersArray = [
        { answer: "George Washington"},
        { answer: "Mexico"},
        { answer: "me, Donald Trump"},
        { answer: " that global warming is a myth made up by China, obviously"}
    ]
    //correct and incorrect answer variables
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    //create function newStartButton that makes start button and on-click event that deletes button and runs startGame function
    $("#start").on("click", startGame);

    //create timer and count function
    var intervalId;
    var newImage = $("<img>")
    var time = 0
    var questionPosition = 0
    var questionDiv = $("#question");
    var answerDiv = $("#answers");
    function count() {
        $("#time").text("Time left: " + time);
        time--;
        if (time < 0) {
            unansweredQuestions++;
            clearInterval(intervalId);
            $(".answer-option").off("click");
            questionDiv.html("<h2>Too slow!</h2>")
            answerDiv.html("The correct answer was " + correctAnswersArray[questionPosition].answer);
            newImage.attr("src", "assets/images/trump.gif");
            answerDiv.append(newImage);
            questionPosition++
            showCorrectAnswer();
        }
    }
    function showNextQuestion() {
        if (questionPosition < questions.length) {
            //start/reset timer
            time = 10
            $("#time").text("Time left: " + time);
            intervalId = setInterval(count, 1000);
            answerDiv.empty();
            questionDiv.html("<h2>" + questions[questionPosition] + "</h2>")
            //loop to push answers to screen and add css properties/selectors
            for (var i = 0; i < answers[questionPosition].length; i++) {
                var newAnswer = $("<div>");
                console.log(answers[questionPosition][i].option)
                newAnswer.append(answers[questionPosition][i].option);
                newAnswer.attr("class", "answer-option");
                newAnswer.attr("correct", answers[questionPosition][i].correct);
                answerDiv.append(newAnswer);
            }
            //create on click event
            $(".answer-option").on("click", function () {
                playerChoice = this;
                //check for correct answer and add to correct and incorrect variables
                if ($(playerChoice).attr("correct") == "true") {
                    console.log("good choice");
                    correctAnswers++;
                    console.log(correctAnswers);
                    clearInterval(intervalId);
                    $(".answer-option").off("click");
                    questionDiv.html("<h2>Very talented, very smart. You must be a republican.</h2>");
                    newImage.attr("src", "assets/images/correct.gif");
                    answerDiv.html(newImage);
                    questionPosition++;
                    showCorrectAnswer();
                }
                else if ($(playerChoice).attr("correct") == "false") {
                    console.log("woops, better luck next time");
                    incorrectAnswers++;
                    console.log(incorrectAnswers);
                    clearInterval(intervalId);
                    $(".answer-option").off("click");
                    questionDiv.html("<h2>Wrong! You're Fired!</h2>");
                    answerDiv.html("The correct answer was " + correctAnswersArray[questionPosition].answer + "<br>");
                    newImage.attr("src", "assets/images/wrong.gif");
                    answerDiv.append(newImage);
                    questionPosition++;
                    showCorrectAnswer();
                }
            });
        }
        else {
            var resetButton = $("<button>")
            clearInterval(intervalId);
            questionDiv.html("<h2>Score</h2>");
            answerDiv.html("Correct Answers: " + correctAnswers + "<br>" + "Incorrect Answers: " + incorrectAnswers + "<br>" + "Unanswered Questions: " + unansweredQuestions);
            //endgame screen and create reset button
            resetButton.text("Play Again?");
            resetButton.attr("id", "reset-button");
            $("#reset").append(resetButton);
            $("#reset-button").on("click", function() {
                questionPosition = 0;
                $("#reset").empty();
                startGame();
            });
            return;
        }
    }


    function showCorrectAnswer() {
        setTimeout(showNextQuestion, 6000);
    }
    //create function startGame that runs big loop to push all questions one by one to screen
    function startGame() {
        //hide start button
        $("#start").hide();
        //put question on screen
        showNextQuestion();
    }
});