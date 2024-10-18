export class CardTable {
  #players
  #cardsInPlay
  #cardDeck

  constructor() {
    this.#players = []
    this.#cardsInPlay = []
    this.#cardDeck = new CardDeck('kille')
  }

  playRound(startingPlayer) {
    this.#shuffleDeck()
    this.#dealCards()
    this.#getStartingPlayer()
    this.#playCards(startingPlayer)
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

  #getStartingPlayer() {
    if (!this.#getHighestCard()) {
      return this.#players[Math.floor(Math.random() * this.#players.length)]
    }
    return this.#getCurrentRoundWinner()
  }

  #playCards(startingPlayer) {
    // start with the player who played the highest card in the previous round
    let playerIndex = indexOf(startingPlayer)
    let roundOver = false

    while (!roundOver) {
      const player = this.#players[playerIndex]
      const playedCard = player.playCard(this.#getHighestCard())
      this.#cardsInPlay.push(playedCard)

      // Have a print method to call here, to print out the cards played by each player.
      // this.onCardPlayed({ player: player.name, card: card })

      playerIndex++
    }

    this.#endRound()
  }

  #getHighestCard() {
    return this.#cardsInPlay.sort((a, b) => a.rank - b.rank)[0]
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
    this.#cardsInPlay.forEach(card => this.#cardDeck.add(card))
  }

  #calculatePoints() {
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

  #removePlayer(players) {
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
