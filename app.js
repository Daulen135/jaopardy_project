const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const jeopardyCategories = [
  {
    genre: 'WHO',
    questions: [
      {
        question: 'Which pholosopher encouraged open-mindneess?',
        answers: ['Emerson', 'Socrates'],
        correct: 'Socrates',
        level: 'easy',
      },
      {
        question: 'What is a premise?',
        answers: ['Statement of fact', 'Bias'],
        correct: 'Statement of fact',
        level: 'medium',
      },
      {
        question: 'What is the fist step of adaptation?',
        answers: ['Awareness', 'Control of fear'],
        correct: 'Awareness',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHERE',
    questions: [
      {
        question: 'Critical thinking is sparked by:?',
        answers: ['Debate', 'Curiocity'],
        correct: 'Curiocity',
        level: 'easy',
      },
      {
        question: 'What are convergences?',
        answers: ['Variances', 'Similarities'],
        correct: 'Similarities',
        level: 'medium',
      },
      {
        question: 'Ability to access and control emations is :',
        answers: ['Coaching', 'Emotional Inteligence'],
        correct: 'Emotional Inteligence',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHEN',
    questions: [
      {
        question: 'What does W present in SWOT?',
        answers: ['Weak', 'Wide'],
        correct: 'Weak',
        level: 'easy',
      },
      {
        question: 'What do critical thinking and problem solving have in common?',
        answers: ['logic', 'complexity'],
        correct: 'logic',
        level: 'medium',
      },
      {
        question: 'How can we change viewpoint?',
        answers: ['Remove constrains', 'Anylize info'],
        correct: 'Remove constrains',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHAT',
    questions: [
      {
        question: 'What is the obsticle to change?',
        answers: ['Fear', 'Courage'],
        correct: 'Fear',
        level: 'easy',
      },
      {
        question: 'What is a facilitator of change?',
        answers: ['Status quo', 'Readiness'],
        correct: 'Readiness',
        level: 'medium',
      },
      {
        question: 'What is confirmation bias based on?',
        answers: ['Premises', 'Information'],
        correct: 'Premises',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'HOW MANY',
    questions: [
      {
        question: 'New information needs to be:?',
        answers: ['Critiqued', 'Organized'],
        correct: 'Organized',
        level: 'easy',
      },
      {
        question: 'Variances in attitudes and beliefs is:?',
        answers: ['Mental patterns', 'Cognitive dissonance'],
        correct: 'Cognitive dissonance',
        level: 'medium',
      },
      {
        question: 'What is the most effective way to retain skills?',
        answers: ['practice', 'learn new skills'],
        correct: 'practice',
        level: 'hard',
      },
    ],
  },
]

function addCategory(category) {
  const column = document.createElement('div')
  column.classList.add('genre-column')

  const genreTitle = document.createElement('div')
  genreTitle.classList.add('genre-title')
  genreTitle.innerHTML = category.genre

  column.append(genreTitle)
  game.append(column)

  category.questions.forEach((question) => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    if (question.level == 'easy') {
      card.innerHTML = 100
    }
    if (question.level == 'medium') {
      card.innerHTML = 200
    }
    if (question.level == 'hard') {
      card.innerHTML = 300
    }

    card.setAttribute('data-question', question.question)
    card.setAttribute('data-answer-1', question.answers[0])
    card.setAttribute('data-answer-2', question.answers[1])
    card.setAttribute('data-correct', question.correct)
    card.setAttribute('data-value', card.getInnerHTML())
    card.addEventListener('click', flipCard)
  })
}

jeopardyCategories.forEach((category) => addCategory(category))

function flipCard() {
  this.innerHTML = ''
  this.style.fontSize = '15px'
  this.style.lineHeight = '30px'
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  const firstButton = document.createElement('button')
  const secondButton = document.createElement('button')
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
  firstButton.innerHTML = this.getAttribute('data-answer-1')
  secondButton.innerHTML = this.getAttribute('data-answer-2')
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)
  this.append(textDisplay, firstButton, secondButton)
  textDisplay.innerHTML = this.getAttribute('data-question')

  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.removeEventListener('click', flipCard))
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.addEventListener('click', flipCard))

  const cardOfButton = this.parentElement

  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML = score
    cardOfButton.classList.add('correct-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
    }, 100)
  } else {
    cardOfButton.classList.add('wrong-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = 0
    }, 100)
  }
  cardOfButton.removeEventListener('click', flipCard)
}