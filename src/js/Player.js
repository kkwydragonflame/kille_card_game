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
   * @param {Card} highestCard The highest card currently in play.
   * @returns {Card} The card played by the player.
   */
  playCard(highestCard) {
    const eligibleCards = this.#getEligibleCards(highestCard)

    if (eligibleCards.length === 0) {
      card = this.#playLowestCard()
    } else {
      this.playStrategy.chooseCardToPlay(eligibleCards)
    }

    return this.#removeCardFromHand(card)
  }

  #getEligibleCards(highestCard) {
    return this.#cards.filter(card => card.rank >= highestCard.rank)
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