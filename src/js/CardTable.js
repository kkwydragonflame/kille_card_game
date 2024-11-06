export class CardTable {
  #players
  #cardsInPlay
  #cardDeck
  #discardPile

  constructor(deck, players, onCardPlayed, onRoundOver, onGameEnd, displayMessage) {
    this.#players = players
    this.#cardsInPlay = []
    this.#cardDeck = deck
    this.#discardPile = []
    this.onCardPlayed = onCardPlayed
    this.onRoundOver = onRoundOver
    this.onGameEnd = onGameEnd
    this.displayMessage = displayMessage
  }

  playRound(startingPlayer) {
    if (!startingPlayer) {
      startingPlayer = this.#getStartingPlayer()
    }
    this.#shuffleDeck()
    this.#dealCards() // Should not deal cards if it's not the first round.
    // startingPlayer = this.#getStartingPlayer()
    const playerWhoSaidYes = this.#playTurns(startingPlayer)
    this.#endRound(playerWhoSaidYes)
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
    this.#discardPile.push(...this.#cardsInPlay.map(card => card.playedCard))
    this.#cardsInPlay = [] // Can refactor this and removing the cards from the players hands to a separate method.

    if (this.#doesEveryoneHaveOneCardLeft()) {
      // If true, ask all players if they have the lowest card.
      const playerWhoSaidYes = this.#askIfPlayerHasLowestCard(turnWinner)
      // If no answers yes, restart the round.
      if (!playerWhoSaidYes) {
        this.playRound() // Will this produce an infinite loop? Should it be a return instead?
      } else {
        // As soon as one answers yes, call the #endRound() method.
        // Reveal all cards in the players hands.

        // this.#endRound(playerWhoSaidYes) // Need to move this call, don't want to return here.
        return playerWhoSaidYes// Break away here, to return to the playRound method.
      }
    }
    // If false, play next round.
    this.#playTurns(turnWinner)
  }

  #doesEveryoneHaveOneCardLeft() {
    return this.#players.every(player => player.cards.length === 1)
  }

  #askIfPlayerHasLowestCard(turnWinner) { // Should start with the player who last played the highest card.
    let playerIndex = this.#players.indexOf(turnWinner)
    let playersAsked = 0

    while (playersAsked < this.#players.length) {
      const player = this.#players[playerIndex]
      const hasLowestCard = player.playStrategy.askIfHasLowestCard()
      if (hasLowestCard) {
        return player
      }
      playersAsked++
      playerIndex = (playerIndex + 1) % this.#players.length
    }
    return false // Fallback if no player has the lowest card. Should restart the round.
  }

  #endRound(playerWhoSaidYes) {
    this.#calculatePoints(playerWhoSaidYes)
    const lowestCardHolder = this.#findWhoHoldsTheLowestCard()
    this.#addPenaltyPoints(lowestCardHolder, playerWhoSaidYes)
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

  #addCardsBackToDeck() {
    // At this point, all players should only have one card left.
    for (const player of this.#players) {
      this.#discardPile.push(player.cards.pop()) // Use the removeCardFromHand method instead.
    }

    for (let i = 0; i < this.#discardPile.length; i++) { // Why does this leave 10 cards in the discard pile?
      this.#cardDeck.addCardToBottomOfDeck(this.#discardPile.pop()) // Remove the cards from the discard pile and add them back to the deck.
    }
    // this.#discardPile.forEach(card => this.#cardDeck.addCardToBottomOfDeck(card))
  }

  #calculatePoints(playerWhoSaidYes) { // Do not call this method before the last turn.
    this.#players.forEach(player => {
      player.addPoints(player.cards.reduce((acc, card) => acc + card.valueOf(), 0))
      // Have a print method to call here, to print out the points for each player, and if they get a strike.
    })
  }

  #addPenaltyPoints(lowestCardHolder, playerWhoSaidYes) {
    if (lowestCardHolder !== playerWhoSaidYes) {
      lowestCardHolder.addPoints(5)
    }
  }

  #findWhoHoldsTheLowestCard() {
    let lowestCardHolder = this.#players[0]
    for (const player of this.#players) {
      for (const card of player.cards) {
        if (card.valueOf() < lowestCardHolder.cards[0].valueOf()) {
          lowestCardHolder = player
        }
      }
    }
    return lowestCardHolder
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

  #checkStrikeCount() { // Should now return an array of players with 3 strikes.
    return this.#players.filter(player => player.strikeCount >= 3)
  }

  #removePlayer(players) { // Should now only remove players with 3 strikes.
    players.forEach(player => {
      const index = this.#players.indexOf(player)
      if (index > -1) {
        this.#players.splice(index, 1)
        this.displayMessage(`${player.name} has received 3 strikes and has been eliminated.`)
        // Don't want to bind the message to a console implementation.
      }
    })
  }

  #checkWinCondition() {
    if (this.#players.length === 1) {
      this.onGameEnd({ winner: this.#players[0].name })
      // Have a game over method call here?
    } else {
      // how to check if all players but one received 3 strikes this round?
    }
  }
}
