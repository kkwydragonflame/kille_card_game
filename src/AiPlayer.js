export class AiPlayer extends Player {
  constructor(name) {
    super(name)
  }

  chooseCardToPlay(eligibleCards) {
    const cardsToChooseFrom = this.cards.push(card => card.rank >= highestCard.rank)

    const index = Math.floor(Math.random() * cardsToChooseFrom.length)

    return chosenCard = cardsToChooseFrom[index]
  }
}