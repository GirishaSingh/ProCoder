// script.js

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const filterButtons = document.querySelectorAll('.filter-button');
    const questionList = document.getElementById('question-list');

    // Fetch questions from API
    console.log('Fetching questions from the server...');
    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            displayQuestions(data);
            setupSearch(data);
            setupFilters(data);
        })
        .catch(error => console.error('Error fetching questions:', error));

    function displayQuestions(questions) {
        questionList.innerHTML = '';
        questions.forEach(question => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${question.title}</td>
                <td>${question.difficulty}</td>
                <td>${question.pattern}</td>
                <td><a href="${question.url}" target="_blank">Solve</a></td>
            `;
            questionList.appendChild(row);
        });
    }

    function setupSearch(questions) {
        searchBar.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const filteredQuestions = questions.filter(question => 
                question.title.toLowerCase().includes(query)
            );
            displayQuestions(filteredQuestions);
        });
    }

    function setupFilters(questions) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const difficulty = this.getAttribute('data-difficulty');
                const filteredQuestions = difficulty === 'All' 
                    ? questions 
                    : questions.filter(question => question.difficulty === difficulty);
                displayQuestions(filteredQuestions);
            });
        });
    }
});
