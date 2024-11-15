export class CardTable {
  #players
  #cardsInPlay
  #cardDeck
  #discardPile
  #startingPlayer

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

  playRound() {
    this.#shuffleDeck()
    this.#dealCards()
    while (!this.#doesEveryoneHaveOneCardLeft()) {
      this.#playTurns()
    }
    // After loop do the check for the lowest card.
    if (!this.#askWhoHoldsLowestCard()) {
      // If no one has the lowest card, restart the round.
      this.playRound()
    }
    this.#calculatePoints()
    this.#checkAddToStrikeCount()
    this.#removePlayer(this.#checkStrikeCount())
    this.#checkWinCondition()
    this.#addCardsBackToDeck()
    this.#endRound()
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

  #doesEveryoneHaveOneCardLeft() {
    return this.#players.every(player => player.cards.length === 1)
  }

  #playTurns() {
    // start with the player who played the highest card in the previous round
    let playerIndex = this.#startingPlayer ? this.#players.indexOf(this.#startingPlayer) : 0
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

    // set turnWinner to the player who played the highest card this turn.
    this.#setTurnWinner()
    this.#discardCardsFromTable()
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => b.playedCard.valueOf() - a.playedCard.valueOf())[0]
  }

  #setTurnWinner() {
    const highestCard = this.#getHighestCard()
    this.#startingPlayer = highestCard.player // Find who played the highest card.
  }

  #discardCardsFromTable() {
    this.#discardPile.push(...this.#cardsInPlay.map(card => card.playedCard))
    this.#cardsInPlay = []
  }

  #askWhoHoldsLowestCard() { // Should start with the player who last played the highest card.
    const lowestCardHolder = this.#findWhoHoldsTheLowestCard()
    let lowCardClaimer = null
    let playerIndex = this.#players.indexOf(this.#startingPlayer)
    let playersAsked = 0

    while (playersAsked < this.#players.length) {
      const player = this.#players[playerIndex]
      const hasLowestCard = player.playStrategy.askIfHasLowestCard()
      this.displayMessage(`${player.name} claim to ${hasLowestCard ? 'hold' : 'not hold'} the lowest card.`)
      if (hasLowestCard) {
        lowCardClaimer = player
        // Have each player reveal their cards, by playing them.
        // this.displayMessage('Revealing all cards in the players hands.')
        // for (const player of this.#players) {
        //   const playedCard = player.playCard(this.#getHighestCard())
        //   this.#cardsInPlay.push({ playedCard, player })
        //   this.displayMessage(`${player.name} holds a ${playedCard.toString()} (value: ${playedCard.valueOf()})`)
        // }
        // return player
        this.#revealPlayerCards()
        this.#discardPlayerCards()
        // end the loop here, to continue with next if statement.
        break
      }
      playersAsked++
      playerIndex = (playerIndex + 1) % this.#players.length
    }
    // return false // Fallback if no player has the lowest card. Should restart the round.
    if (lowestCardHolder !== lowCardClaimer) {
      this.#addPenaltyPoints(lowCardClaimer)
    }
    // need to return true or false here, to determine if the round should be restarted.
    if (!lowCardClaimer) {
      return false
    } else {
      return true
    }
  }

  #findWhoHoldsTheLowestCard() { // Not working as intended.
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

  #revealPlayerCards() {
    for (const player of this.#players) {
      // Reveal what cards the players have.
      player.cards.forEach(card => this.displayMessage(`${player.name} hold a ${card.toString()} (value: ${card.valueOf()})`))
      // discard the cards after they have been revealed.
    }
  }

  #discardPlayerCards() {
    for (const player of this.#players) {
      this.#discardPile.push(player.removeCardFromHand(player.cards[0]))
    }
  }

  #addPenaltyPoints(lowCardClaimer) {
    lowCardClaimer.addPoints(5)
  }

  #calculatePoints() {
    // Add points to each player, except if lowCardClaimer was correct.
    this.#players.forEach(player => {
      player.addPoints(player.cards.reduce((acc, card) => acc + card.valueOf(), 0))
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
    return this.#players.filter(player => player.strikeCount >= 3)
  }

  #removePlayer(players) {
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
      // Last Man Standing win scenario.
      this.onGameEnd(this.#players[0])
    } else {
      // Here's where to implement the second win scenario.
      // how to check if all players but one received 3 strikes this round?
    }
    // should I return true or false here to have playRound method call gameEnd? Or should I call gameEnd here?
  }

  #addCardsBackToDeck() {
    // At this point, all players should only have one card left.
    // for (const player of this.#players) {
    //   this.#discardPile.push(player.cards.pop()) // Use the removeCardFromHand method instead.
    // } // Not needed, as the cards are already in the discard pile.

    // Have to add the cards from the cardsInPlay array to the discard pile.
    this.#discardPile.push(...this.#cardsInPlay.map(card => card.playedCard))
    this.#cardsInPlay = []

    while (this.#discardPile.length) {
      this.#cardDeck.addCardToBottomOfDeck(this.#discardPile.pop())
    }
  }

  #endRound(playerWhoSaidYes) {
    this.#calculatePoints()
    const lowestCardHolder = this.#findWhoHoldsTheLowestCard()
    this.#addPenaltyPoints(lowestCardHolder, playerWhoSaidYes)
    this.#checkAddToStrikeCount()
    this.#removePlayer(this.#checkStrikeCount())
    this.#checkWinCondition()
    this.#addCardsBackToDeck()
    // this.playRound(this.#getCurrentRoundWinner())
    // from here I want to return to the playRound method. But how?
  }
}
