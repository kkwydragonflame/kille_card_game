import { AiPlayStrategy } from '../src/js/AiPlayStrategy.js'
import { beforeEach, describe, test, expect } from '@jest/globals'

describe('AiPlayStrategy', () => {
  let aiPlayStrategy

  beforeEach(() => {
    aiPlayStrategy = new AiPlayStrategy()
  })

  const mockCards = [
    { rank: 1, valueOf: () => 1 },
    { rank: 2, valueOf: () => 2 },
    { rank: 3, valueOf: () => 3 }
  ]

  test('should play lowest card if no eligible cards', () => {
    const chosenCard = aiPlayStrategy.chooseCardToPlay([], mockCards)
    expect(chosenCard).toEqual(mockCards[0])
  })

  test('should choose a random card from eligible cards', () => {
    const eligibleCards = [mockCards[1], mockCards[2]]
    const chosenCard = aiPlayStrategy.chooseCardToPlay(eligibleCards, mockCards)
    expect(eligibleCards).toContain(chosenCard)
  })

  test('should randomly decide if it has the lowest card', () => {
    const hasLowestCard = aiPlayStrategy.askIfHasLowestCard()
    expect(typeof hasLowestCard).toBe('boolean')
  })
})
