export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler // Need a provided User Interface component to interact with the user.
  }

  async chooseCardToPlay(eligibleCards) {
    this.#inputHandler.displayMessage('Choose a card to play.')

    userChoice = await this.#inputHandler.waitForUserInput(eligibleCards)

    if (!eligibleCards.includes(userChoice)) {
      // throw new Error('Card is not eligible to play.')
      this.#inputHandler.displayMessage('Card is not eligible to play.')
      return this.chooseCardToPlay(eligibleCards)
    }
    return userChoice
    // This method will be implemented in a later step.
    // Need a way to wait for UI click event.
  }
}
