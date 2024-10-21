import { CardTable } from './CardTable.js'
import { Player } from './Player.js'
import { HumanPlayStrategy } from './HumanPlayStrategy.js'
import { AiPlayStrategy } from './AiPlayStrategy.js'
import { ConsoleInputHandler } from './ConsoleInputHandler.js'

export class KilleGame {
  startGame() {
    this.#setupGame()
    this.cardTable.playRound()
  }

  #setupGame() {
    this.players = this.#generatePlayers()
    this.cardTable = new CardTable(this.players, this.onCardPlayed, this.onRoundOver)
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
    console.log(`${player.name} played ${card.name}`)
  }

  onRoundOver(player) {
    console.log(`Round over! ${player.name} won and gets to start next round!`)
  }
}
