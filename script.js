questions = [
    {
        'question': 'What is the capital of France?',
        'option1': 'Paris',
        'option2': 'Rome',
        'option3': 'Madrid',
        'option4': 'Berlin',
        'correct': 'option1'
    },
    {
        'question': 'Who painted the Mona Lisa?',
        'option1': 'Pablo Picasso',
        'option2': 'Leonardo da Vinci',
        'option3': 'Vincent van Gogh',
        'option4': 'Michelangelo',
        'correct': 'option2'
    },
    {
        'question': 'What is the largest ocean in the world?',
        'option1': 'Atlantic Ocean',
        'option2': 'Indian Ocean',
        'option3': 'Arctic Ocean',
        'option4': 'Pacific Ocean',
        'correct': 'option4'
    },
    {
        'question': 'Which planet is known as the Red Planet?',
        'option1': 'Earth',
        'option2': 'Mars',
        'option3': 'Jupiter',
        'option4': 'Venus',
        'correct': 'option2'
    },
    {
        'question': 'What is the capital of Japan?',
        'option1': 'Kyoto',
        'option2': 'Osaka',
        'option3': 'Tokyo',
        'option4': 'Seoul',
        'correct': 'option3'
    },
    {
        'question': 'Who wrote "Romeo and Juliet"?',
        'option1': 'William Shakespeare',
        'option2': 'Charles Dickens',
        'option3': 'Jane Austen',
        'option4': 'Mark Twain',
        'correct': 'option1'
    },
    {
        'question': 'What is the tallest mountain in the world?',
        'option1': 'Mount Everest',
        'option2': 'K2',
        'option3': 'Kangchenjunga',
        'option4': 'Makalu',
        'correct': 'option1'
    },
    {
        'question': 'Who discovered penicillin?',
        'option1': 'Marie Curie',
        'option2': 'Alexander Fleming',
        'option3': 'Louis Pasteur',
        'option4': 'Albert Einstein',
        'correct': 'option2'
    },
    {
        'question': 'Which country is known as the Land of the Rising Sun?',
        'option1': 'China',
        'option2': 'India',
        'option3': 'Japan',
        'option4': 'South Korea',
        'correct': 'option3'
    },
    {
        'question': 'What is the chemical symbol for water?',
        'option1': 'H2O',
        'option2': 'CO2',
        'option3': 'O2',
        'option4': 'NaCl',
        'correct': 'option1'
    }
];


const submitButton = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const quizBody = document.querySelector('.quiz-body');
const quizCompletedDiv = document.getElementById('quiz-completed');
const question_number = document.getElementById('question-number');
const question_text = document.getElementById('question-text');
const startButton = document.getElementById('start');

let score = 0;
let index = 0;
let seconds = 60;
let timerInterval;

function updateTimer() {
    seconds--;
    if (seconds < 0) {
        clearInterval(timerInterval);
        submitAnswer();
    } else {
        timerDisplay.textContent = seconds.toString().padStart(2, '0');
    }
}

function startTimer() {
    seconds = 60;
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score; // Update the score display with the current score
}

function loadQuestion() {
    startTimer();
    const data = questions[index];
    question_number.textContent = 'Question ' + (index + 1);
    question_text.textContent = data.question;
    const optionsDiv = document.querySelector('.options');
    optionsDiv.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const optionText = data['option' + i];
        valuee = 'option' + i;
        optionsDiv.innerHTML += `
            <label>
                <input type="radio" name="option" value="${valuee}"> ${optionText}
            </label><br>
        `;
    }
}

function submitAnswer() {
    stopTimer();
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const selectedValue = selectedOption.value;
        const correctAnswer = questions[index].correct;
        if (selectedValue === correctAnswer) {
            score++;
            updateScoreDisplay(); // Update the score display after a correct answer is submitted
        }
    }
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        showQuizCompleted();
    }
}

function showQuizCompleted() {
    // Hide all quiz elements
    document.querySelector('.container').style.display = 'none'; // Hide the entire quiz container
    quizCompletedDiv.style.display = 'block'; // Show quiz completed message section
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-questions').textContent = questions.length;
    document.getElementById('final-time').textContent = timerDisplay.textContent; // Set the final time
}



startButton.addEventListener('click', function() {
    document.getElementById('start-quiz').style.display = 'none'; // Hide the start quiz section
    document.querySelector('.container').style.display = 'block'; // Show the quiz container
    loadQuestion(); // Load the first question
    startTimer(); // Start the timer
});

submitButton.addEventListener('click', submitAnswer);

// loadQuestion();
startButton();
