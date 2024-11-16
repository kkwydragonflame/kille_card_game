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
    console.log(`${player.name} played a ${card.toString()} (value: ${card.valueOf()})`)
  }

  displayRoundCounter(round) {
    console.log(`Round ${round}!`)
  }

  displayTurnCounter(turn) {
    console.log(`Turn ${turn}!`)
  }

  showPlayerPoints(player) {
    console.log(`${player.name} has ${player.points} points.`)
  }

  onPlayerReceivingStrike(player) {
    console.log(`${player.name} received a strike!`)
  }

  onPlayerEliminated(player) {
    console.log(`${player.name} received 3 strikes and has been eliminated!`)
  }

  restartingRound() {
    console.log('No one claimed to hold the lowest card. Restarting round.')
  }

  onRoundOver(player) {
    console.log(`\nRound over! ${player.name} won and gets to start next round!\n`)
  }

  revealPlayerCards() {
    console.log('\nRevealing player cards...')
  }

  onCardRevealed(player, card) {
    console.log(`${player.name} holds a ${card.toString()} (value: ${card.valueOf()})`)
  }

  onGameEnd(player) {
    console.log(`Game finished! The winner is... ${player.name}!`)
  }
}
