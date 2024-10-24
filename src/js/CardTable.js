export class CardTable {
  #players
  #cardsInPlay
  #cardDeck

  constructor(deck, players, onCardPlayed, onRoundOver) {
    this.#players = players
    this.#cardsInPlay = []
    this.#cardDeck = deck
    this.onCardPlayed = onCardPlayed
    this.onRoundOver = onRoundOver
  }

  playRound(startingPlayer) {
    if (!startingPlayer) {
      startingPlayer = this.#getStartingPlayer()
    }
    this.#shuffleDeck()
    this.#dealCards()
    // startingPlayer = this.#getStartingPlayer()
    this.#playCards(startingPlayer)
    // this.#endRound()
  }

  #shuffleDeck() {
    this.#cardDeck.shuffle()
  }

  #dealCards() {
    for (let i = 0; i < 5; i++) {
      this.#players.forEach(player => {
        player.addCardToHand(this.#cardDeck.dealCard())
      })
    }
  }

  #getStartingPlayer() {
    if (!this.#getHighestCard()) {
      const player = this.#players[Math.floor(Math.random() * this.#players.length)]
      return player
    }
    return this.#getCurrentRoundWinner()
  }

  #playCards(startingPlayer) {
    // start with the player who played the highest card in the previous round
    let playerIndex = this.#players.indexOf(startingPlayer)
    let cardsPlayed = 0

    while (cardsPlayed < this.#players.length) {
      const player = this.#players[playerIndex]
      const playedCard = player.playCard(this.#getHighestCard()) // Not correctly setting highest card on subsequent rounds.
      this.#cardsInPlay.push(playedCard)

      // Send the played card to the onCardPlayed callback.
      this.onCardPlayed(player, playedCard)

      cardsPlayed++

      playerIndex = (playerIndex + 1) % this.#players.length
    }

    // endTurn()
    // playCards should repeat until all players only have one card left.
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((b, a) => b.rank - a.rank)[0]
  }

  #endRound() {
    this.#calculatePoints()
    this.#checkAddToStrikeCount()
    this.#removePlayer(this.#checkStrikeCount())
    this.#checkWinCondition()
    this.#addCardsBackToDeck()
    this.playRound(this.#getCurrentRoundWinner())
  }

  #getCurrentRoundWinner() {
    const highestCard = this.#getHighestCard()
    return highestCard.player
  }

  #addCardsBackToDeck() {
    this.#cardsInPlay.forEach(card => this.#cardDeck.addCardToBottomOfDeck(card))
  }

  #calculatePoints() { // Do not call this method before the last round.
    this.#players.forEach(player => {
      player.addPoints(player.cards.forEach(card => card.valueOf()))
      // Have a print method to call here, to print out the points for each player, and if they get a strike.
    })
  }

  #checkAddToStrikeCount() {
    let highestSum = 0

    this.#players.forEach(player => {
      if (player.points < 21 && player.points >= highestSum) {
        highestSum = player.points
      }
    })

    this.#players.forEach(player => {
      if (player.points >= 21) {
        player.addStrike()
        player.points = highestSum
      }
    })
  }

  #checkStrikeCount() {
    return this.#players.some(player => player.strikeCount >= 3)
  }

  #removePlayer() { // Not working as intended?
    this.#players.forEach(player => {
      const index = this.#players.indexOf(player)
      if (index > -1) {
        this.#players.splice(index, 1)
        // Have a print method to call here, to print out the player that has been removed from the game
      }
    })
  }

  #checkWinCondition() {
    if (this.#players.length === 1) {
      // Have a print method to call here, to print out the winner of the game.
      // this.onGameEnd({ winner: this.#players[0].name })
    } else {
      // reset round and go next round
    }
  }
}
// Only thing left is to have the 'Do-You-Have-The-Lowest-Card' check.
