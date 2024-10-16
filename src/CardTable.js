export class CardTable {
  #players
  #cardsInPlay
  #cardDeck

  constructor() {
    this.#players = []
    this.#cardsInPlay = []
    this.#cardDeck = new CardDeck('kille') // Bound to this specific implementation. Good or bad?
  }

  playRound(startingPlayer = null) {
    this.#shuffleDeck()
    this.#dealCards()
    // determine starting player
    this.#playCards()
    this.#endRound()
  }

  #shuffleDeck() {
    this.#cardDeck.shuffle()
  }

  #dealCards() {
    for (let i = 0; i < 5; i++) {
      this.#players.forEach(player => {
        player.addCardToHand(this.#cardDeck.deal())
      })
    }
  }

  // Make objects in array, to keep track of who played what card?
  #playCards() {
    this.#players.forEach(player => {
      this.#cardsInPlay.push({player, card: player.playCard(this.#getHighestCard())})
    })
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => a.rank - b.rank)[0]
  }

  #endRound() {
    const startingPlayer = this.#determineWinner()
    this.#addCardsBackToDeck()
    this.playRound(startingPlayer)
  }

  #determineWinner() {
    const highestCard = this.#getHighestCard()
    return highestCard.player
  }

  #addCardsBackToDeck() {
    this.#cardsInPlay.forEach(card => this.#cardDeck.add(card))
  }
}