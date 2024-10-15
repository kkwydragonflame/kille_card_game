export class CardTable {
  #players
  #cardsInPlay
  #cardDeck
  #discardPile

  constructor() {
    this.#players = []
    this.#cardsInPlay = []
    this.#cardDeck = new CardDeck('kille')
    this.#discardPile = []
  }

  playRound(startingPlayer = null) {
    // shuffle deck.
    // deal cards to players, 5 each.
    // for each player, call playCard method
    // once each player has played a card, check who played the highest card
    // set the player who played the highest card as the starting player for the next round
    // move played cards to the discard pile
  }

  #shuffleDeck() {
    this.#cardDeck.shuffle()
  }

  #dealCards() {
    for (let i = 0; i < 5; i++) {
      this.#players.forEach(player => {
        player.addCard(this.#cardDeck.draw())
      })
    }
  }

  #playCards() {
    this.#players.forEach(player => {
      this.#cardsInPlay.push(player.playCard(this.#getHighestCard()))
    })
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => a.rank - b.rank)[0]
  }
}