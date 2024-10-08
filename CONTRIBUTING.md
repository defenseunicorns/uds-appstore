# Welcome to UDS Marketplace

Thank you for your interest in Defense Unicorns UDS Marketplace!

This document describes the process and requirements for contributing to this UDS Marketplace repo.

If you are looking to contribute a new package, please refer to the UDS Marketplace Integration Documentation (coming soon [#48](https://github.com/defenseunicorns/uds-marketplace/issues/48))

## Table of Contents

- [Welcome to UDS Marketplace](#welcome-to-uds-marketplace)
  - [Table of Contents](#table-of-contents)
  - [Developer Experience](#developer-experience)
  - [Definition of Done](#definition-of-done)
  - [Submitting a Pull Request](#submitting-a-pull-request)
    - [PR Requirements](#pr-requirements)
  - [Contact](#contact)
  - [Development](#development)
  - [App Store Package Metadata](#app-store-package-metadata)
    - [Creating Metadata for a new package](#creating-metadata-for-a-new-package)
      - [Prompt](#prompt)

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

1. Grab the marketing material from the package website. (copy the entire homepage often works fine)
2. Use the [prompt](#prompt) and paste into ChatGPT
3. Copy the content to a new file `apps/[package-name].yaml`, verify accuracy
4. open a new Pull Request

#### Prompt
```
Create a product description that follows this format (which becomes the description):
- [Tagline]
- [Brief description of what the app does and its main functions]
- [1-2 sentences on key benefits]
- [Description of user interface or key features]
- [Information on included components or integrations].

Product name: [Name of the package]

Here is the content to describe:
[copy paste the "marketing material on the package website]

Output the metadata in the following format:
---
kind: Application
metadata:
  name: [REPLACE]
spec:
  title: [REPLACE]
  repository: [REPLACE]
  description: |
    [REPLACE]
  links:
    - description: Product Website
      url: [REPLACE]
    - description: Helm Chart
      url: [REPLACE]
    - description: UDS Package Repository
      url: [REPLACE]
```
