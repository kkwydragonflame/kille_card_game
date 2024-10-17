import EventEmitter from 'events'

// Change name to BrowserInputHandler
export class HumanPlayerInputHandler extends EventEmitter {
  displayMessage(message) {
    console.log(message)
  }

  waitForUserInput(eligibleCards, playerName) {
    return new Promise(resolve => {

      const cards = this.#getPlayerCards(playerName)

      this.#addCardListeners(cards)

      this.cardClickListener = event => {
        const card = event.target
        if (eligibleCards.includes(card)) {
          this.#removeCardListeners(cards)
          resolve(card)
        }
      }
    })
  }

  #getPlayerCards(playerName) {
    const playerElement = document.querySelectorAll('player-box').find(playerBox => playerBox.playerName === playerName)
    
    if (!playerElement) {
      throw new Error('Element not found for player: ' + playerName)
    }
    
    return playerElement.shadowRoot.querySelectorAll('.playerCards img')
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