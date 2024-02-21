/* --------------- Query Selectors --------------- */

let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector(".progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let audioCorrect = document.querySelector("#audioCorrect");
let audioIncorrect = document.querySelector("#audioIncorrect");
let audioApplause = document.querySelector("#audioApplause");
let audioTollingBell = document.querySelector("#audioTollingBell");
let audioThunder = document.querySelector("#audioThunder");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighscoresBtn = document.querySelector("#clearHighscoresBtn");
let image_area = document.querySelector("#image_area");

/* ------- Global Variable Declarations ------- */

let totalSeconds = 250;
let timeRemining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswers = 0;
let correctScore = 0;
var localHighscoresArray = [];
let time = setInterval(timer, 1000);
let justRegistered = false;
clearInterval(time);

/* --------------- Quiz Array --------------- */

// Questions based on: laffgaff "DISNEY TRIVIA QUESTIONS AND ANSWERS": https://laffgaff.com/disney-trivia-questions-answers/
let quizArray = [
  {
    question:
      "A train overtakes two persons walking along a railway track. The first one walks at 4.5 km/hr. The other one walks at 5.4 km/hr. The train needs 8.4 and 8.5 seconds respectively to overtake them. What is the speed of the train if both the persons are walking in the same direction as the train?",
    options: ["66 km/hr", "72 km/hr", "78km/hr", "81km/hr"],
    correct: "81km/hr",
    image: "./assets/download.jpeg",
  },
  {
    question:
      "Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:",
    options: ["50 m", "72 m", "80 m", "82 m"],
    correct: "50 m",
    image: "./assets/images.png",
  },
  {
    question:
      "A pointer to a block of memory is effectively same as an array",
    options: ["True", "False"],
    correct: "True",
    image: "./assets/images (1).jpeg",
  },
  {
    question: "int (*ptr)[10];",
    options: [
      "ptr is array of pointers to 10 integers",
      "ptr is a pointer to an array of 10 integers",
      "ptr is an array of 10 integers",
      "ptr is an pointer to array"],
    correct: "ptr is a pointer to an array of 10 integers",
    image: "./assets/images (1).png",
  },
  {
    question:
      "A pointer is",
    options: [
      "A keyword used to create variables",
      "A variable that stores address of an instruction",
      "A variable that stores address of other variable",
      "All of the above"],
    correct: "A variable that stores address of other variable",
    image: "./assets/images (2).jpeg",
  },
  {
    question: "In which header file is the NULL macro defined?",
    options: [
      "stdio.h",
      "stddef.h",
      "stdio.h and stddef.h",
      "math.h"],
    correct: "stdio.h and stddef.h",
    image: "./assets/images (4).jpeg",
  },
  {
    question:
      "In each question below, there is a sentence of which some parts have been jumbled up. Rearrange these parts which are labelled P, Q, R and S to produce the correct sentence. Choose the proper sequence.When heP :	did not knowQ :	he was nervous andR :	heard the hue and cry at midnightS :	what to doThe Proper sequence should be:",
    options: [
      "RQPS",
      "QSPR",
      "SQPR",
      "PQRS"],
    correct: "RQPS",
    image: "./assets/images.jpeg",
  },
  {
    question:
      "A table is bought for Rs.400 and sold at Rs.500 find gain or loss percentage",
    options: [
      "25% loss",
      "30% gain",
      "25% gain",
      "30% loss"],
    correct: "25% gain",
    image: "./assets/images.png",
  },
  {
    question: "Two numbers are respectively 20% and 50% more than a third number, the ratio of the two numbers is",
    options: ["2:5", "3:5", "4:5", "6:7"],
    correct: "4:5",
    image: "./assets/unnamed.jpg",
  },
  {
    question: "In a bag there are coins of 25p, 10p & 5p in the ratio of 1:2:3. If there is Rs.30 in all, how many 5p coins are there?",
    options: ["50", "100", "150", "200"],
    correct: "150",
    image: "./assets/Top-Aptitude-Test-Questions-Answers.jpg.webp",
  },
  {
    question:
      "Sam bought 6 articles for Rs.5 and sold 5 articles for Rs.6. What is his gain or loss precentage?",
    options: ["22% gain", "44% gain", "22% loss", "44% loss"],
    correct: "44% gain",
    image: "./assets/medium-illustration-man-taking-test.webp",
  },
  {
    question:
      "If twice the son's age in years is added to the father's age is added to the son's age, the sum is 95. What is the age of the son?",
    options: ["15", "45", "40", "30"],
    correct: "15",
    image: "./assets/medium-choosing-a-career-aptitude-test.jpg",
  },
  {
    question: "A man is 24 years older than his son. In two years, he will be twice as old as of his son. The present age of his son is:",
    options: ["14 years", "18 years", "20 years", "22 years"],
    correct: "22 years",
    image: "./assets/aptitude-1024x658.jpeg",
  },
  {
    question: "How many numbers are there from 100 to 200, divisible by 2 or 3",
    options: ["67", "84", "68", "73"],
    correct: "67",
    image: "./assets/10-Online-Examination-Software-Features-That-Make-Online-Exams-A-Breeze-01-1024x555.png",
  },
  {
    question: "Which of following number is divisible by each one of 3,7,9 & 11",
    options: ["639", "2079", "3791", "37911", "None of these"],
    correct: "2079",
    image: "./assets/images.png",
  },
];

/* ------------- Event Management ------------- */

startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);
submit.addEventListener("click", addToHighscores);
clearHighscoresBtn.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e) {
  loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
  if (justRegistered) {
    init();
  }
});

