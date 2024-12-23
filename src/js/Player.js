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

    const card = this.playStrategy.chooseCardToPlay(eligibleCards, this.cards)

    return this.removeCardFromHand(card)
  }

  #getEligibleCards(highestCard) {
    return highestCard
      ? this.#cards.filter(card => parseFloat(card.valueOf()) >= parseFloat(highestCard.valueOf()))
      : [...this.#cards]
  }

  removeCardFromHand(card) {
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

  set points(points) {
    if (typeof points !== 'number' || Number.isNaN(points) || points < 0) {
      throw new Error('Points must be a positive integer.')
    } else {
      this.#points = points
    }
  }

  get name() {
    return this.#name
  }

  get cards() {
    return [...this.#cards]
  }

  get points() {
    return this.#points
  }

  get strikeCount() {
    return this.#strikeCount
  }
}
