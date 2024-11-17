import { CardTable } from '../src/js/CardTable.js'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('CardTable', () => {
  let mockDeck
  let mockPlayers
  let mockGameInstance
  let cardTable

  beforeEach(() => {
    mockDeck = {
      shuffle: jest.fn(),
      dealCard: jest.fn().mockReturnValue({ valueOf: () => Math.floor(Math.random() * 13) + 1 })
    }
    mockPlayers = [
      {
        name: 'Player 1',
        playCard: jest.fn(),
        addCardToHand: jest.fn(),
        cards: []
      },
      {
        name: 'Player 2',
        playCard: jest.fn(),
        addCardToHand: jest.fn(),
        cards: []
      },
      {
        name: 'Player 3',
        playCard: jest.fn(),
        addCardToHand: jest.fn(),
        cards: []
      }
    ]
    mockGameInstance = {
      displayRoundCounter: jest.fn(),
      displayTurnCounter: jest.fn(),
      restartingRound: jest.fn(),
      showPlayerScore: jest.fn(),
      onCardPlayed: jest.fn(),
      onTurnOver: jest.fn(),
      revealPlayerCards: jest.fn(),
      onCardRevealed: jest.fn(),
      lowestCardClaimed: jest.fn(),
      onPlayerReceivingStrike: jest.fn(),
      onPlayerEliminated: jest.fn(),
      onGameEnd: jest.fn()
    }
    cardTable = new CardTable(mockDeck, mockPlayers, mockGameInstance)
  })

  test.todo('should shuffle deck when playing a round')

  test.todo('should deal 5 cards to each player when playing a round')

  test.todo('should verify that cards are dealt to players')

  test.todo('should play cards in order of player index')

  test.todo('should call onCardPlayed for each card played')

  test.todo('should select previous round winner as starting player')

  test.todo('should ensure that player index wraps around')

  test.todo('should add penalty points to player who wrongly claimed lowest card')

  test.todo('should check win conditions on round over')

  test.todo('should announce winner on game end')
})