init();

/* ------------- Functions Declaration ------------- */

function init() {
  timeSpan.textContent = timeRemining;
  quiz.style.display = "none";
  allDone.style.display = "none";
  assesFT.style.display = "none";
  intro.style.display = "block";
  startBtn.style.display = "block";
  progressBar.style.display = "none";

  totalSeconds = 250;
  timeRemining = totalSeconds;
  secondsElapsed = 0;
  discountSeconds = 0;
  currentQuestion = 0;
  progress = 0;
  correctAnswers = 0;
  correctScore = 0;
  justRegistered = false;
  timeSpan.textContent = timeRemining;

  if (localStorage.getItem("highscore")) {
    localHighscoresArray = localStorage.getItem("highscore").split(",");
  }
  clearInterval(time);
  updateProgress();

  allDone.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
  submit.setAttribute("class", "btn btn-info");
  progressBar.firstElementChild.setAttribute(
    "class",
    "progress-bar bg-info progress-bar-striped progress-bar-animated"
  );
}

function startQuiz() {
  intro.style.display = "none";
  startBtn.style.display = "none";
  quiz.style.display = "block";
  time = setInterval(timer, 1000);
  progressBar.style.display = "block";
  showQuestion();
}

function timer() {
  timeRemining = totalSeconds - secondsElapsed - 1 - discountSeconds;
  timeSpan.textContent = timeRemining;
  secondsElapsed++;
  if (timeRemining <= 0) {
    clearInterval(time);
    disableQuestions();
    gameOver("time_out");
  }
}

function showQuestion() {
  questionH5.textContent = quizArray[currentQuestion].question;
  var optionsBtnsArray = [];
  var indexArray = [];
  var image = document.createElement("img");
  image.setAttribute("src", quizArray[currentQuestion].image);
  image.setAttribute("class", "movie-image rounded");
  image_area.append(image);

  for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
    var questionBtn = document.createElement("button");
    questionBtn.setAttribute("type", "button");
    questionBtn.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-info mt-1 answerButton"
    );
    questionBtn.setAttribute("data-index", i);
    if (i === 0) {
      questionBtn.setAttribute("correct", "yes");
    } else {
      questionBtn.setAttribute("correct", "no");
    }
    questionBtn.textContent = quizArray[currentQuestion].options[i];
    answersDiv.append(questionBtn);
    indexArray.push(i);
  }

  answersDiv.childNodes.forEach(function (child) {
    var rndIndex = Math.floor(Math.random() * indexArray.length);
    answersDiv.append(answersDiv.children[rndIndex]);
    indexArray.splice(rndIndex, 1);
  });
}

