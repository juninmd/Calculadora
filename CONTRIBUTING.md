# Contributing to Calculadora

Thank you for considering contributing to Calculadora! Please read this document to understand our development workflow and how to contribute effectively.

## Development Workflow

1. Fork the repository
2. Create a new branch from `develop` for your feature or fix
3. Make your changes
4. Ensure all tests pass and code follows linting rules
5. Submit a pull request to the `develop` branch

## CI/CD Pipeline

Our project uses GitHub Actions for continuous integration and deployment. The pipeline runs on every push and pull request to `main` and `develop` branches.

### Stages

1. **Lint**: Runs tslint and prettier to ensure code quality and formatting
2. **Type Check**: Validates TypeScript correctness
3. **Security**: Scans for dependency vulnerabilities
4. **Test**: Runs unit tests with Karma/Jasmine (80%+ coverage goal) and end-to-end tests
5. **Build**: Creates a production build with source maps and optimization
6. **Deploy**: Deploys to staging for PRs targeting main branch, production deployment requires manual approval on main branch pushes

### Quality Gates

- Minimum 80% code coverage
- No linting errors
- No TypeScript errors
- Successful security scan
- Successful build
- Passing unit and end-to-end tests

## Reporting Issues

Please use the GitHub issue tracker to report bugs or suggest features. When reporting a bug, include:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## Code Style

We follow the Angular Style Guide and use tslint for code quality. Please ensure your code:
- Passes the linter (`npm run lint`)
- Follows TypeScript best practices
- Includes appropriate comments for complex logic

## Testing

- Write unit tests for new components and services
- Aim for 80%+ code coverage
- Run tests locally before submitting: `npm test`
- End-to-end tests can be run with: `npm run e2e`

## Commit Messages

We follow conventional commits format:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Build process or auxiliary tool changes

Example: `feat: add loan calculator component`

## Licensing

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out by opening an issue or contacting the maintainers.