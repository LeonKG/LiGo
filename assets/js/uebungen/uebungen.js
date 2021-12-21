/* Code für Multiple Choice-Übung */

var myQuestions =[ {
    question: 'Handelt es sich bei dieser Passage um eine interne Fokalisierung? Machen Sie sich auch klar, auf welche Indizien im Text Sie Ihre Position stützen:',
    example: 'Nathanael fand eine Einladungskarte und ging mit hochklopfendem Herzen zur bestimmten Stunde, als schon die Wagen rollten und die Lichter in den geschmückten Sälen schimmerten, zum Professor.<br/><br/>E. T. A. Hoffmann: Der Sandmann',
    answers: {
        a: 'Ja. Hier liegt eine interne Fokalisierung vor.',
        b: 'Nein. Hier liegt keine interne Fokalisierung vor.',
        c: 'Im Text wechselt die Fokalisierung; interne Fokalisierung liegt zum Teil vor.'
    },
    correctAnswer: 'a',
    explanation: 'Es liegt interne Fokalisierung vor. Zwei Indizien sprechen dafür: a) „mit hochklopfendem Herzen“ ist eine Innensicht; b) „fand eine Einladungskarte“ beschreibt einen Umstand (dass eine Einladungskarte für Nathanael in seiner Post liegt) aus der Sichtweise von Nathanael.'
}];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    
    function showQuestions(questions, quizContainer) {
        // we'll need a place to store the output and the answer choices
        var output =[];
        var answers;       
        // for each question...
        for (var i = 0; i < questions.length; i++) {
            // first reset the list of answers
            answers =[];
            // for each available answer to this question...
            for (letter in questions[i].answers) {
                // ...add an html radio button
                answers.push(
                '<label>' + '<input type="radio" name="question' + i + '" value="' + letter + '">' + '  ' + questions[i].answers[letter] + '</label>');
            }
            // add this question and its answers to the output
            output.push(
            '<div class="task">' + questions[i].question + '</div>' + '<div class="example">' + questions[i].example + '</div>' + '<div class="answers">' + answers.join('') + '</div>');
        } 
        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }
    
    function showResults(questions, quizContainer, resultsContainer) {
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        // keep track of user's answers
        var userAnswer = '';
        // for each question...
        for (var i = 0; i < questions.length; i++) {
            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked')||{}).value;
            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // color the answers green
                answerContainers[i].style.color = 'green';
                resultsContainer.innerHTML = 'Diese Antwort ist richtig! <br/>' + questions[i].explanation;
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
                resultsContainer.innerHTML = 'Diese Antwort ist falsch! <br/>' + questions[i].explanation;
            }
        }
    }
    
    // show the questions
    showQuestions(questions, quizContainer);
    
    // when user clicks submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

/* Code für Drag & Drop-Übung */

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}

/* Code für Texteingabe-Übung */

function showSolution() {
    var solution = document.getElementById("solution");
    solution.style.display = "block";
}

/* Code für Markieren-Übung */

function highlight() {
    document.getElementById("to_be_highlighted").className = "highlight";
}