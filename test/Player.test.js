import { Player } from '../src/js/Player.js'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('Player', () => {
  let player
  let mockPlayStrategy

  beforeEach(() => {
    mockPlayStrategy = {
      chooseCardToPlay: jest.fn(),
      askIfHasLowestCard: jest.fn()
    }
    player = new Player('Test Player', mockPlayStrategy)
  })

  test('should initialize with correct name and empty hand', () => {
    expect(player.name).toBe('Test Player')
    expect(player.cards).toEqual([])
    expect(player.points).toBe(0)
    expect(player.strikeCount).toBe(0)
  })

  test('should add card to hand', () => {
    const card = { rank: 1, valueOf: () => 1 }
    player.addCardToHand(card)
    expect(player.cards).toContain(card)
  })

  test('should remove card from hand', () => {
    const card = { rank: 1, valueOf: () => 1 }
    player.addCardToHand(card)
    player.removeCardFromHand(card)
    expect(player.cards).not.toContain(card)
  })

  test('should play a card using play strategy', () => {
    const card = { rank: 1, valueOf: () => 1 }
    player.addCardToHand(card)
    mockPlayStrategy.chooseCardToPlay.mockReturnValue(card)
    const playedCard = player.playCard(null)
    expect(playedCard).toBe(card)
    expect(mockPlayStrategy.chooseCardToPlay).toHaveBeenCalled()
  })

  test('should add points to player', () => {
    player.addPoints(5)
    expect(player.points).toBe(5)
  })

  test('should add strike to player', () => {
    player.addStrike()
    expect(player.strikeCount).toBe(1)
  })

  test('should throw error if points set to invalid value', () => {
    expect(() => {
      player.points = -1
    }).toThrow('Points must be a positive integer.')
  })
})
