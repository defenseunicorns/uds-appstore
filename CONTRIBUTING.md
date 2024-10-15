# Welcome to The Airgap App Store

Thank you for your interest in Defense Unicorns Airgap App Store!

This document describes the process and requirements for contributing to this project.

If you are looking to contribute a new package, please refer to the [UDS Common](https://github.com/defenseunicorns/uds-common/blob/main/README.md) and Package Badging process

## Table of Contents

- [Welcome to The Airgap App Store](#welcome-to-the-airgap-app-store)
  - [Table of Contents](#table-of-contents)
  - [Developer Experience](#developer-experience)
  - [Definition of Done](#definition-of-done)
  - [Submitting a Pull Request](#submitting-a-pull-request)
    - [PR Requirements](#pr-requirements)
  - [Contact](#contact)
  - [Development](#development)
  - [App Store Package Metadata](#app-store-package-metadata)
    - [Creating Metadata for a new package](#creating-metadata-for-a-new-package)

## Developer Experience

Continuous Delivery is core to our development philosophy. Check out [https://minimumcd.org](https://minimumcd.org) for a good baseline agreement on what that means.

Specifically:

* We do trunk-based development (main) with short-lived feature branches that originate from the trunk, get merged into the trunk, and are deleted after the merge
* We don't merge code into main that isn't releasable
* We perform automated testing on all changes before they get merged to main
* Continuous integration (CI) pipeline tests are definitive
* We create immutable release artifacts

## Definition of Done

We apply these general principles to all User Stories and activities contributing to the UDS.

* Automated continuous integration (CI) pipeline tests pass
* CI pipeline tests have been updated to meet system changes
* Changes are peer reviewed
* Acceptance criteria is met
* Documentation is updated to reflect what changed

## Submitting a Pull Request

1. **Create an Issue**: For significant changes, please create an issue first, describing the problem or feature proposal. Trivial fixes do not require an issue.
2. **Commit Your Changes**: Make your changes and commit them. All commits must be signed.
3. **Run Tests**: Ensure that your changes pass all tests.
4. **Push Your Branch**: Push your branch to your fork on GitHub.
5. **Create a Pull Request**: Open a pull request against the `main` branch of the Bundle repository. Please make sure that your PR passes all CI checks. We use squash commits and default to the PR title for the commit message (it should be formatted in conventional commits style)

### PR Requirements

* PRs must be against the `main` branch.
* PRs must pass CI checks.
* All commits must be signed.
* PRs should have a related issue, except for trivial fixes.

## Contact

For any questions or concerns, please open an issue on GitHub or contact the maintainers.

## Development

see [developer.md](developer.md)

## App Store Package Metadata

### Creating Metadata for a new package

1. Copy the marketing material from the package's homepage or relevant section.
2. Use the [sample prompt](./docs/contributing/sample-prompt.md) in ChatGPT, appending the content from step 1.
3. Save the generated output in a new file: apps/[package-name].yaml. Review and verify for accuracy.
4. Open a Pull Request with the new file.
