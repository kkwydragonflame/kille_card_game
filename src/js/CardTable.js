export class CardTable {
  #players
  #cardsInPlay
  #cardDeck
  #discardPile

  constructor(deck, players, onCardPlayed, onRoundOver) {
    this.#players = players
    this.#cardsInPlay = []
    this.#cardDeck = deck
    this.#discardPile = []
    this.onCardPlayed = onCardPlayed
    this.onRoundOver = onRoundOver
  }

  playRound(startingPlayer) {
    if (!startingPlayer) {
      startingPlayer = this.#getStartingPlayer()
    }
    this.#shuffleDeck()
    this.#dealCards() // Should not deal cards if it's not the first round.
    // startingPlayer = this.#getStartingPlayer()
    this.#playTurns(startingPlayer)
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
    return this.#getCurrentTurnWinner()
  }

  #playTurns(startingPlayer) {
    // start with the player who played the highest card in the previous round
    let playerIndex = this.#players.indexOf(startingPlayer)
    let cardsPlayed = 0

    while (cardsPlayed < this.#players.length) {
      const player = this.#players[playerIndex]
      const playedCard = player.playCard(this.#getHighestCard())
      this.#cardsInPlay.push({ playedCard, player })

      // Send the played card to the onCardPlayed callback.
      this.onCardPlayed(player, playedCard)

      cardsPlayed++

      playerIndex = (playerIndex + 1) % this.#players.length
    }

    this.#endTurn()
    // playCards should repeat until all players only have one card left.
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => b.playedCard.valueOf() - a.playedCard.valueOf())[0]
  }

  #endTurn() {
    const turnWinner = this.#getCurrentTurnWinner()
    // Move all cards from the cardsInPlay array to the discardPile array.
    this.#discardPile.push(...this.#cardsInPlay.playedCard)
    this.#cardsInPlay = []

    if (this.#doesEveryoneHaveOneCardLeft()) {
      // If true, ask all players if they have the lowest card.
      const playerWhoSaidYes = this.#askIfPlayerHasLowestCard()
      // If no answers yes, restart the round.
      if (!playerWhoSaidYes) {
        this.playRound()
      } else {
        // As soon as one answers yes, call the #endRound() method.
        this.#endRound() // Need to move this call, don't want to return here.
        return // Break away here, to return to the playRound method.
      }
    }
    // If false, play next round.
    this.#playTurns(turnWinner)
  }

  #doesEveryoneHaveOneCardLeft() {
    return this.#players.every(player => player.cards.length === 1)
  }

  #askIfPlayerHasLowestCard() { // Should start with the player who last played the highest card.
    for (const player of this.#players) {
      const hasLowestCard = player.playStrategy.askIfHasLowestCard()
      if (hasLowestCard) {
        return player
      }
    }
    return false // Fallback if no player has the lowest card. Should restart the round.
  }

  #endRound() {
    this.#calculatePoints()
    this.#checkAddToStrikeCount()
    this.#removePlayer(this.#checkStrikeCount())
    this.#checkWinCondition()
    this.#addCardsBackToDeck()
    // this.playRound(this.#getCurrentRoundWinner())
  }

  #getCurrentTurnWinner() {
    const highestCard = this.#getHighestCard()
    return highestCard.player // Find who played the highest card.
  }

  #addCardsBackToDeck() { // Don't use forEach, use a for loop instead.
    for (const card of this.#discardPile) {
      this.#cardDeck.addCardToBottomOfDeck(card)
    }
    // this.#discardPile.forEach(card => this.#cardDeck.addCardToBottomOfDeck(card))
  }

  #calculatePoints() { // Do not call this method before the last turn.
    // Need to combine calculatePoints and checkAddToStrikeCount so that the points are calculated
    // before the strikes are added, but also so that points are set to correct value if a player gets a strike.
    this.#players.forEach(player => {
      player.addPoints(player.cards.reduce((acc, card) => acc + card.valueOf(), 0))
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
    return this.#players.map(player => player.strikeCount >= 3)
  }

  #removePlayer(players) { // Not working as intended. Currently removes all players.
    players.forEach(player => {
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
