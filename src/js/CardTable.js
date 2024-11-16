export class CardTable {
  #cardDeck
  #players
  #gameInstance
  #cardsInPlay
  #discardPile
  #roundCounter
  #turnCounter
  #startingPlayer
  #lowCardClaimer

  constructor(deck, players, gameInstance) {
    this.#players = players
    this.#cardDeck = deck
    this.#gameInstance = gameInstance
    this.#cardsInPlay = []
    this.#discardPile = []
    this.#roundCounter = 1
    this.#turnCounter = 1
  }

  playRound() {
    this.#gameInstance.displayRoundCounter(this.#roundCounter)
    this.#shuffleDeck()
    this.#dealCards()

    let roundValid = false
    while (!roundValid) {
      while (!this.#doesEveryoneHaveOneCardLeft()) {
        this.#playTurns()
      }

      const claimIsValid = this.#askWhoHoldsLowestCard()
      if (!claimIsValid) {
        this.#gameInstance.restartingRound()
        // Need to discard players card here as well?
        this.#addCardsBackToDeck()
        continue
      }
      roundValid = true
    }

    this.#calculatePoints()
    this.#gameInstance.showPlayerPoints(this.#players)
    this.#discardPlayerCards()
    this.#checkAddToStrikeCount()
    this.#removePlayer(this.#checkStrikeCount())

    if (!this.#checkWinCondition()) {
      this.#addCardsBackToDeck()
      this.#roundCounter++
      this.#turnCounter = 1
      this.#startingPlayer = null // Reset starting player for next round. Should create a fair way to pass this around the players.
      this.playRound()
    }
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
    this.#gameInstance.displayTurnCounter(this.#turnCounter)
    let playerIndex = this.#startingPlayer ? this.#players.indexOf(this.#startingPlayer) : 0
    let cardsPlayed = 0

    while (cardsPlayed < this.#players.length) {
      const player = this.#players[playerIndex]
      const playedCard = player.playCard(this.#getHighestCard())
      this.#cardsInPlay.push({ playedCard, player })

      this.#gameInstance.onCardPlayed(player, playedCard)

      cardsPlayed++
      playerIndex = (playerIndex + 1) % this.#players.length
    }

    this.#turnCounter++
    this.#setTurnWinner()
    if (this.#turnCounter <= 4) {
      this.#gameInstance.onTurnOver(this.#startingPlayer)
    }
    this.#discardCardsFromTable()
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => b.playedCard.valueOf() - a.playedCard.valueOf())[0]
  }

  #setTurnWinner() {
    const highestCard = this.#getHighestCard()
    this.#startingPlayer = highestCard.player
  }

  #discardCardsFromTable() {
    this.#discardPile.push(...this.#cardsInPlay.map(card => card.playedCard))
    this.#cardsInPlay = []
  }

  #askWhoHoldsLowestCard() {
    const lowestCardHolder = this.#findWhoHoldsTheLowestCard()
    const lowCardClaimer = this.#findLowCardClaimer()

    if (lowCardClaimer) {
      this.#revealPlayerCards()
      if (lowestCardHolder !== lowCardClaimer) {
        this.#addPenaltyPoints(lowCardClaimer)
      } else {
        this.#lowCardClaimer = lowCardClaimer
      }
      return true
    } else {
      return false
    }
  }

  #findLowCardClaimer() {
    let playerIndex = this.#players.indexOf(this.#startingPlayer)
    let playersAsked = 0

    while (playersAsked < this.#players.length) {
      const player = this.#players[playerIndex]
      const hasLowestCard = player.playStrategy.askIfHasLowestCard()
      this.#gameInstance.lowestCardClaimed(player, hasLowestCard)
      if (hasLowestCard) {
        return player
      }
      playersAsked++
      playerIndex = (playerIndex + 1) % this.#players.length
    }
    return null
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

  #revealPlayerCards() {
    this.#gameInstance.revealPlayerCards()
    for (const player of this.#players) {
      player.cards.forEach(card => this.#gameInstance.onCardRevealed(player, card))
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
    // Add points to each player, except for lowCardClaimer if correct.
    for (const player of this.#players) {
      if (player !== this.#lowCardClaimer) {
        player.addPoints(player.cards.reduce((acc, card) => acc + card.valueOf(), 0))
      }
    }
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
        this.#gameInstance.onPlayerReceivingStrike(player)
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
        this.#gameInstance.onPlayerEliminated(player)
      }
    })
  }

  #checkWinCondition() {
    // Last Man Standing win scenario.
    if (this.#players.length === 1) {
      this.#gameInstance.onGameEnd(this.#players[0])
      return true
    }

    // Second win scenario.
    if (this.#players.length === 2) {
      // need to add a boolean to each player for receiving a strike this round.
      // compare the boolean values to determine if all but one received a strike.
    }
    // should I return true or false here to have playRound method call gameEnd? Or should I call gameEnd here?
    return false
  }

  #addCardsBackToDeck() {
    this.#discardCardsFromTable()

    while (this.#discardPile.length) {
      this.#cardDeck.addCardToBottomOfDeck(this.#discardPile.pop())
    }
  }
}
