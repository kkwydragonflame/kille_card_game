export class HumanPlayer extends Player {
  constructor(name) {
    super(name)
  }

  chooseCardToPlay(eligibleCards) {
    return card = this.#promptUserForCard()
  }

  #promptUserForCard() {}
  // This method will be implemented in a later step.
  // Need a way to wait for UI click event.
}