export class AiPlayStrategy {
  chooseCardToPlay(eligibleCards) {
    const cardsToChooseFrom = []
    
    cardsToChooseFrom.push(card => eligibleCards.includes(card))

    const index = Math.floor(Math.random() * cardsToChooseFrom.length)

    return chosenCard = cardsToChooseFrom[index]
  }
}