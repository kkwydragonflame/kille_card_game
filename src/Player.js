export class Player {
  #name
  #cards

  constructor(name) {
    if (this.constructor === Player) {
      throw new Error('Player is an abstract class and cannot be instantiated directly.')
    }

    this.#name = name
    this.#cards = []
  }

  get name() {
    return this.#name
  }

  get cards() {
    return [...this.#cards]
  }

  addCard(card) {
    this.#cards.push(card)
  }

  /**
   * Method to play a card from the player's hand.
   * @param {Card} card The card a player wants to play.
   * @param {Card} highestCard The highest card currently in play.
   * @returns {Card} The card played by the player.
   */
  playCard(card, highestCard) {
    const eligibleCards = this.#getEligibleCards(highestCard)

    if (eligibleCards.length === 0) {
      card = this.#playLowestCard()
    } else {
      this.#validateCard(this.#chooseCardToPlay(eligibleCards), eligibleCards)
    }

    return this.#removeCardFromHand(card)
  }

  #getEligibleCards(highestCard) {
    return this.#cards.filter(card => card.rank >= highestCard.rank)
  }

  #playLowestCard() {
    return this.#cards.sort((a, b) => a.rank - b.rank)[0]
  }

  #chooseCardToPlay() {
    throw new Error('Method must be implemented by subclass.')
  }

  #validateCard(card,eligibleCards) {
    if (!eligibleCards.includes(card)) {
      throw new Error('Card is not eligible to play.')
    }
  }

  #removeCardFromHand(card) {
    const index = this.#cards.indexOf(card)
    if (index > -1) {
      this.#cards.splice(index, 1)
      return card
    }
  }
}