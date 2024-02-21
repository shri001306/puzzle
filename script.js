let quiz = document.querySelector("#quiz");
let questionContainer = document.querySelector("#questionContainer");
let answersDiv = document.querySelector("#answers");
let assessment = document.querySelector("#assessment");
let imageArea = document.querySelector("#image_area");

let totalSeconds = 250;
let timeRemining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let correctScore = 0;
let time = setInterval(timer, 1000);

let quizArray = [
    {
        question: "A train overtakes two persons walking along a railway track. The first one walks at 4.5 km/hr. The other one walks at 5.4 km/hr. The train needs 8.4 and 8.5 seconds respectively to overtake them. What is the speed of the train if both the persons are walking in the same direction as the train?",
        answer: "81km/hr",
        image: "./assets/download.jpeg",
    },
    // Add more questions with one-sentence answers
];

init();
startQuiz();

function timer() {
    timeRemining = totalSeconds - secondsElapsed - 1 - discountSeconds;
    secondsElapsed++;
    if (timeRemining <= 0) {
        clearInterval(time);
        gameOver("time_out");
    }
}

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    let currentQuestionObj = quizArray[currentQuestion];
    questionContainer.innerHTML = `<h5>${currentQuestionObj.question}</h5>`;
    
    let image = document.createElement("img");
    image.setAttribute("src", currentQuestionObj.image);
    image.setAttribute("class", "movie-image rounded");
    imageArea.innerHTML = "";
    imageArea.appendChild(image);

    let answerButton = document.createElement("button");
    answerButton.setAttribute("type", "button");
    answerButton.setAttribute("class", "answerButton");
    answerButton.textContent = "Submit Answer";
    answersDiv.innerHTML = "";
    answersDiv.appendChild(answerButton);
    
    answerButton.addEventListener("click", assessAnswer);
}

function assessAnswer() {
    let userAnswer = prompt("Enter your answer:").trim(); // Get the user's answer through prompt
    let currentQuestionObj = quizArray[currentQuestion];

    if (userAnswer.toLowerCase() === currentQuestionObj.answer.toLowerCase()) {
        displayAssessment(true);
        correctAnswers++;
    } else {
        discountSeconds += 3;
        clearInterval(time);
        time = setInterval(timer, 1000);
        displayAssessment(false);
    }

    currentQuestion++;
    if (currentQuestion === quizArray.length) {
        gameOver("questions_done");
    } else {
        showQuestion();
    }
}

function displayAssessment(correct) {
    assessment.style.display = "block";
    if (correct) {
        assessment.setAttribute("class", "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center");
        assessment.innerHTML = "<strong>Correct</strong>";
    } else {
        assessment.setAttribute("class", "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center");
        assessment.innerHTML = "<strong>Incorrect. </strong> 3 secs. discounted. Keep trying!!";
    }

    setTimeout(function () {
        assessment.style.display = "none";
    }, 1000);
}

function gameOver(cause) {
    if (cause === "questions_done") {
        console.log("QUESTIONS DONE");
        setTimeout(() => {
            assessment.setAttribute("class", "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center");
            assessment.innerHTML = "<strong>Quiz finished</strong> Good luck!";
        }, 1500);
        clearInterval(time);
    } else if (cause === "time_out") {
        console.log("TIME OUT");
        assessment.setAttribute("class", "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center");
        assessment.innerHTML = "<strong>Time finished</strong> Good luck!";
    } else {
        return false;
    }

    assessment.style.display = "block";
    setTimeout(function () {
        quiz.style.display = "none";
        assessment.style.display = "none";
    }, 3000);
}

function init() {
    quiz.style.display = "block";
    totalSeconds = 250;
    timeRemining = totalSeconds;
    secondsElapsed = 0;
    discountSeconds = 0;
    currentQuestion = 0;
    correctAnswers = 0;
    correctScore = 0;
}
