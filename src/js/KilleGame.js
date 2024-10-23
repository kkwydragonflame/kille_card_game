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
    this.cardTable = new CardTable(this.deck, this.players, this.onCardPlayed, this.onRoundOver)
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
    console.log(`${player.name} played a ${card.toString()} (value: ${card.valueOf()})`) // Violates Law of Demeter? Add printing value of card?
  }

  displayMessage(message) {
    console.log(message)
  }

  onRoundOver(player) {
    console.log(`Round over! ${player.name} won and gets to start next round!`)
  }
}
