import readlineSync from 'readline-sync'

export class ConsoleInputHandler {
  waitForUserInput(cards) {
    let isValidInput = false
    let cardIndex = -1

    this.#printCards(cards)

    while (!isValidInput) {
      try {
        const userInput = readlineSync.question('\nPlease enter the number of the card you wish to play: ')

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

  askIfHasLowestCard() {
    return readlineSync.keyInYNStrict('Do you think you hold the lowest card?')
  }

  displayChoiceMessage(eligibleCards) {
    if (eligibleCards.length === 0) {
      console.log('\nYou have no eligible cards. You must sacrifice your lowest card.')
    } else {
      console.log('Choose a card to play.')
    }
  }

  displayCardNotValid() {
    console.log('Card is not a valid choice. Please select again.')
  }

  displayMustPlayLowestCard() {
    console.log('\nYou must play your lowest card.')
  }
}
