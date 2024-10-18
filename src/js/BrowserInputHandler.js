import EventEmitter from 'events'

// Needs refactoring to use EventTarget instead, to work in browser
export class BrowserInputHandler extends EventEmitter {
  displayMessage(message) {
    emit(message)
  }

  waitForUserInput(playerName) {
    return new Promise(resolve => {

      const cards = this.#getPlayerCards(playerName)

      this.cardClickListener = event => {
        const card = event.target
        this.#removeCardListeners(cards)
        resolve(card)
      }

      this.#addCardListeners(cards)

    })
  }

  #getPlayerCards(playerName) {
    const playerElement = document.querySelector(`player-box[player-name="${playerName}"]`)
    
    if (!playerElement) {
      throw new Error('Element not found for player: ' + playerName)
    }
    
    return playerElement.getCardElements()
  }

  #addCardListeners(cards) {
    cards.forEach(card => {
      card.addEventListener('click', this.cardClickListener)
    })
  }

  #removeCardListeners(cards) {
    cards.forEach(card => {
      card.removeEventListener('click', this.cardClickListener)
    })
  }
}
