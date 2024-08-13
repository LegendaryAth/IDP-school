const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    { question: 'Which bin should you use for plastic bottles?', answers: ['Recycle', 'Compost', 'Trash'], correct: 'Recycle' },
    { question: 'Where should you dispose of food scraps?', answers: ['Trash', 'Compost', 'Recycle'], correct: 'Compost' },
    { question: 'Which bin is for paper waste?', answers: ['Trash', 'Recycle', 'Compost'], correct: 'Recycle' },
    { question: 'Which bin should glass bottles go into?', answers: ['Recycle', 'Trash', 'Compost'], correct: 'Recycle' },
    { question: 'How should you dispose of hazardous materials?', answers: ['Trash', 'Special Collection', 'Compost'], correct: 'Special Collection' },
    { question: 'Where do you dispose of electronic waste?', answers: ['Recycle', 'Trash', 'E-Waste Collection'], correct: 'E-Waste Collection' },
    { question: 'Which bin should metal cans go into?', answers: ['Recycle', 'Compost', 'Trash'], correct: 'Recycle' },
    { question: 'Where should you throw away broken glass?', answers: ['Trash', 'Recycle', 'Compost'], correct: 'Trash' },
    { question: 'How should you dispose of used batteries?', answers: ['Trash', 'Recycle', 'Special Collection'], correct: 'Special Collection' },
    { question: 'Where do you dispose of plastic bags?', answers: ['Recycle', 'Trash', 'Special Collection'], correct: 'Trash' },
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
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 7);
    currentQuestionIndex = 0;
    score = 0;
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
}
