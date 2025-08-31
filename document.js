document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const resultsContainer = document.getElementById('results-container');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-btn');

    let currentQuestionIndex, score;

    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Venus", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        }
    ];

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        questionContainer.classList.remove('hide');
        resultsContainer.classList.add('hide');
        nextButton.classList.add('hide');
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionText.innerText = question.question;
        answerButtons.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function selectAnswer(e) {
    2         const selectedButton = e.target;
    3         const correct = selectedButton.dataset.correct === "true";
    4         if (correct) {
    5             score++;
    6         }
    7         Array.from(answerButtons.children).forEach(button => {
    8             setStatusClass(button, button.dataset.correct === "true");
    9             button.disabled = true; // Disable buttons after an answer is chosen
   10         });
   11 
   12         // Check if it's the last question
   13         if (currentQuestionIndex === questions.length - 1) {
   14             nextButton.innerText = "Show Results"; // Change button text
   15             nextButton.removeEventListener('click', showNextQuestion); // Remove old listener
   16             nextButton.addEventListener('click', showResults); // Add new listener for results
   17         } else {
   18             nextButton.innerText = "Next"; // Ensure text is "Next" for other questions
   19             nextButton.removeEventListener('click', showResults); // Remove results listener if present
   20             nextButton.addEventListener('click', showNextQuestion); // Ensure next question listener
   21         }
   22         nextButton.classList.remove('hide');
   23     }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetState();
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResults();
        }
    }

    function resetState() {
        nextButton.classList.add('hide');
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = false;
            clearStatusClass(button);
        });
    }

    function showResults() {
        questionContainer.classList.add('hide');
        resultsContainer.classList.remove('hide');
        scoreElement.innerText = score;
        totalQuestionsElement.innerText = questions.length;
    }

    nextButton.addEventListener('click', showNextQuestion);
    restartButton.addEventListener('click', startQuiz);

    startQuiz();
});