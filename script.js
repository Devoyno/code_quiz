  var startBtn = document.getElementById("start");
  var saveBtn = document.getElementById("saveBtn");
  var timerEl = document.getElementById("timer");
  var startCard = document.getElementById("start-card");
  var quizCard = document.getElementById("quiz-card");
  var questionTitle = document.getElementById("question-title");
  var result = document.getElementById("result");
  var cardComplete = document.getElementById('card-complete');
  
  var Q = 0;
  var timer = 75;
  var timerRunning = false;
  var timerInterval;
  
  startBtn.addEventListener("click", function () {
    startCard.setAttribute("class", "hide");
    quizCard.classList.remove("hide");
    buildCard();
    startTimer();
  });
  
  saveBtn.addEventListener("click", function () {
    saveScore();
  });
  
  var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answers: "alerts",
    },
    {
      question:
        "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answers: "parentheses",
    },
    {
      question: "Which of these is not used to loop?",
      choices: ["for", "while", "foreach", "sequence"],
      answers: "sequence",
    },
    {
      question: "Which of these is not a way to save a variable",
      choices: ["vet", "var", "let", "const"],
      answers: "vet",
    },
    {
      question:
        "JS date function starts in seconds to current day from what day in 1970",
      choices: ["January 1", "December 31", "June 1", "April 23"],
      answer: "January 1",
    },
  ];
  
  //functions
  function startTimer() {
    if (!timerRunning) {
      timerRunning = true;
      timerInterval = setInterval(function () {
        timer--;
        if(timer <= 0) {
          timer = 0;
          endGame()
        }
        displayTimer();
      }, 1000);
    }
  }
  
  function stopTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
  }
  
  function displayTimer() {
    timerEl.textContent = timer;
  }
  
  //build a quiz card
  
  
  function buildCard() {
 
      var choicesEL = document.querySelector("#choices");
      choicesEL.innerHTML = "";
      result.textContent = '';
      questionTitle.textContent = questions[Q].question;
  
      //load answers and capture value
      questions[Q].choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.setAttribute("value", choice);
        button.onclick = checkAnswer;
  
        choicesEL.appendChild(button);
      });
  } 
  // else {
  //   stopTimer();
  //   quizCard.setAttribute("class", "hide");
  //   cardComplete.classList.remove("hide");
  //   questionTitle.textContent = 'All Done!';
  //   document.getElementById("final-score").value = timer;
  // }
  
  
  //compare click to answer
  function checkAnswer() {
    if(timer === 0) {
      endGame();
    }
    console.log(this.value);
    //if statement to check right or wrong
    if (questions[Q].answer == this.value) {
      result.textContent = 'Correct!';
    } else { 
      result.textContent = 'Wrong';
      timer -= 10;
    }
    Q++;
    if(Q === questions.length) {
      endGame()
      //endgame
      console.log("end game")
    } else {
      buildCard();
    }
   
  
  }

  function endGame() {
    clearInterval(timerInterval)
    timerEl.textContent = "";
    quizCard.classList.add("hide")
    cardComplete.classList.remove("hide");
  }
  
  function saveScore() {
    var nameEl = document.getElementById("name");
    // var scores = [];
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    
    var highScoreObj = {
      name: nameEl.value,
      score: timer
    }
  
    scores.push(highScoreObj);
  
    localStorage.setItem('scores', JSON.stringify(scores))
  
    loadHighScores(scores);
  }

function loadHighScores(scores) {
  console.log(scores);
  scores.sort(function(a , b){
    return b.score - a.score;
  })

  scores.forEach(function(score) {
    var li = document.createElement("li");
    var list = document.getElementById("top-score");

    li.textContent = score.name + " " + score.score;
    list.appendChild(li);
  })
}

// if correct: save answer or score and move
//on

// if wrong: penalize timer, move to next q, show wrong on screen

// on last question answered, end quiz, tally score

// save high scores

// sort high scores by value
