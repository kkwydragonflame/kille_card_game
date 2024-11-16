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
    console.log(`\nRound ${round}!\n`)
  }

  displayTurnCounter(turn) {
    console.log(`Turn ${turn}!`)
  }

  lowestCardClaimed(player, hasLowestCard) {
    console.log(`\n${player.name} claim to ${hasLowestCard ? 'hold' : 'not hold'} the lowest card.`)
  }

  showPlayerPoints(players) {
    console.log('\nRound over!')
    console.log('Tallying points:')
    players.forEach(player => {
      console.log(`${player.name} received ${player.points} points. Current score: ${player.points}`)
    })
  }

  onPlayerReceivingStrike(player) {
    console.log(`${player.name} received a strike! New score: ${player.points}`)
  }

  onPlayerEliminated(player) {
    console.log(`${player.name} received 3 strikes and has been eliminated!`)
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
    console.log(`\nGame finished! The winner is... ${player.name}!`)
  }
}
