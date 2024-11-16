export class HumanPlayStrategy {
  #inputHandler

  constructor(inputHandler) {
    this.#inputHandler = inputHandler
  }

  chooseCardToPlay(eligibleCards, cards) {
    this.#inputHandler.displayChoiceMessage(eligibleCards)
    let isValid = false
    let userChoice

    const lowestCard = this.#getLowestCard(cards)

    while (!isValid) {
      userChoice = this.#inputHandler.waitForUserInput(cards)
      isValid = this.#isChoiceValid(userChoice, eligibleCards, lowestCard)
    }

    return userChoice
  }

  #getLowestCard(cards) {
    return cards.sort((a, b) => a.rank - b.rank)[0]
  }

  #isChoiceValid(userChoice, eligibleCards, lowestCard) {
    if (eligibleCards.includes(userChoice)) {
      return true
    }

    if (eligibleCards.length === 0) {
      if (userChoice === lowestCard) {
        return true
      } else {
        this.#inputHandler.displayMustPlayLowestCard()
        return false
      }
    }

    this.#inputHandler.displayCardNotValid()
    return false
  }

  askIfHasLowestCard() {
    return this.#inputHandler.askIfHasLowestCard()
  }
}
