Considered refactoring ai players to use same strategy to save resources, but kept as separate as keeps encapsulation, follows OCP, avoids hidden dependencies, follows SRP and promotes testability.

dealCards method in CardTable could easily be refactored into a more general method that takes the number of cards to deal as a parameter. This would make it less tied to this implementation and able to be reused in other code.

Refactored playCard method and moved logic into the separate strategies to better comply with SRP.

AiPlayStrategy now follows Meaningful Names, SRP, consistent formatting, DRY. Atm the algorithm is very stupid and choosing cards on random, which means it does not make a very tactical choice in cards to play. This is an area for improvement.

Refactored HumanPlayStrategy to better follow SRP, descriptive naming, early returns and SOC.

Had major struggles getting the readline async to work without having to have the entire calling chain set as async, as that would violate higher level code needing to know internal structure of lower level modules.
To keep from having the entire calling chain marked async. Had to switch package in the end, to readline-sync.

Things missing;

* Logic for playing another game without having to restart.
* Logic for win scenario 2.



First structure

## Chapter 2: Meaningful Names
The emphasis on intention-revealing names has significantly influenced my approach to naming in code. I’ve started prioritizing clear and descriptive names for classes and methods, which enhances readability and understanding. It might take a bit more time, but the added benefit of not having to look up what a certain function does makes for a much easier development process and error handling.

Changed playCards to playTurns, in my mind this makes it clearer. Each player get a turn, and a round consists of each players turn. Enabled me to have separate logic for what happens at the end of each players turn, and the end of the entire round.

## Chapter 3: Functions
The principle of keeping functions small and focused has prompted me to refactor several long methods into smaller, more manageable ones. This practice not only makes my code easier to understand but also simplifies debugging. I feel more able to keep track of what I myself am doing, and what my code is doing, since I can split it into smaller parts which gives greater focus. I have also taken to giving some time to keeping functions at the same abstraction level, as I feel this also helps me with development and bug hunting.

Example, refactored each strategy into smaller functions. Could probably do more.

## Chapter 4: Comments
This chapter has made me realize the importance of writing self-documenting code. I now strive to make my code clear enough that it requires minimal comments, preferrably none at all, but reality is seldom that perfect. While I was very used to adding comments to everything to explain logic (even stuff I felt was self-explanatory), I’ve learned that good naming and structure can often eliminate the need for them. It almost felt like a freedom, not having to add comments to everything.

## Chapter 5: Formatting
I cannot say that this chapter on formatting has influenced my coding style greatly, since I was already very used to following LNU's Eslint which promotes a good approach (not perfect, but good). But is has given me a greater understanding of formatting, and what can be considered good and bad formatting, so now I do pay careful attention to indentation, line length, and spacing, ensuring my code is visually appealing and easier to read. I have taken to heart the ordering of methods, and am keeping The Newspaper Metaphor close in mind at all times.

## Chapter 6: Objects and Data Types
I wish I could say that understanding the significance of appropriate data types and object-oriented principles has shaped how I design my classes. I can say that this chapter has given me a much greater understanding of different data types, but putting this understanding into action will take some more practice on my part.

## Chapter 7: Error Handling
This chapter emphasizes the need to handle errors meaningfully rather than ignoring them, as error handling is a critical aspect of robust code. I’ve shifted from using generic error messages or error codes to more descriptive ones that help identify issues quickly. This approach has made debugging much more straightforward and has improved the overall user experience by providing clearer feedback. Providing clear error messages and separating logic from error handling are key takeaways from this chapter. That said, I feel I have not been great at putting all this into practice, as my error handling is very much still all over the place <------ Change this sentence.

## Chapter 8: Unit Testing
This chapter reinforced the necessity of unit testing in my development workflow. I’ve realized how well-written tests can provide security during development, and I wish to aim to make my tests as clear and informative as the code itself. I do find it fun to write tests, especially automated tests, but I often feel that my current knowledge is a bit lacking as in I need to learn more about testing framework and functions. More often than I'd like I add some tests after writing the actual code.
<-------------------Look over this paragraph

## Chapter 9: Scalability and Performance
Scalability: I've tried to make it so that the core logic of the game can easily be ported to other UIs, with a simple switch of two handlers.

## Chapter 10: Design and Architecture
I've adopted the Strategy Pattern for the card chosing logic for the different players.

## Chapter 11: Lessons
