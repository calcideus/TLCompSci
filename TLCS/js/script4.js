let progress = 0; // Start with 0% progress
const progressBar = document.querySelector('.progress-bar span'); // Progress bar fill
const questionText = document.getElementById('question-text');
const feedback = document.getElementById('feedback'); // Feedback area
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text'); // Explanation text area
const questionImage = document.getElementById('question-image'); // Image container

// Questions Array with the correct answers and images
const questions = [
  {
    text: "1. Does this graph contain an Eulerian Circuit? If so, select the correct path that represents an Eulerian Circuit.",
    image: "https://i.imgur.com/b69Y2i8.jpg",
    answers: [
      "Yes, it contains an Eulerian Circuit, and one possible path is 1→2→3→4→1→3→2.",
      "Yes, it contains an Eulerian Circuit, and one possible path is 1→2→3→2→4→1→3.",
      "No, it does not contain an Eulerian Circuit because not all nodes have an even degree.",
      "No, it does not contain an Eulerian Circuit because it is not connected."
    ],
    correct: "A", // Correct answer
    explanation: "The graph contains an Eulerian Circuit because all vertices in the main connected component have an even degree. Vertex 5 is isolated, but it does not affect the Eulerian Circuit in the component formed by vertices 1,2,3, and 4. Answer A provides a correct Eulerian Circuit for this component, so it is the correct answer.",
    increment: 25 // Progress increment when correct
  },
    {
    text: "2. A city park has five unique stations (nodes) connected by paths (edges) as follows:\n\nCan a visitor walk along each path exactly once and return to the starting station (forming an Eulerian Circuit)? If so, describe the conditions required and provide an example of a possible route.",
    image: "https://i.imgur.com/9sGGQDK.jpg", // Add an image URL here
    answers: [
      "Yes, the visitor can complete an Eulerian Circuit, starting and ending at any station.",
      "No, the visitor cannot complete an Eulerian Circuit because not all stations have an even degree.",
      "Yes, an Eulerian Circuit exists, but the visitor must start and end at station A.",
      "No, the visitor cannot complete an Eulerian Circuit because the graph is not connected."
    ],
    correct: "B",
    explanation: "The graph does not have an Eularian Circuit because not all vertices have an even degree; specifically, vertices B,C, and D each have an odd degree. For an Eularian Circuit to exist, all vertices must have an even degree and the graph must be connected. Therefore, Answer B is correct, as it identifies the lack of an Eularian Circuit due to the uneven degrees of certain vertices.",
    increment: 25 // All question = 100
  },
  {
    text: "3. River City is famous for its intricate system of bridges connecting various landmarks around the town. The city has four main landmarks (represented as nodes) connected by bridges (represented as edges) as follows:\n\nIs it possible for a tourist to start at any landmark, walk over each bridge exactly once, and return to the starting landmark (forming an Eulerian Circuit)? If an Eulerian Circuit exists, describe the conditions required and provide an example of a possible route. If not, explain why it’s impossible.",
    image: "https://i.imgur.com/M70Khew.jpg", // Add an image URL here
    answers: [
      "Yes, an Eulerian Circuit exists, and the tourist can start and end at any landmark.",
      "No, an Eulerian Circuit is impossible because not all landmarks have an even degree.",
      "Yes, an Eulerian Circuit exists, but the tourist must start and end at landmark A.",
      "No, an Eulerian Circuit is impossible because the graph is not connected."
    ],
    correct: "B",
    explanation: "The answer is **B** because for a graph to contain an Eulerian Circuit, all nodes (landmarks) must have an even degree (an even number of connecting edges). In the given graph, some nodes have an odd degree, which makes it impossible to form an Eulerian Circuit. Therefore, it’s not possible for the tourist to walk over each bridge exactly once and return to the starting landmark.",
    increment: 25 // All question = 100
  },
  {
    text: "4. Garden City has six beautiful gardens (represented as nodes) connected by walking paths (edges) as follows:\n\nCan a visitor start at one garden, walk along each path exactly once, and return to the starting garden, forming an Eulerian Circuit? If possible, describe the conditions required and provide an example route. If not, explain why it’s impossible.",
    image: "https://i.imgur.com/8SSf65X.jpg", // Add an image URL here
    answers: [
      "Yes, an Eulerian Circuit exists, and the visitor can start and end at any garden.",
      "No, an Eulerian Circuit is impossible because not all gardens have an even degree.",
      "Yes, an Eulerian Circuit exists, but the visitor must start and end at garden G1.",
      "No, an Eulerian Circuit is impossible because the graph is not connected."
    ],
    correct: "B",
    explanation: "The correct answer is B because an Eulerian Circuit requires all nodes to have an even degree and the graph to be connected. In this diagram, some gardens (nodes) have an odd degree, violating the first condition. Thus, an Eulerian Circuit is impossible.",
    increment: 25 // All question = 100
  }
];

const answerLabels = ["A", "B", "C", "D"];
let currentQuestionIndex = 0;

function displayQuestion(index) {
  const question = questions[index];
  questionText.innerText = question.text;
  questionImage.innerHTML = `<img src="${question.image}" alt="Question Image" class="question-img">`;
  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = question.answers.map((answer, i) => `
    <button class="answer-btn" onclick="checkAnswer('${answerLabels[i]}')">
      <span class="answer-label">${answerLabels[i]}:</span> ${answer}
    </button>
  `).join('');
  feedback.innerText = ''; // Clear feedback on new question
  explanationContainer.style.display = 'none'; // Hide explanation on new question
}

function updateProgress(increment) {
  progress += increment;
  if (progress > 100) progress = 100; // Ensure progress does not exceed 100%
  progressBar.style.transition = 'width 0.3s ease'; // Smooth transition for progress bar
  progressBar.style.width = progress + '%';
}

function checkAnswer(selected) {
  const question = questions[currentQuestionIndex];
  const correctAnswer = question.correct;
  const increment = question.increment;

  if (selected === correctAnswer) {
    feedback.innerText = "Correct! You’re so great! Congratulations!";
    feedback.style.fontFamily = "'Press Start 2P'"; 
    feedback.style.color = "green";
    updateProgress(increment);

    // Show the explanation only if the answer is correct
    explanationText.innerText = question.explanation;
    explanationContainer.style.display = "block"; // Ensure the explanation is visible

    // Make sure explanation button is visible again and functional
    const explanationButton = document.querySelector('#explanation-container button');
    if (explanationButton) {
      explanationButton.style.display = 'block'; // Ensure the button is visible
    }
  } else {
    feedback.innerText = "Oh no :(! That's not correct. Let’s try again?";
    feedback.style.fontFamily = "'Press Start 2P'"; 
    feedback.style.color = "red";
    explanationContainer.style.display = "none"; // Hide explanation if answer is wrong
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    explanationContainer.style.display = 'none'; // Hide explanation when moving to the next question
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    explanationContainer.style.display = 'none'; // Hide explanation when moving to the previous question
  }
}

// Toggle explanation visibility
function toggleExplanation() {
  const explanationText = document.getElementById('explanation-text');
  const explanationButton = document.querySelector('#explanation-container button');

  if (explanationText.style.display === 'none') {
    explanationText.style.display = 'block';
    explanationButton.innerText = 'Hide Explanation';
  } else {
    explanationText.style.display = 'none';
    explanationButton.innerText = 'Show Explanation';
  }
}

// Initial display of the first question
displayQuestion(currentQuestionIndex);



