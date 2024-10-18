import EventEmitter from 'events'

export class ConsoleInputHandler extends EventEmitter {
  displayMessage(message) {
    console.log(message)
  }

  waitForUserInput() {
    // This is a placeholder for the actual implementation.
    // Need to print out the cards in the player's hand and prompt the user to choose a card.
    // Print out the cards array and attach a number to each card.
    // Need to return the card the user chose, by the number attached to the card.
    // Need to handle invalid input, if the user chooses a number that is not presented.
  }
}