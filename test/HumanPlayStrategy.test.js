import { HumanPlayStrategy } from '../src/js/HumanPlayStrategy'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('HumanPlayStrategy', () => {
  let mockInputHandler
  let humanPlayStrategy

  beforeEach(() => {
    mockInputHandler = {
      waitForUserInput: jest.fn(),
      displayMessage: jest.fn()
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
    // Simulate user choosing the first card
    mockInputHandler.waitForUserInput.mockResolvedValue(mockCards[11])

    const chosenCard = humanPlayStrategy.chooseCardToPlay(mockEligibleCards, mockCards)

    expect(chosenCard).toEqual(mockCards[0])
  })

  test('should prompt again if an invalid card is chosen', () => {
    mockInputHandler.waitForUserInput
      .mockResolvedValueOnce(mockCards[0]) // First choice is invalid
      .mockResolvedValueOnce(mockCards[1]) // Second choice is valid

    const chosenCard = humanPlayStrategy.chooseCardToPlay(mockEligibleCards, mockCards)

    expect(chosenCard).toEqual(mockCards[1])
  })
})
