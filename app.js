//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Co oznacza mały płomien ogniska?",
    options: ["Siłe ciała", "Siłe ducha", "Siłe w nas", "Siłe sprytu"],
    correct: "Siłe ciała",
  },
  {
    id: "1",
    question: "Symbolem wyrózniajacym wędrowników od innych grup metodycznych jest?",
    options: ["Krzyż", "Złota lilijka", "Naramienik wędrowniczy", "Naramiennik starszoharcerski"],
    correct: "Naramienik wędrowniczy",
  },
  {
    id: "2",
    question: "W jakiem wieku trzeba być aby zostać wędrownikiem?",
    options: ["17-21", "16-22", "15-21", "16-21"],
    correct: "16-21",
  },
  {
    id: "3",
    question: "Co oznacza średni płomien ogniska?",
    options: ["siłe rozumu", "siłe ducha", "siłe ciała", "siłe do działania"],
    correct: "siłe rozumu",
  },
  {
    id: "4",
    question: "Co to jest warta wędrownicza?",
    options: ["symbol wędrowników, znajdujący się na naramienniku wędrowniczym, będącym odznaką zdobywaną przez wędrowniczki i wędrowników", "symbol wędrowników, znajdujący się na prawym rękawie, będącym odznaką zdobywaną przez wędrowniczki i wędrowników", " żadana odpowiedz nie jest poprawna ", "symbol wędrowników, znajdujący się na lewej kieszeni, będącym odznaką zdobywaną przez wędrowniczki i wędrowników"],
    correct: "symbol wędrowników, znajdujący się na naramienniku wędrowniczym, będącym odznaką zdobywaną przez wędrowniczki i wędrowników",
  },
  {
    id: "5",
    question: "Na którym ramieniu nosimy naramiennik wędrowniczy?",
    options: ["lewym", "prawym", "nie nosimy go na ramieniu", "nie istaniej coś takiego jak naramiennik wędrowniczy"],
    correct: "lewym",
  },
  {
    id: "6",
    question: "Który z opisów jest nie prawdziwe?",
    options: ["Wędrownik -  jest zawsze gotów nieść pomoc.", "Wędrownik -  jest przyjacielem całego świata. Wędrownika ciągnie siła nieprzeparta w dal na coraz to nowe, nieznane szlaki,  pozwala zastygnąć mu w wygodnym, osiadłym życiu, toczącym się zbyt wolno.", "Wędrownik - spostrzega urok życia wszędzie, gdziekolwiek się znajdzie, gdyż odkrywa to, czego inni w pozornej monotonii codziennych dni dopatrzyć się nie umieją. Wędrownik nie zna radość trudnych zwycięstw, urok przyrody, piękno zdobywania samotnie niewydeptanych ścieżek.","Wędrownik - stale uprawia wędrówki, wędruje w zimie, w lecie, na wsi, w mieście, tropi miejsca, gdzie może być pożyteczny. Drogę jego wędrówki nigdy nie jst wyznaczana wartościami zawartymi w Prawie i Przyrzeczeniu Harcerskim."],
    correct: "Wędrownik - stale uprawia wędrówki, wędruje w zimie, w lecie, na wsi, w mieście, tropi miejsca, gdzie może być pożyteczny. Drogę jego wędrówki nigdy nie jst wyznaczana wartościami zawartymi w Prawie i Przyrzeczeniu Harcerskim.",
  },
  {
    id: "7",
    question: "Jak brzmi dewiza wędrownicza?",
    options: ["Wyjdź w świat, zobacz, pomyśl - działaj", "Wyjdź w świat, zobacz, pomyśl – pomóż, czyli działaj.", "zobacz, pomyśl – pomóż, czyli działaj.", "Wyjdź w świat, pomyśl – pomóż"],
    correct: "Wyjdź w świat, zobacz, pomyśl – pomóż, czyli działaj.",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Twój wynik to " + scoreCount + " z " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
       
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};