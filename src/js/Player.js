export class Player {
  #name
  #cards
  #points
  #strikeCount

  constructor(name, playStrategy) {
    this.#name = name
    this.#cards = []
    this.#points = 0
    this.#strikeCount = 0
    this.playStrategy = playStrategy
  }

  /**
   * Method to play a card from the player's hand.
   * @param {CardObject} highestCard The highest card currently in play.
   * @returns {CardObject} The card played by the player.
   */
  playCard(highestCard) {
    const eligibleCards = this.#getEligibleCards(highestCard)

    let card
    if (eligibleCards.length === 0) { // Logic fault here, should be if the player has no eligible cards.
      card = this.#playLowestCard()
    } else {
      card = this.playStrategy.chooseCardToPlay(eligibleCards, this.cards)
    }

    return this.#removeCardFromHand(card)
  }

  // atm this returns all cards in hand if no highestCard is provided, should be empty array. Only on the first round should the player be able to play any card.
  #getEligibleCards(highestCard) {
    return !highestCard ? this.#cards : this.#cards.filter(card => card.valueOf() >= highestCard.valueOf())
  }

  #playLowestCard() {
    return this.#cards.sort((a, b) => a.rank - b.rank)[0]
  }

  #removeCardFromHand(card) {
    const index = this.#cards.indexOf(card)
    if (index > -1) {
      this.#cards.splice(index, 1)
      return card
    }
  }

  addCardToHand(card) {
    this.#cards.push(card)
  }

  addPoints(points) {
    this.#points += points
  }

  addStrike() {
    this.#strikeCount++
  }

  get name() {
    return this.#name
  }

  get cards() {
    return [...this.#cards]
  }
}
