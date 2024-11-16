import { CardTable } from './CardTable.js'
import { Player } from './Player.js'
import { HumanPlayStrategy } from './HumanPlayStrategy.js'
import { AiPlayStrategy } from './AiPlayStrategy.js'
import { ConsoleInputHandler } from './ConsoleInputHandler.js'
import { DeckGenerator } from 'laboration2/src/deckGenerator.js'

export class KilleGame {
  startGame() {
    this.#setupGame()
    this.cardTable.playRound()
  }

  #setupGame() {
    this.players = this.#generatePlayers()
    this.deck = DeckGenerator.generateDeck('kille')
    this.cardTable = new CardTable(this.deck, this.players, this)
  }

  #generatePlayers() {
    const inputHandler = new ConsoleInputHandler()
    const players = [
      new Player('You', new HumanPlayStrategy(inputHandler)),
      new Player('Bob AI', new AiPlayStrategy()),
      new Player('Karen AI', new AiPlayStrategy()),
      new Player('Mikael AI', new AiPlayStrategy())
    ]
    return players
  }

  onCardPlayed(player, card) {
    console.log('\x1b[32m%s\x1b[0m', `${player.name} played a ${card.toString()} (value: ${card.valueOf()})`)
  }

  displayRoundCounter(round) {
    console.log('\x1b[31m%s\x1b[0m', `\nRound ${round}!\n`)
  }

  displayTurnCounter(turn) {
    console.log('\x1b[33m%s\x1b[0m', `Turn ${turn}!\n`)
  }

  lowestCardClaimed(player, hasLowestCard) {
    console.log(`\n${player.name} claim to ${hasLowestCard ? 'hold' : 'not hold'} the lowest card.`)
  }

  showPlayerScore(players) {
    console.log('\nRound over!')
    console.log('Tallying points:')
    players.forEach(player => {
      console.log(`${player.name} current score: ${player.points}, strikes: ${player.strikeCount}`)
    })
  }

  onPlayerReceivingStrike(player) {
    console.log('\x1b[31m%s\x1b[0m', `${player.name} received a strike! New score: ${player.points}`)
  }

  onPlayerEliminated(player) {
    console.log('\x1b[31m%s\x1b[0m', `${player.name} received 3 strikes and has been eliminated!`)
  }

  restartingRound() {
    console.log('No one claimed to hold the lowest card. Restarting round.')
  }

  onTurnOver(player) {
    console.log(`\nTurn over! ${player.name} won and will begin next round!\n`)
  }

  revealPlayerCards() {
    console.log('\nRevealing player cards...')
  }

  onCardRevealed(player, card) {
    console.log(`${player.name} hold/holds a ${card.toString()} (value: ${card.valueOf()})`)
  }

  onGameEnd(player) {
    console.log('\x1b[32m%s\x1b[0m', `\nGame finished! The winner is... ${player.name}!`)
  }
}
