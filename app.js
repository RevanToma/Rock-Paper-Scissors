const optionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const hideOptions = document.querySelector('.hideOptions');
let points = document.querySelector('#points')

// Object to hold all options, so maybe i can just lopp thru and create logic  
// around it instead of nested if/else statements.
const options = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper'
  }
]

// loop thru buttons and get data-name === selection
optionButtons.forEach(optionButton => {
  optionButton.addEventListener('click', e => {
    // optionName is selecitonName
    const optionName = optionButton.dataset.selection
    //lopp and find same selection
    const selection = options.find(selection => selection.name === optionName)

    // make a selection function?
    // added randomSelection function to the makeSelection function so every click generate a random selection for the AI.
    makeSelection(selection)
  })
})


function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;

  if (yourScoreSpan.innerText === '7' || computerScoreSpan.innerText === '7') {
    scoreSpan.innerHTML = 'Your a winner!';
    hideOptions.style.display = 'none';

    let btn = document.createElement('button');
    btn.classList.add('playAgain');
    btn.innerHTML = 'Play again!';

    points.appendChild(btn);
    btn.addEventListener('click', () => {
      location.reload();
    })

  }
}
// function to check result and create / show emojis based on selection.
function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)

}



// Function to pick a random options[array], make a random selection everytime users makes a selection
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

// make a random selection everytime users makes a selection
function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)

}
// decide a winner based on options[beats] === options[name] 
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}






