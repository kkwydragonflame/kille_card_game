import readline from 'readline'

export class ConsoleInputHandler {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  displayMessage(message) {
    console.log(message)
  }

  async waitForUserInput(cards) {
    let isValidInput = false
    let cardIndex = -1

    this.#printCards(cards)

    while (!isValidInput) {
      try {
        const userInput = await this.#getUserInput()

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

    this.close()
    return cards[cardIndex]
  }

  #printCards(cards) {
    cards.forEach((card, index) => {
      console.log(`${index + 1}. Card: ${card.rank}, value: ${card.valueOf()}`)
    })
  }

  #getUserInput() {
    return new Promise((resolve) => {
      this.rl.question('Enter the number of the card you wish to play: ', (answer) => {
        resolve(answer)
      })
    })
  }

  #validateInput(userInput, maxInput) {
    const cardIndex = parseInt(userInput, 10) - 1
    return cardIndex >= 0 && cardIndex < maxInput
  }

  close() {
    this.rl.close()
  }
}
