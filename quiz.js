const quizTitle = document.getElementById("quiz-title");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

let current = 0;
let score = 0;
let currentQuiz = [];

const quizzes = {
  "Romeo and Juliet": [
    {
      question: "Where is Romeo and Juliet set?",
      options: ["London", "Verona", "Paris", "Dublin"],
      answer: "Verona"
    },
    {
      question: "Who is Juliet’s cousin?",
      options: ["Romeo", "Tybalt", "Benvolio", "Mercutio"],
      answer: "Tybalt"
    }
  ],
  "Sense and Sensibility": [
    {
      question: "Who wrote Sense and Sensibility?",
      options: ["Jane Austen", "Emily Brontë", "Charles Dickens", "Louisa May Alcott"],
      answer: "Jane Austen"
    },
    {
      question: "What theme is explored in the novel?",
      options: ["Industrial Revolution", "Emotional restraint vs passion", "Gothic horror", "Detective mystery"],
      answer: "Emotional restraint vs passion"
    }
  ]
};

const bookTitle = localStorage.getItem("activityBook");
if (!bookTitle || !quizzes[bookTitle]) {
  quizContainer.innerHTML = "<p>Sorry, no quiz available for this book.</p>";
} else {
  quizTitle.textContent = `${bookTitle} Quiz`;
  currentQuiz = quizzes[bookTitle];
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) score++;
      nextBtn.classList.remove("hidden");
      [...optionsEl.children].forEach(b => b.disabled = true);
      btn.style.backgroundColor = option === q.answer ? "green" : "red";
    };
    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < currentQuiz.length) {
    showQuestion();
    nextBtn.classList.add("hidden");
  } else {
    questionEl.textContent = "Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.classList.add("hidden");
    scoreEl.classList.remove("hidden");
    scoreEl.textContent = `Your score: ${score} / ${currentQuiz.length}`;
  }
});
