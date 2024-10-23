export class AiPlayStrategy {
  chooseCardToPlay(eligibleCards, cardsInHand) {
    if (eligibleCards.length === 0) {
      return this.#playLowestCard(cardsInHand)
    }

    return this.#chooseRandomCard(eligibleCards)
  }

  #playLowestCard(cardsInHand) {
    return cardsInHand.sort((a, b) => a.rank - b.rank)[0]
  }

  #chooseRandomCard(cards) {
    return cards[Math.floor(Math.random() * cards.length)]
  }
}