function disableQuestions() {
  let questionsAssed = document.querySelectorAll(".answerButton");
  questionsAssed.forEach((element) => {
    element.setAttribute(
      "class",
      "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled"
    );
    if (
      parseInt(element.getAttribute("data-index")) ===
      quizArray[currentQuestion].correct
    ) {
      element.setAttribute(
        "class",
        "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
      );
    }
  });
}

function assesSelection(event) {
  if (event.target.matches("button")) {
    var userAnswer = event.target.textContent.trim(); // Get the text content of the selected option and remove leading/trailing whitespaces
    var timeInterval = 1000;
    disableQuestions();
    
    // Compare the user's answer with the correct answer
    if (userAnswer === quizArray[currentQuestion].correct.trim()) {
      // The user selected the correct answer
      displayFTAlert(true);
      correctAnswers++;
    } else {
      // The user selected the wrong answer
      discountSeconds += 3;
      clearInterval(time);
      time = setInterval(timer, 1000);
      displayFTAlert(false);
    }
    
    currentQuestion++;
    updateProgress();

    if (currentQuestion === quizArray.length) {
      timeInterval = 5000;
      gameOver("questions_done");
    } else {
      setTimeout(removeQuestionsButtons, 1000);
      setTimeout(showQuestion, 1001);
    }

    setTimeout(function () {
      assesFT.style.display = "none";
    }, timeInterval);
  }
}


function updateProgress() {
  progress = Math.floor((currentQuestion / quizArray.length) * 100);
  var styleStr = String("width: " + progress + "%; height: 100%;");
  progressBar.firstElementChild.setAttribute("style", styleStr);
  progressBar.firstElementChild.textContent = progress + " %";
  correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
}

