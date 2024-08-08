# UDS Marketplace Developer Guide

## Table of Contents
- [UDS Marketplace Developer Guide](#uds-marketplace-developer-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
    - [Starting the API Server](#starting-the-api-server)
    - [Starting the UI Dev Server](#starting-the-ui-dev-server)
    - [Starting Mono Dev Server](#starting-mono-dev-server)
  - [Testing](#testing)
  - [Pre-commit Hooks](#pre-commit-hooks)
  - [Deployment](#deployment)
    - [Deploying a Slim UDS Cluster](#deploying-a-slim-uds-cluster)
  - [Additional Notes](#additional-notes)

## Prerequisites

Ensure you have the following tools installed:
- [Go](https://go.dev/dl/)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Homebrew](https://brew.sh/)
- [UDS CLI](https://github.com/defenseunicorns/uds-cli)

Install UDS CLI:
```bash
brew tap defenseunicorns/tap
brew install uds
```

## Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/defenseunicorns/uds-marketplace.git
   cd uds-marketplace
   ```

2. Install dependencies:
   ```bash
   uds run setup:deps
   ```

3. Install environment tools:
   ```bash
   uds run setup:install-tools
   ```

## Development

### Starting the API Server

To run the API server in development mode with hot-reloading:

```bash
uds run dev-api
```

### Starting the UI Dev Server

To run the UI in development mode:

```bash
uds run dev-ui
```

### Starting Mono Dev Server

To run both the API server and the UI in development mode (hot-reloading):

```bash
uds run dev
```

## Testing

To run all tests:

```bash
uds run tests
```

## Pre-commit Hooks

```bash
uds run pre-commit
```
> Note: may fix formatting and need `git add .` post pre-commit

## Deployment

### Deploying a Slim UDS Cluster

To create a k3d cluster and deploy a slim version of UDS with metrics server and marketplace:

```bash
uds run k3d-dev-deploy
```


## Additional Notes

- The project uses maru runner via `uds run <task>`. To view available top level tasks, run `uds run -t` or `uds run -T` for all tasks.
- The project follows trunk-based development. Ensure your code is always in a releasable state when merging to the main branch.
- For more detailed contribution guidelines, refer to the `CONTRIBUTING.md` file in the repository.
