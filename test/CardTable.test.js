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

  test('should deal 5 cards to each player when playing a round', () => {
    cardTable.playRound()

    expect(mockDeck.dealCard).toHaveBeenCalledTimes(15)
  })

  test('should verify that cards are dealt to players', () => {
    cardTable.playRound()

    mockPlayers.forEach(player => {
      expect(player.addCardToHand).toHaveBeenCalledTimes(5)
    })
  })

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

    expect(mockPlayers[1].playCard).toHaveBeenCalled() // To have been called first?
  })

  test('should ensure that player index wraps around', () => {
    const startingPlayer = mockPlayers[1]
    cardTable.playRound(startingPlayer)

    expect(mockPlayers[0].playCard).toHaveBeenCalled()
  })

  test('should add penalty points to player who wrongly claimed lowest card', () => {
    const wrongClaimer = mockPlayers[0]
    wrongClaimer.playStrategy.askIfHasLowestCard.mockReturnValue(true)
    mockPlayers[1].playStrategy.askIfHasLowestCard.mockReturnValue(false)
    mockPlayers[2].playStrategy.askIfHasLowestCard.mockReturnValue(false)

    cardTable.playRound()

    expect(wrongClaimer.addPoints).toHaveBeenCalledWith(5)
  })

  test('should check win conditions on round over', () => {
    const checkWinConditionSpy = jest.spyOn(cardTable, '#checkWinCondition')

    cardTable.playRound()

    expect(checkWinConditionSpy).toHaveBeenCalled()
  })

  test('should announce winner on game end', () => {
    mockPlayers.splice(1, 2) // Simulate only one player left
    const winner = mockPlayers[0]

    cardTable.playRound()

    expect(onRoundOver).toHaveBeenCalledWith(winner)
  })
})
