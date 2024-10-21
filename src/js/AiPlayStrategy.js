export class AiPlayStrategy {
  chooseCardToPlay(eligibleCards, cardsInHand) {
    let validChoice = false
    let AiCardChoice = null

    while (!validChoice) {
      AiCardChoice = cardsInHand[Math.floor(Math.random() * cardsInHand.length)]

      if (eligibleCards.includes(AiCardChoice)) {
        validChoice = true
      }
    }

    return AiCardChoice
  }
}
