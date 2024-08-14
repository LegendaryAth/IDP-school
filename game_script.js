const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const wrongAnswersElement = document.createElement('div'); // New element to display wrong answers

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let wrongAnswers = []; // Array to store wrong answers

const questions = [
    { question: 'Which of these is the best way to conserve water at home?', answers: ['Taking shorter showers', 'Leaving the tap running', 'Watering the lawn daily'], correct: 'Taking shorter showers' },
    { question: 'What type of energy is considered renewable?', answers: ['Solar', 'Coal', 'Natural Gas'], correct: 'Solar' },
    { question: 'Which of these materials is biodegradable?', answers: ['Plastic', 'Glass', 'Paper'], correct: 'Paper' },
    { question: 'What is the primary cause of global warming?', answers: ['Deforestation', 'Littering', 'Carbon emissions'], correct: 'Carbon emissions' },
    { question: 'Which method of transportation has the least environmental impact?', answers: ['Driving a car', 'Riding a bike', 'Flying on a plane'], correct: 'Riding a bike' }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    resultContainer.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = []; // Reset wrong answers array
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (answer === question.correct) {
            button.dataset.correct = answer;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    } else {
        // Store the question, correct answer, and the user's selected answer
        wrongAnswers.push({
            question: shuffledQuestions[currentQuestionIndex].question,
            correctAnswer: shuffledQuestions[currentQuestionIndex].correct,
            selectedAnswer: selectedButton.innerText
        });
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        endQuiz();
    }
}

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

function endQuiz() {
    questionContainerElement.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `${score} out of ${shuffledQuestions.length}`;

    // Display wrong answers
    wrongAnswersElement.innerHTML = '<h3>Incorrect Questions:</h3>';
    if (wrongAnswers.length > 0) {
        wrongAnswers.forEach((item, index) => {
            const wrongAnswerDiv = document.createElement('div');
            wrongAnswerDiv.innerHTML = `<p><strong>Q${index + 1}:</strong> ${item.question}</p>
                                        <p><strong>Your answer:</strong> ${item.selectedAnswer}</p>
                                        <p><strong>Correct answer:</strong> ${item.correctAnswer}</p>`;
            wrongAnswersElement.appendChild(wrongAnswerDiv);
        });
    } else {
        wrongAnswersElement.innerHTML += '<p>Great job! You got everything correct!</p>';
    }
    resultContainer.appendChild(wrongAnswersElement);
}
