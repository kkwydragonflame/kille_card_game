# Kille Card Game Rules

## Objective
The goal is to win the game by strategically playing cards from your hand and be the last man standing by scoring the lowest points.

You will compete against three computer-controlled opponents. The player who played the highest valued card each round will be the starting player for next round.

## How to Play

1. Each player is dealt 5 cards.
   
2. On your turn, select a card to play from your hand by entering its corresponding number:
    - **2a.** If no cards have been played yet in the round, you can choose any card from your hand.
    - **2b.** If there are already cards on the table, you can only play a card that is equal to or higher than the highest-valued card in play.
    - **2c.** If you cannot play any valid card, you must sacrifice the lowest card in your hand.

3. The AI opponents will automatically select their cards based on predefined logic.

4. When all players are down to their last card, the game will ask each player, in turn, if they believe they hold the lowest-valued card:
    - **4a.** As soon as a player claims they hold the lowest card, everyone will reveal their last card.
    - **4b.** If no one claims to hold the lowest card, the round restarts with a new set of cards.


## Scoring
Points are tallied at the end of each round and added to your score from previous rounds.

Points are calculated as follows:

- If the player who claimed to hold the lowest card is **correct**, they receive **0 points** for that round.  
  All other players receive points equal to the value of the last card they are holding.

- If the player who claimed to hold the lowest card is **incorrect**, they receive points equal to the value of their card, **plus 5 penalty points**.  
  All other players receive **0 points** for the round.

- The points from each round are added to your overall score. If your total score exceeds **21 points**, you receive a **strike**, and your score is reset to match the highest score of any player who is still below 21.

- A player is eliminated after receiving **3 strikes**.

## Winning

There are two ways to win the game:

1. **Last Player Standing**: All other players have received 3 strikes and have been eliminated.
   
2. **Single Survivor**: If all players except one receive a strike in the same round, the remaining player wins the game.

