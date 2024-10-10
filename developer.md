# Airgap App Store Developer Guide

## Table of Contents

- [Airgap App Store Developer Guide](#airgap-app-store-developer-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
    - [Starting the Airgap App Store](#starting-the-airgap-app-store)
    - [Testing](#testing)
    - [Pre-commit Hooks](#pre-commit-hooks)
  - [Generating the Catalog](#generating-the-catalog)
  - [Additional Notes](#additional-notes)

## Prerequisites

Ensure you have the following tools installed:

- [Go](https://go.dev/dl/)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Homebrew](https://brew.sh/)
- [UDS CLI](https://github.com/defenseunicorns/uds-cli)

Install UDS CLI:

```sh
brew tap defenseunicorns/tap
brew install uds
```

## Environment Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/defenseunicorns/uds-appstore.git
   cd uds-appstore
   ```

2. Install dependencies:

   ```sh
   uds run setup:deps
   ```

3. Install environment tools:
   ```sh
   uds run setup:install-tools
   ```

## Development

### Starting the Airgap App Store

To run with hot-reloading:

```sh
uds run dev
```

### Testing

To run all tests:

```sh
uds run tests
```

### Pre-commit Hooks

```sh
uds run pre-commit
```

> Note: may fix formatting and need `git add .` post pre-commit

## Generating the Catalog

To generate teh catalog with data from `/apps`:

```sh
uds run generate-catalog
```

## Additional Notes

- The project uses maru runner via `uds run <task>`. To view available top level tasks, run `uds run --list` or `uds run --list-all` for all tasks.
- For more detailed contribution guidelines, refer to the [CONTRIBUTING.md](CONTRIBUTING.md).
