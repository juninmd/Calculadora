# Contributing to Calculadora

Thank you for considering contributing to Calculadora! Please follow these guidelines to help us maintain a high-quality codebase.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/Calculadora.git`
3. Install dependencies: `npm install`
4. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`

## Code Style

- We use TypeScript with Angular conventions.
- Please run the linter before submitting: `npm run lint`
- We follow the Angular style guide: https://angular.io/guide/styleguide

## Testing

- All new features must include unit tests.
- Run unit tests: `npm test`
- Run end-to-end tests: `npm run e2e`
- We aim for at least 80% code coverage.

## Pull Request Process

1. Ensure your code passes the linter and tests.
2. Update the README.md if needed for new features.
3. The pull request will be reviewed by at least one maintainer.
4. Once approved, your PR will be merged into the `develop` branch.
5. After testing in `develop`, maintainers will merge to `main` for release.

## CI/CD Pipeline

Our CI/CD pipeline runs on GitHub Actions and includes:

- **Linting**: Checks code style and potential errors.
- **Testing**: Runs unit and end-to-end tests with coverage reporting.
- **Building**: Creates production-ready builds.
- **Deployment**: Automatically deploys to staging on PR merge to `develop`, and to production on merge to `main` (with manual approval).

### Pipeline Status

You can see the status of the pipeline for each branch:
- [![CI/CD Pipeline](https://github.com/juninmd/Calculadora/actions/workflows/ci.yml/badge.svg)](https://github.com/juninmd/Calculadora/actions/workflows/ci.yml)

## Reporting Issues

Please use the GitHub issue tracker to report bugs or request features. Include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.