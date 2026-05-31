# Calculadora

![CI/CD Pipeline](https://github.com/juninmd/Calculadora/actions/workflows/ci.yml/badge.svg)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.
The pipeline includes:
- **Linting**: Code quality checks using tslint
- **Type Checking**: Ensures TypeScript correctness
- **Security**: Dependency vulnerability scanning
- **Testing**: Unit tests with Karma/Jasmine (80%+ coverage goal) and end-to-end tests
- **Building**: Production build with source maps and optimization
- **Deployment**: Automatic deployment to staging for PRs targeting main, manual approval for production

### Required Secrets
To enable the full CI/CD pipeline, the following repository secrets must be configured:

- `CODECOV_TOKEN`: Token for uploading coverage reports to Codecov
- `SLACK_WEBHOOK_URL`: Webhook URL for Slack notifications on deployment status

## Contributing
Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code review process, CI/CD pipeline, and development workflow.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
