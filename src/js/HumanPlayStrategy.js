export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler
  }

  chooseCardToPlay(eligibleCards, cards) {
    this.#displayChoiceMessage(eligibleCards)
    let isValid = false
    let userChoice

    const lowestCard = this.#getLowestCard(cards)

    while (!isValid) {
      userChoice = this.#inputHandler.waitForUserInput(cards)
      isValid = this.#isChoiceValid(userChoice, eligibleCards, lowestCard)
    }

    return userChoice
    // return eligibleCards[0]
  }

  #displayChoiceMessage(eligibleCards) {
    if (eligibleCards.length === 0) {
      this.#inputHandler.displayMessage('You have no eligible cards. You must sacrifice your lowest card.')
    } else {
      this.#inputHandler.displayMessage('Choose a card to play.')
    }
  }

  #getLowestCard(cards) {
    return cards.sort((a, b) => a.rank - b.rank)[0]
  }

  #isChoiceValid(userChoice, eligibleCards, lowestCard) {
    if (!eligibleCards.includes(userChoice)) {
      if (eligibleCards.length === 0 && userChoice !== lowestCard) {
        this.#inputHandler.displayMessage('You must play your lowest card.')
        return false
      } else {
        this.#inputHandler.displayMessage('Card is not a valid choice. Please select again.')
        return false
      }
    }
    return true
  }
}
