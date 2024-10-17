export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler // Need a provided User Interface component to interact with the user.
  }

  async chooseCardToPlay(eligibleCards) {
    this.#inputHandler.displayMessage('Choose a card to play.')

    userChoice = await this.#inputHandler.waitForUserInput(eligibleCards)

    if (!eligibleCards.includes(userChoice)) {
      this.#inputHandler.displayMessage('Card is not a valid choice.')
      return this.chooseCardToPlay(eligibleCards)
    }
    return userChoice
  }
}