function displayFTAlert(correct) {
  if (correct) {
    audioCorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Correct</strong>";
    assesFT.style.display = "block";
  } else {
    audioIncorrect.play();
    assesFT.setAttribute(
      "class",
      "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML =
      "<strong>Incorrect. </strong> 3 secs. discounted. Keep trying!!";
    assesFT.style.display = "block";
    timeSpan.style.color = "red";
    setTimeout(function () {
      timeSpan.style.color = "black";
    }, 1000);
  }
}

function removeQuestionsButtons() {
  questionH5.textContent = "";
  var child = answersDiv.lastElementChild;
  while (child) {
    answersDiv.removeChild(child);
    child = answersDiv.lastElementChild;
  }
  while (image_area.hasChildNodes()) {
    image_area.removeChild(image_area.childNodes[0]);
  }
}

function gameOver(cause) {
  if (cause === "questions_done") {
    console.log("QUESTIONS DONE");
    setTimeout(() => {
      assesFT.setAttribute(
        "class",
        "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML = "<strong>Quiz finished</strong> Good luck!";
    }, 1500);
    clearInterval(time);
  } else if (cause === "time_out") {
    console.log("TIME OUT");
    disableQuestions();
    audioTollingBell.play();
    setTimeout(() => {
      audioTollingBell.pause();
    }, 4000);
    assesFT.setAttribute(
      "class",
      "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center"
    );
    assesFT.innerHTML = "<strong>Time finished</strong> Good luck!";
  } else {
    return false;
  }
  assesFT.style.display = "block";
  if (correctScore >= 70) {
    setTimeout(() => {
      audioApplause.play();
    }, 5000);
  } else {
    setTimeout(() => {
      audioThunder.play();
      allDone.firstElementChild.setAttribute(
        "class",
        "alert alert-danger mt-0 mb-0"
      );
      progressBar.firstElementChild.setAttribute(
        "class",
        "progress-bar bg-danger progress-bar-striped progress-bar-animated"
      );
      submit.setAttribute("class", "btn btn-danger");
    }, 5000);
  }
  setTimeout(function () {
    finalScore.textContent = correctScore;
    quiz.style.display = "none";
    allDone.style.display = "block";
    assesFT.style.display = "none";
    removeQuestionsButtons();
  }, 5000);
}

function addToHighscores() {
  var highScoreElement = document.createElement("li");
  var highscoreStr = initials.value + " - " + correctScore;
  localHighscoresArray.push(highscoreStr);
  var highscoreArrayStr = localHighscoresArray.toString();
  highScoreElement.textContent = highscoreStr;
  highScoresList.append(highScoreElement);
  localStorage.setItem("highscore", localHighscoresArray);
  justRegistered = true;
  initials.value = "";
  // Modal
  $("#staticBackdrop").modal("show");
}

function loadHighScores() {
  var tempHighscoresArray = [];
  var tempHighscoresObject = {};
  var tempHighscoresObjectsArray = [];
  var tempLocalSCoreArray = [];
  while (highScoresList.hasChildNodes()) {
    highScoresList.removeChild(highScoresList.childNodes[0]);
  }
  var lastPos;
  var lastChar = "";
  var localScore = 0;
  var localStrScore = "";
  var tempHighscore = "";
  for (i = 0; i < localHighscoresArray.length; i++) {
    for (j = localHighscoresArray[i].length - 1; j >= 0; j--) {
      lastPos = localHighscoresArray[i].length - 1;
      lastChar = localHighscoresArray[i][lastPos - j];
      if (lastChar && lastChar >= 0 && lastChar <= 9) {
        localScore += lastChar;
      }
      if (j > 1) {
        if (j === 2 && lastChar === "1") {
        }
        localStrScore += lastChar;
      }

      localScore = parseInt(localScore);
    }

    tempHighscore = localScore + localStrScore;
    tempHighscoresArray.push(tempHighscore);
    tempHighscoresObject.score = localScore;
    tempHighscoresObject.scoreStr = localStrScore;

    tempHighscoresObjectsArray.push(tempHighscoresObject);
    tempLocalSCoreArray.push(localScore);
    localScore = 0;
    localStrScore = "";
    tempHighscoresObject = {};
  }
  tempLocalSCoreArray.sort(function (a, b) {
    return b - a;
  });
  var sortedScoresCompleteArray = [];
  var flagged = [];
  tempLocalSCoreArray.forEach(function (element) {
    tempHighscoresObjectsArray.forEach(function (object, index) {
      if (element === object.score && !flagged.includes(index)) {
        flagged.push(index);

        var tempScoreString = object.scoreStr + " " + object.score;
        sortedScoresCompleteArray.push(tempScoreString);
      }
    });
  });
  for (i = 0; i < sortedScoresCompleteArray.length; i++) {
    var highScoreElement = document.createElement("li");
    highScoreElement.textContent = sortedScoresCompleteArray[i];
    for (j = sortedScoresCompleteArray[i].length - 1; j >= 0; j--) {
      lastPos = sortedScoresCompleteArray[i].length - 1;
      lastChar = sortedScoresCompleteArray[i][lastPos - j];
      if (lastChar && lastChar >= 0 && lastChar <= 9) {
        localScore += lastChar;
      }
      if (j > 1) {
        localStrScore += lastChar;
      }

      localScore = parseInt(localScore);
    }

    tempHighscore = localScore + localStrScore;

    if (localScore > 80 && localScore <= 100) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-success"
      );
    } else if (localScore > 70 && localScore <= 80) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-info"
      );
    } else if (localScore > 60 && localScore <= 70) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-primary"
      );
    } else if (localScore > 50 && localScore <= 60) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-warning"
      );
    } else if (localScore <= 50) {
      highScoreElement.setAttribute(
        "class",
        "list-group-item list-group-item-danger"
      );
    }

    highScoresList.append(highScoreElement);
    tempHighscoresArray.push(tempHighscore);
    tempHighscoresObject.score = localScore;
    tempHighscoresObject.scoreStr = localStrScore;
    tempHighscoresObjectsArray.push(tempHighscoresObject);
    tempLocalSCoreArray.push(localScore);
    localScore = 0;
    localStrScore = "";
    tempHighscoresObject = {};
  }
}

function clearHighscores() {
  localHighscoresArray = [];
  localStorage.setItem("highscore", localHighscoresArray);
  loadHighScores();
}
