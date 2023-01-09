// GIVEN I am taking a code quiz
// WHEN I click the start button
// Add event listener to the button

// THEN a timer starts
// Need to count down once every second
// and I am presented with a question
// Function that will show user the question

// WHEN I answer a question
// Need to add event listener to the click being used for the answer

// THEN I am presented with another question
// Function that will show the user the next question
// WHEN I answer a question incorrectly
// Function that gives a pop up saying Wrong!
// THEN time is subtracted from the clock
// An integer will be suctracted from the integer
// WHEN all questions are answered or the timer reaches 0
// Check to see if the integer is equal to zero
// THEN the game is over
// Once the clock has reached zero then the game is over
// WHEN the game is over
// When the lcok has reached zero or the user is out of questions
// THEN I can save my initials and score
// Use localStorage to save initals and score

var startButton = document.querySelector("#startbtn");

function test() {
  console.log("connected");
}

var viewHighScores = document.querySelector("#viewhisco");

let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

// sections
// section intro
const introEl = document.querySelector("#intro");

// section questions
//question section
const questionsEl = document.querySelector("#questions");
//where question goes
let questionEl = document.querySelector("#question");
// how many questions they have answered
let questionCount = 0;
// div yesno
const yesnoEl = document.querySelector("#yaynay");

// section final
const finalEl = document.querySelector("#final");
// user initials
let initialsInput = document.querySelector("#initials");

// section highscores
const highscoresEl = document.querySelector("#highscores");
// ordered list
let scoreListEl = document.querySelector("#score-list");
// array of scores
let scoreList = [];

// buttons
// start
const startBtn = document.querySelector("#start");
// answer button class
const ansBtn = document.querySelectorAll("button.ansBtn");
// answer1
const ans1Btn = document.querySelector("#answer1");
// answer2
const ans2Btn = document.querySelector("#answer2");
// answer3
const ans3Btn = document.querySelector("#answer3");
// answer4
const ans4Btn = document.querySelector("#answer4");
// submit-score
const submitScrBtn = document.querySelector("#submit-score");
// goback
const goBackBtn = document.querySelector("#goback");
// clearscores
const clearScrBtn = document.querySelector("#clearscores");
// view-scores
const viewScrBtn = document.querySelector("#view-scores");

const questions = [
  {
    // question 0
    question: "Commonly used data types do NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "2",
  },
  {
    // question 1
    question:
      "The condition in an if / else statement is enclosed within ____.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "1",
  },
  {
    // question 2
    question: "Arrays in Javascript can be used to store ____.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "3",
  },
  {
    // question 3
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: "2",
  },
  {
    // question 4
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "3",
  },
];

function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `Time:${secondsLeft}s`;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = secondsLeft;
    }
  }, 1000);
}

function startQuiz() {
  introEl.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;

  setTime();
  setQuestion(questionCount);
}

function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    ans1Btn.textContent = questions[id].answers[0];
    ans2Btn.textContent = questions[id].answers[1];
    ans3Btn.textContent = questions[id].answers[2];
    ans4Btn.textContent = questions[id].answers[3];
  }
}

function checkAnswer(event) {
  event.preventDefault();

  yaynayEl.style.display = "block";
  let p = document.createElement("p");
  yaynayEl.appendChild(p);

  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
  }
  if (questionCount < questions.length) {
    questionCount++;
  }
  setQuestion(questionCount);
}

function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  let init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (let i = 0; i < scoreList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }
  storeScores();
  displayScores();
}
function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}
function displayScores() {
  let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}
function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
}
startBtn.addEventListener("click", startQuiz);
ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
submitScrBtn.addEventListener("click", addScore);
goBackBtn.addEventListener("click", function () {
  highscoresEl.style.display = "none";
  introEl.style.display = "block";
  secondsLeft = 75;
  timeEl.textContent = `Time:${secondsLeft}s`;
});
clearScrBtn.addEventListener("click", clearScores);
viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
  } else if (highscoresEl.style.display === "block") {
    highscoresEl.style.display = "none";
  } else {
    return alert("No scores to show.");
  }
});
