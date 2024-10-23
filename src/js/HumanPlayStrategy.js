export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler // Need a provided User Interface component to interact with the user.
  }

  async chooseCardToPlay(eligibleCards, cards) {
    if (eligibleCards.length === 0) {
      this.#inputHandler.displayMessage('You have no eligible cards. You must sacrifice your lowest card.')
    } else {
      this.#inputHandler.displayMessage('Choose a card to play.')
    }

    const userChoice = await this.#inputHandler.waitForUserInput(cards)

    const lowestCard = cards.sort((a, b) => a.rank - b.rank)[0]

    if (!eligibleCards.includes(userChoice)) {
      if (eligibleCards.length === 0 && userChoice !== lowestCard) {
        this.#inputHandler.displayMessage('You must play your lowest card.')
        return this.chooseCardToPlay(eligibleCards)
      } else {
        this.#inputHandler.displayMessage('Card is not a valid choice. Please select again.')
        return this.chooseCardToPlay(eligibleCards)
      }
    }

    return userChoice
  }
}
