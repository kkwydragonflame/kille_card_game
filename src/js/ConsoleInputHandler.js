import readline from 'readline'

export class ConsoleInputHandler {
  displayMessage(message) {
    console.log(message)
  }

  async waitForUserInput(cards) {
    let isValidInput = false
    let cardIndex = -1

    this.#printCards(cards)

    while (!isValidInput) {
      const userInput = await this.#getUserInput()

      isValidInput = this.#validateInput(userInput, cards.length)

      if (isValidInput) {
        cardIndex = parseInt(userInput, 10) - 1
      } else {
        console.log('Invalid input. Please try again.')
      }
    }

    return cards[cardIndex]
  }

  #printCards(cards) {
    cards.forEach((card, index) => {
      console.log(`${index + 1}. ${card.name}`)
    })
  }

  #getUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => {
      rl.question('Enter the number of the card you wish to play: ', (answer) => {
        rl.close()
        resolve(answer)
      })
    })
  }

  #validateInput(userInput, maxInput) {
    const cardIndex = parseInt(userInput, 10) - 1
    return cardIndex >= 0 && cardIndex < maxInput
  }
}