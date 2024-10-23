Considered refactoring ai players to use same strategy to save resources, but kept as separate as keeps encapsulation, follows OCP, avoids hidden dependencies, follows SRP and promotes testability.

dealCards method in CardTable could easily be refactored into a more general method that takes the number of cards to deal as a parameter. This would make it less tied to this implementation and able to be reused in other code.

Refactored playCard method and moved logic into the separate strategies to better comply with SRP.