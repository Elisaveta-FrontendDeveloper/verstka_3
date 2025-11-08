// 'DOMContentLoaded' гарантирует, что html-файл полностью загружен до нахождения скриптом элементов на странице

document.addEventListener('DOMContentLoaded', function () {

    // массив вопросов
    const questions = [
        {
            id: 1,
            text: "Если человека назвали мордофиля, то это...",
            answers: [
                { text: "Значит, что он тщеславный.", correct: true, explanation: "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный." },
                { text: "Значит, что у него лицо как у хряка.", correct: false },
                { text: "Значит, что он чумазый.", correct: false }
            ]
        },
        {
            id: 2,
            text: "«Да этот Ярополк — фуфлыга!». Что не так с Ярополком?",
            answers: [
                { text: "Он маленький и невзрачный.", correct: true, explanation: "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А ещё так называют прыщи." },
                { text: "Он тот ещё алкоголик.", correct: false },
                { text: "Он не держит своё слово.", correct: false }
            ]
        },
        {
            id: 3,
            text: "Если человека прозвали пятигузом, значит, он...",
            answers: [
                { text: "Не держит слово.", correct: true, explanation: "Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадёжный, непостоянный человек." },
                { text: "Изменяет жене.", correct: false },
                { text: "Без гроша в кармане.", correct: false }
            ]
        },
        {
            id: 4,
            text: "Кто такой шлындра?",
            answers: [
                { text: "Обманщик.", correct: false },
                { text: "Нытик.", correct: false },
                { text: "Бродяга.", correct: true, explanation: "Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться." }
            ]
        }
    ];

    // ссылки на DOM-элементы
    const questionsContainer = document.getElementById('questions-container');
    const endMessage = document.getElementById('end-message');
    const statisticsElement = document.getElementById('statistics');
    const mainText = document.querySelector('.main-text');

    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    let questionsAnswered = 0;
    // массив перемешанных вопросов
    let shuffledQuestions = [];
    // массив правильных/неправильных ответов
    let completedQuestions = [];

    // функция для перемешивания массива
    function shuffleArray(array) {
        // создаём массив-копию
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // генерация случайного числа от 1 до i вкл.
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // функция для отображения текущего вопроса
    function displayCurrentQuestion() {
        // очищаем контейнер вопросов
        questionsContainer.innerHTML = '';

        if (currentQuestionIndex < shuffledQuestions.length) {

            // блок вопроса с номером
            const question = shuffledQuestions[currentQuestionIndex];
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';
            questionBlock.dataset.questionId = question.id;

            const questionNumber = document.createElement('div');
            questionNumber.className = 'question-number';
            questionNumber.textContent = `Вопрос ${currentQuestionIndex + 1}`;

            // текст вопроса
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = question.text;

            // контейнер ответов
            const answersContainer = document.createElement('div');
            answersContainer.className = 'answers-container';

            // Перемешиваем ответы
            const shuffledAnswers = shuffleArray(question.answers);

            // создаём блоки ответов
            shuffledAnswers.forEach((answer, index) => {
                const answerBlock = document.createElement('div');
                answerBlock.className = 'answer-block';
                answerBlock.textContent = answer.text;
                answerBlock.dataset.answerIndex = index;
                answerBlock.dataset.isCorrect = answer.correct;

                // добавляем обработчик клика на ответ
                answerBlock.addEventListener('click', () => handleAnswerClick(answerBlock, answer));

                answersContainer.appendChild(answerBlock);
            });

            questionBlock.appendChild(questionNumber);
            questionBlock.appendChild(questionText);
            questionBlock.appendChild(answersContainer);
            questionsContainer.appendChild(questionBlock);
        } else {
            // все вопросы закончились
            endMessage.classList.remove('hidden');
            showStatistics();
        }
    }

    // Обработчик клика на ответ
    function handleAnswerClick(answerBlock, answer) {

        const questionBlock = answerBlock.closest('.question-block');
        const questionNumber = questionBlock.querySelector('.question-number');
        const allAnswerBlocks = questionBlock.querySelectorAll('.answer-block');

        // Помечаем выбранный ответ
        answerBlock.classList.add('selected');

        // Отключаем все ответы, чтобы нельзя было выбрать другой ответ
        allAnswerBlocks.forEach(block => {
            block.style.pointerEvents = 'none';
        });

        // Проверяем правильность ответа
        const isCorrect = answer.correct;

        // Сохраняем информацию о правильности ответа для статистики
        completedQuestions[currentQuestionIndex] = isCorrect;

        if (isCorrect) {
            correctAnswersCount++;
            answerBlock.classList.add('correct');

            // Показываем пояснение, если оно есть
            if (answer.explanation) {
                const explanation = document.createElement('div');
                explanation.className = 'explanation';
                explanation.textContent = answer.explanation;
                answerBlock.appendChild(explanation);
                explanation.classList.add('show');
            }

            // Увеличиваем правильный ответ
            answerBlock.style.transform = 'scale(1.02)';

        } else {
            answerBlock.classList.add('incorrect');
            answerBlock.style.transform = 'scale(1.02)';

        }

        // Увеличиваем счетчик отвеченных вопросов
        questionsAnswered++;



        // Через 2 секунды перемещаем блоки вниз и показываем маркер
        setTimeout(() => {

            // Перемещаем все блоки ответов вниз
            allAnswerBlocks.forEach(block => {
                block.classList.add('moving-down');
            });

            // Добавляем маркер правильности ответа рядом с номером вопроса
            const marker = document.createElement('span');
            marker.className = `marker ${isCorrect ? 'correct-marker' : 'incorrect-marker'}`;
            marker.textContent = isCorrect ? ' ✓' : ' ✗';
            marker.classList.add('show');
            questionNumber.appendChild(marker);


            // Через 1 секунду переходим к следующему вопросу
            setTimeout(() => {
                currentQuestionIndex++;
                displayCurrentQuestion();
            }, 1000);
        }, 2000);
    }

    // Функция для показа статистики
    function showStatistics() {

        // скрываем описание теста
        if (mainText) mainText.style.display = 'none';


        statisticsElement.classList.remove('hidden');
        statisticsElement.innerHTML = `
        <h2>Результаты теста</h2>
        <p>Вы ответили правильно на ${correctAnswersCount} из ${shuffledQuestions.length} вопросов</p>
        <p>Процент выполнения теста: ${correctAnswersCount/shuffledQuestions.length*100}%.</p>
    `;

        // Показываем все вопросы с возможностью просмотра правильных ответов
        shuffledQuestions.forEach((question, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block completed';
            questionBlock.dataset.questionId = question.id;

            const questionNumber = document.createElement('div');
            questionNumber.className = 'question-number';

            // Добавляем маркер правильности ответа
            const userAnswerWasCorrect = completedQuestions[index];
            const marker = document.createElement('span');
            marker.className = `marker ${userAnswerWasCorrect ? 'correct-marker' : 'incorrect-marker'}`;
            marker.textContent = userAnswerWasCorrect ? ' ✓' : ' ✗';
            marker.classList.add('show');

            questionNumber.textContent = `Вопрос ${index + 1}`;
            questionNumber.appendChild(marker);

            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = question.text;

            questionBlock.appendChild(questionNumber);
            questionBlock.appendChild(questionText);

            // Добавляем обработчик клика для показа правильного ответа
            questionBlock.addEventListener('click', () => showCorrectAnswer(questionBlock, question));

            statisticsElement.appendChild(questionBlock);
        });
    }

    // Функция для показа правильного ответа при клике на завершенный вопрос
    function showCorrectAnswer(questionBlock, question) {
        const existingAnswer = questionBlock.querySelector('.correct-answer');
        
        // если ответ уже показан, убираем его
        if (existingAnswer) {
            existingAnswer.remove();
            return;
        }

        // убираем ответы у других вопросов
        document.querySelectorAll('.correct-answer').forEach(el => {
            if (el.closest('.question-block') !== questionBlock) {
                el.remove();
            }
        });

        // определяем и выводим правильный ответ
        const correctAnswer = question.answers.find(answer => answer.correct);
        const answerBlock = document.createElement('div');
        answerBlock.className = 'answer-block correct-answer';
        answerBlock.textContent = correctAnswer.text;


        questionBlock.appendChild(answerBlock);
    }


    // Инициализация теста
    function initTest() {
        // Перемешиваем вопросы
        shuffledQuestions = shuffleArray(questions);

        // Инициализируем массив для отслеживания правильных ответов
        completedQuestions = new Array(shuffledQuestions.length);

        // Отображаем первый вопрос
        displayCurrentQuestion();
    }

    // Запускаем тест
    initTest();
});