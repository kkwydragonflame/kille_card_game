Considered refactoring ai players to use same strategy to save resources, but kept as separate as keeps encapsulation, follows OCP, avoids hidden dependencies, follows SRP and promotes testability.

dealCards method in CardTable could easily be refactored into a more general method that takes the number of cards to deal as a parameter. This would make it less tied to this implementation and able to be reused in other code.

Refactored playCard method and moved logic into the separate strategies to better comply with SRP.

AiPlayStrategy now follows Meaningful Names, SRP, consistent formatting, DRY. Atm the algorithm is very stupid and choosing cards on random, which means it does not make a very tactical choice in cards to play. This is an area for improvement.

Refactored HumanPlayStrategy to better follow SRP, descriptive naming, early returns and SOC.