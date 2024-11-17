import { ConsoleInputHandler } from '../src/js/ConsoleInputHandler.js'
import readlineSync from 'readline-sync'
import { jest, describe, beforeEach, test, expect } from '@jest/globals'

describe('ConsoleInputHandler', () => {
  let inputHandler

  beforeEach(() => {
    inputHandler = new ConsoleInputHandler()
    jest.spyOn(readlineSync, 'question').mockImplementation(() => '1')
    jest.spyOn(readlineSync, 'keyInYNStrict').mockImplementation(() => true)
  })

  const mockCards = [
    { rank: 1, valueOf: () => 1 },
    { rank: 2, valueOf: () => 2 },
    { rank: 3, valueOf: () => 3 }
  ]

  test('should wait for user input and return chosen card', () => {
    const chosenCard = inputHandler.waitForUserInput(mockCards)
    expect(chosenCard).toEqual(mockCards[0])
  })

  test('should ask if player has the lowest card', () => {
    const hasLowestCard = inputHandler.askIfHasLowestCard()
    expect(hasLowestCard).toBe(true)
  })

  test('should display choice message', () => {
    console.log = jest.fn()
    inputHandler.displayChoiceMessage(mockCards)
    expect(console.log).toHaveBeenCalledWith('Choose a card to play.')
  })

  test('should display card not valid message', () => {
    console.log = jest.fn()
    inputHandler.displayCardNotValid()
    expect(console.log).toHaveBeenCalledWith('Card is not a valid choice. Please select again.')
  })

  test('should display must play lowest card message', () => {
    console.log = jest.fn()
    inputHandler.displayMustPlayLowestCard()
    expect(console.log).toHaveBeenCalledWith('\nYou must play your lowest card.')
  })
})
