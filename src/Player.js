export class Player {
  #name
  #cards

  constructor(name) {
    if (constructor === Player) {
      throw new Error('Player is an abstract class and cannot be instantiated directly.')
    }

    this.#name = name
    this.#cards = []
  }

  get name() {
    return this.#name
  }

  get cards() {
    return [...this.#cards]
  }

  addCard(card) {
    this.#cards.push(card)
  }

  playCard(card) {
    const index = this.#cards.indexOf(card)
    if (index > -1) {
      this.#cards.splice(index, 1)
      return card
    }
    return null
  }
}