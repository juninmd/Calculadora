```markdown
# AGENTS.md - Guidelines for AI Coding Agents

These guidelines outline the principles and expectations for all development of AGENTS.md. Adherence to these will ensure a maintainable, robust, and effective codebase.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent should have a single, well-defined purpose. Avoid creating multiple agents with overlapping functionalities.
*   **Component Reusability:** Design agents with standardized components that can be reused across multiple projects.
*   **Abstraction:**  Introduce abstractions to hide complex implementation details and allow for easier modification and evolution of agent functionalities.
*   **Code Patterns:** Favor established code patterns (e.g., data structures, algorithms) over custom implementation whenever possible.

## 2. KISS (Keep It Simple, Stupid)

*   **Minimize Complexity:** Strive for clarity and simplicity in design. Avoid unnecessary layers or intricate logic.
*   **Easy to Understand:**  Code should be easily readable and understandable by other developers (including your future self).
*   **Well-Commented:** Provide clear and concise comments explaining the *why* behind the code, not just the *what*.

## 3. SOLID Principles

*   **Single Responsibility:**  As per DRY, each class/agent should have a single, cohesive responsibility.
*   **Open/Closed Principle:**  The agent's functionality should be open for extension but closed for modification. This necessitates well-defined interfaces.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients should not be required to know about methods they do not use.
*   **Dependency Inversion Principle:**  High-level modules (agents) should not depend on low-level modules.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Avoid Unnecessary Code:** Do not implement functionalities you don't currently need.  Refactor away unnecessary code.
*   **Focus on Core Requirements:** Prioritize implementing the essential functionalities needed for the agent's initial tasks.
*   **Future-Proofing:**  Consider potential future requirements when designing agents; don't over-engineer for anticipated changes.

## 5. Development Workflow & Code Quality

*   **Unit Tests:** Write comprehensive unit tests to cover all critical functionalities.  Aim for 80%+ test coverage.
*   **Code Reviews:**  All code must undergo rigorous code reviews by at least two other developers.
*   **Static Analysis:** Utilize static analysis tools (e.g., SonarQube, pylint) to identify potential issues like code style violations and bugs.
*   **Version Control:**  Use Git for version control and adhere to established branching strategies.
*   **Documentation:** Provide clear and concise documentation for all agents, including usage instructions and API specifications (if applicable).
*   **Error Handling:** Implement robust error handling and logging.
*   **Code Formatting:**  Consistent code formatting (e.g., using a linter) enhances readability.

## 6. File Size & Structure

*   **Maximum File Size:**  180 lines of code.
*   **File Organization:**  Organize files logically using descriptive names and consistent directory structures.
*   **Modular Design:**  Break down large files into smaller, manageable modules.
*   **Dependency Management:** Clearly define and manage dependencies between files using a module system (if applicable).

## 7. Test Coverage Requirements

*   **Target Coverage:**  Achieve at least 80% test coverage for all agents and key functionalities.
*   **Test Case Design:** Each test case should cover multiple scenarios and edge cases.
*   **Test Data Management:**  Provide realistic and diverse test data.

## 8. Specific Considerations for AGENTS.md

*   **Repository Structure:** Follow a well-defined repository structure to promote maintainability.
*   **API Design:**  If the AGENTS.md acts as an API, define a clear API specification.
*   **Data Models:**  If relevant, define data models for agents and their related data.

## 9.  Constraints

*   **Language:**  Specify the programming language used for agent development (e.g., Python, JavaScript).
*   **Frameworks:**  If applicable, specify the framework being utilized (e.g., Flask, Django, React).
*   **Specific Algorithms:** Define any constraints on algorithms used for agent behavior.

```