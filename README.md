# Kille Card Game Console App

## Overview

This is a console-based implementation of the Swedish card game [**Kille**](https://en.wikipedia.org/wiki/Kille_(card_game)), where one human player competes against three AI opponents. The game is designed to follow the basic rules of Kille, allowing the player to choose which card to play while the AI players select their moves through a predefined algorithm.

The app is modular and built to easily support different types of user interfaces, making it possible to extend the project into a graphical user interface (GUI) or other formats in the future.

## Features

- Single-player game against three AI opponents.
- AI players make decisions based on a simple algorithm.
- Modular design allows for the user interface to be swapped out in the future. See [Switching to different UI](#switching-to-different-ui).

## Installation

To install and run the game, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kkwydragonflame/kille-card-game.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the game**
   ```bash
   npm start
   ```

## How to Play

1. **Objective**: 
   The goal is to win the game of Kille by playing strategically against three computer-controlled players. The game proceeds in rounds where each player plays a card from their hand.

2. **Player Turn**: 
   - The player will be presented with a list of cards in their hand.
   - Type the number corresponding to the card you want to play.

3. **AI Turns**: 
   - The AI players will automatically select their cards based on a predefined algorithm.

4. **Winning the Game**: 
   The game tracks scores, and the winner is determined according to standard Kille rules.


### Rules

Rules have been added to a separate document for ease of use importing to different UIs.

See [Rules](rules.md)

## Future Improvements

- **Multiplayer Support**: Ability to play with multiple human players.
- **Graphical User Interface (GUI)**: A visual version of the game for a more user-friendly experience.

## Switching to different UI

Simply use the KilleGame and ConsoleInputHandler files as templates, providing the same named methods with updated logic, to implement whichever UI you prefer.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. All contributions are welcome!

1. Fork the project.
2. Create a feature branch.
3. Submit a pull request.

## License

This project is licensed under the __[MIT License](https://en.wikipedia.org/wiki/MIT_License)__.  
See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to contact me at:
- **GitHub**: [your-username](https://github.com/your-username)
