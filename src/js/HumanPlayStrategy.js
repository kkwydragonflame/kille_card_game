export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler // Need a provided User Interface component to interact with the user.
  }

  async chooseCardToPlay(eligibleCards, cards) {
    this.#inputHandler.displayMessage('Choose a card to play.')

    const userChoice = await this.#inputHandler.waitForUserInput(cards)

    // if none of the eligible cards are in the player's hand, have the player sacrifice their lowest card.
    if (eligibleCards.length === 0) {
      eligibleCards = cards.sort((a, b) => a.rank - b.rank)[0]
    }

    if (!eligibleCards.includes(userChoice)) {
      this.#inputHandler.displayMessage('Card is not a valid choice.')
      return this.chooseCardToPlay(eligibleCards)
    }
    return userChoice
  }
}
