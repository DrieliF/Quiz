const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')

//-----VARIABLES
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Qual é o menor país do mundo?',
    choice1: 'Malta',
    choice2: 'Tuvalu',
    choice3: 'Vaticano',
    choice4: 'Liechtenstein',
    answer: 3
  },
  {
    question: 'Qual é o rio mais longo do mundo ?',
    choice1: 'Rio Nilo',
    choice2: 'Rio Lena',
    choice3: 'Rio Amazonas',
    choice4: 'Rio Níger ',
    answer: 1
  },
  {
    question: 'Qual é a capital do Turcomenistão ?',
    choice1: 'Awaza',
    choice2: 'Ulan Bator',
    choice3: 'Astana',
    choice4: 'Asgabate',
    answer: 4
  }
]

//CONSTANTS
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 3

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions] //array
  //console.log(availableQuestions);
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign('/end.html')
  }

  questionCounter++ // incremento
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`
  const questionIndex = Math.floor(Math.random() * availableQuestions.length) // math.floor --> arredonda / random
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    // const classToApply = 'incorrect';
    // if (selectedAnswer == currentQuestion.answer) {
    //    classToApply = 'correct';
    // }    // uma outra alternativa de solução para o problema

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()
