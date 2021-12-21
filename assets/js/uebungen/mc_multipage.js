// Functions
function buildQuiz(){
    // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML checkbox
        answers.push(
          `<label>
            <input type="checkbox" name="question${questionNumber}" value="${letter}">
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    let numCorrect = 0;
    
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
    
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} von ${myQuestions.length} Fragen wurden richtig beantwortet.`;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.visibility = 'hidden';
    }
    else{
      previousButton.style.visibility = 'visible';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}
    
function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('result');
const submitButton = document.getElementById('summit');
const myQuestions = [{
    question: "Bei welchen epischen Kleinformen ist die belehrende Ausrichtung gattungskonstitutiv?",
    answers: {
      a: "Fabel",
      b: "Kalendergeschichte",
      c: "Kurzgeschichte",
      d: "Anekdote"
    },
    correctAnswer: "c"
  },
  {
    question: "Die geschlossene Form des Dramas...",
    answers: {
      a: "wird auch als &ldquo;tektonisches Drama&rdquo; bezeichnet",
      b: "zeigt Respekt gegenüber den drei &ldquo;aristotelischen Einheiten&rdquo;",
      c: "präsentiert &ldquo;den Ausschnitt als Ganzes&rdquo;",
      d: "ist auch an der Verschieb- oder Weglassbarkeit einzelner Szenen zu erkennen"
    },
    correctAnswer: "c"
  },
  {
    question: "Typische Komponenten der Gattung Lyrik sind:",
    answers: {
      a: "Musikalität und Bildhaftigkeit",
      b: "Kürze und Formverfremdung",
      c: "Monologe und Dialoge",
      d: "Erzähler und Figuren"
    },
    correctAnswer: "a"
  }
];

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);