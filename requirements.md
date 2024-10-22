# **Requirements Specification for Kille Card Game (Console App)**

## **1. Introduction**

The app is a console-based application that implements the Swedish card game **Kille**. The primary functionality is that one player competes against three computer-controlled opponents. The player makes decisions based on their hand, while the computer selects its moves using a built-in algorithm.

The goal of the project is to create a modular application where the user interface (UI) can be easily swapped, for example, to a graphical user interface (GUI) in the future.

---

## **2. Functional Requirements**

### **2.1 Game Mechanics**
- The game must follow the rules of the Kille card game, where one human player competes against three AI players.
- The player must be able to see the cards in their hand and choose which card to play in each round.
- The AI players must have an algorithm that automatically selects which card to play based on simple logic for each round.
- The game should keep track of scores and determine the winner according to the Kille rules.

### **2.2 Player Interaction**
- The player must be able to interact with the game through console commands (e.g., selecting cards, quitting the game, etc.).
- The player should receive feedback on which cards have been played in each round.

### **2.3 AI Players**
- The AI players should use an algorithm to select a card to play. The algorithm can be simple and does not need to mimic a human player's strategy.
- The algorithm can be based on basic rules such as always playing the lowest card or randomly choosing a valid card to play.

### **2.4 Modular Interface**
- The application should be built in such a way that the console UI can easily be replaced by other types of interfaces (e.g., a graphical UI).
- The game logic should be separated from the UI layer so that only the user interaction needs to be adjusted when changing the UI.

### **2.5 Game Start and End**
- The player should be able to start a new game from the console.
- The player should be able to exit the game at any time via a console command.

---

## **3. Non-Functional Requirements**

### **3.1 Usability**
- The commands should be intuitive and easy for the user to understand.
- The app should have a clear and simple console structure, so the player can easily see their options and receive feedback from the game.
- The app should supply the user with a documentation of the rules.

### **3.2 Maintainability**
- There should be documentation explaining how to replace the user interface and how the core game logic operates.

---

## **4. System Requirements**

### **4.1 Programming Language**
- The application should be written in JavaScript.

---

## **5. Future Improvements (Not included in version 1.0)**

- Support for multiplayer where multiple players can compete against each other in real-time.
- Graphical user interface (GUI) for a more user-friendly experience.
- Ability to play over a network against other players online.
- Adding platform support so the application is able to run in a terminal/console environment on all major operating systems (Windows, macOS, Linux).

