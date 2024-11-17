import { HumanPlayStrategy } from '../src/js/HumanPlayStrategy'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('HumanPlayStrategy', () => {
  let mockInputHandler
  let humanPlayStrategy

  beforeEach(() => {
    mockInputHandler = {
      waitForUserInput: jest.fn(),
      displayChoiceMessage: jest.fn(),
      askIfHasLowestCard: jest.fn(),
      displayCardNotValid: jest.fn(),
      displayMustPlayLowestCard: jest.fn()
    }
    humanPlayStrategy = new HumanPlayStrategy(mockInputHandler)
  })

  const mockCards = [
    { rank: 1, valueOf: () => 1 },
    { rank: 2, valueOf: () => 2 },
    { rank: 3, valueOf: () => 3 }
  ]

  const mockEligibleCards = [
    { rank: 2, valueOf: () => 2 },
    { rank: 3, valueOf: () => 3 }
  ]

  test('should return chosen card if it is valid', () => {
    // Simulate user choosing the first valid card
    mockInputHandler.waitForUserInput.mockReturnValue(mockEligibleCards[0])

    const chosenCard = humanPlayStrategy.chooseCardToPlay(mockEligibleCards, mockCards)

    expect(chosenCard).toEqual(mockEligibleCards[0])

    expect(mockInputHandler.displayChoiceMessage).toHaveBeenCalledWith(mockEligibleCards)
  })

  test('should prompt again if an invalid card is chosen', () => {
    mockInputHandler.waitForUserInput
      .mockReturnValueOnce(mockCards[0]) // First choice is invalid
      .mockReturnValueOnce(mockEligibleCards[1]) // Second choice is valid

    const chosenCard = humanPlayStrategy.chooseCardToPlay(mockEligibleCards, mockCards)

    expect(chosenCard).toEqual(mockEligibleCards[1])

    expect(mockInputHandler.displayCardNotValid).toHaveBeenCalled()
  })

  test('should prompt to play lowest card if no eligible cards', () => {
    const lowestCard = mockCards[0]

    mockInputHandler.waitForUserInput
      .mockReturnValueOnce(mockCards[1]) // First choice is invalid
      .mockReturnValueOnce(lowestCard) // Second choice is the lowest card

    const chosenCard = humanPlayStrategy.chooseCardToPlay([], mockCards)

    expect(chosenCard).toEqual(lowestCard)

    expect(mockInputHandler.displayMustPlayLowestCard).toHaveBeenCalled()
  })

  test('should ask if player has the lowest card', () => {
    mockInputHandler.askIfHasLowestCard.mockReturnValue(true)

    const hasLowestCard = humanPlayStrategy.askIfHasLowestCard()

    expect(hasLowestCard).toBe(true)
    expect(mockInputHandler.askIfHasLowestCard).toHaveBeenCalled()
  })
})
