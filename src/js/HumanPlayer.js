export class HumanPlayStrategy {
  #ui

  constructor(ui) {
    this.#ui = ui // Need a provided User Interface component to interact with the user.
  }

  async chooseCardToPlay(eligibleCards) {}
  this.#ui.displayMessage('Choose a card to play.')
  userChoice = await this.#ui.waitForUserInput()
  if (!eligibleCards.includes(userChoice)) {
    this.#ui.displayMessage('Card is not eligible to play.')
    return this.chooseCardToPlay(eligibleCards)
  }
  return userChoice
  // This method will be implemented in a later step.
  // Need a way to wait for UI click event.
}