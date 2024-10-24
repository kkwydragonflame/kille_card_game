import { CardTable } from '../src/js/CardTable.js'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('CardTable', () => {
  let mockDeck
  let mockPlayers
  let onCardPlayed
  let onRoundOver
  let cardTable

  beforeEach(() => {
    mockDeck = {
      shuffle: jest.fn(),
      dealCard: jest.fn()
    }
    mockPlayers = [
      {
        name: 'Player 1',
        playCard: jest.fn(),
        addCardToHand: jest.fn()
      },
      {
        name: 'Player 2',
        playCard: jest.fn(),
        addCardToHand: jest.fn()
      },
      {
        name: 'Player 3',
        playCard: jest.fn(),
        addCardToHand: jest.fn()
      }
    ]
    onCardPlayed = jest.fn()
    onRoundOver = jest.fn()
    cardTable = new CardTable(mockDeck, mockPlayers, onCardPlayed, onRoundOver)
  })

  test('should shuffle deck when playing a round', () => {
    cardTable.playRound()

    expect(mockDeck.shuffle).toHaveBeenCalled()
  })

  test('should deal cards to players when playing a round', () => {
    cardTable.playRound()

    expect(mockDeck.dealCard).toHaveBeenCalledTimes(15)
  })

  test.todo('verify that cards are dealt to players')

  test('should play cards in order of player index', () => {
    mockPlayers.forEach((player, index) => {
      player.playCard.mockReturnValue({ rank: index + 1 })
    })

    cardTable.playRound()

    expect(mockPlayers[0].playCard).toHaveBeenCalled()
    expect(mockPlayers[1].playCard).toHaveBeenCalled()
    expect(mockPlayers[2].playCard).toHaveBeenCalled()
  })

  test('should call onCardPlayed for each card played', () => {
    mockPlayers.forEach((player, index) => {
      player.playCard.mockReturnValue({ rank: index + 1 })
    })

    cardTable.playRound()

    expect(onCardPlayed).toHaveBeenCalledTimes(mockPlayers.length)
  })

  test('should randomly select a starting player if no previous round winner', () => {
    const randomIndex = 0
    Math.random = jest.fn().mockReturnValue(randomIndex)

    cardTable.playRound()

    expect(mockPlayers[randomIndex].playCard).toHaveBeenCalled()
  })

  test('should select previous round winner as starting player', () => {
    const previousRoundWinner = mockPlayers[1]
    cardTable.playRound(previousRoundWinner)

    expect(mockPlayers[1].playCard).toHaveBeenCalled()
  })

  test('should ensure that player index wraps around', () => {
    const startingPlayer = mockPlayers[1]
    cardTable.playRound(startingPlayer)

    expect(mockPlayers[0].playCard).toHaveBeenCalled()
  })

  test.todo('should call onRoundOver when all players have played all but one card')

  test.todo('should check win conditions on round over')

  test.todo('should announce winner on game end')
})
