import readlineSync from 'readline-sync'

export class ConsoleInputHandler {
  displayMessage(message) {
    console.log(message)
  }

  waitForUserInput(cards) {
    let isValidInput = false
    let cardIndex = -1

    this.#printCards(cards)

    while (!isValidInput) {
      try {
        const userInput = readlineSync.question('Please enter the number of the card you want to play: ')

        isValidInput = this.#validateInput(userInput, cards.length)

        if (isValidInput) {
          cardIndex = parseInt(userInput, 10) - 1
        } else {
          console.log('Invalid input. Please try again.')
        }
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    return cards[cardIndex]
  }

  #printCards(cards) {
    cards.forEach((card, index) => {
      console.log(`${index + 1}. Card: ${card.rank}, value: ${card.valueOf()}`)
    })
  }

  #validateInput(userInput, maxInput) {
    const cardIndex = parseInt(userInput, 10) - 1
    return cardIndex >= 0 && cardIndex < maxInput
  }
}
