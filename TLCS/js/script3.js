let progress = 0; // Start with 0% progress
const progressBar = document.querySelector('.progress-bar span'); // Progress bar fill
const questionText = document.getElementById('question-text');
const questionContainer = document.getElementById('question-container');
const feedback = document.getElementById('feedback'); // Feedback area

// Questions Array with the correct answers
const questions = [
  { text: "What is 5 + 3?", answers: [8, 10, 6], correct: 8 },
  { text: "What is 7 - 2?", answers: [5, 6, 4], correct: 5 }
];

let currentQuestionIndex = 0;

function displayQuestion(index) {
  const question = questions[index];
  questionText.innerText = question.text;
  questionContainer.innerHTML = `
    <p class="question-text">${question.text}</p>
    ${question.answers.map(answer => `<button class="answer-btn" onclick="checkAnswer(${answer})">${answer}</button>`).join('')}
  `;
  feedback.innerText = ''; // Clear feedback on new question
}

function updateProgress() {
  if (progress < 100) {
    progress += 50; // Increase progress by 50% per question
    progressBar.style.width = progress + '%'; // Update the progress bar width
  }
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    feedback.innerText = "Correct Answer! Progress updated.";
    feedback.style.color = "green";
    updateProgress();
  } else {
    feedback.innerText = "Oops, that's not correct! Try again.";
    feedback.style.color = "red";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    feedback.innerText = "Congratulations! You completed all questions.";
  }
}

// Initialize with the first question
displayQuestion(currentQuestionIndex);



