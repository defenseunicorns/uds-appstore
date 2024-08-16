# 3. mvp-hosting

Date: 2024-08-15

## Status

Accepted

## Context

Where should Marketplace be hosted for the MVP?

The decision has been made for Marketplace to be hosted at `apps.defenseunicorns.com` in conversation with marketplace-council (Growth, Product, Flywheel, Delivery)

Logically, the *.burning.boats and *.uds.is environments are great candidates for hosting and dog-fooding. However, there does not seem to be a supported implementation for multi-domain's in these environments. [See custom-uds-ingress](https://github.com/defenseunicorns/custom-uds-ingress/tree/main)

As a portable application, UDS Marketplace should leverage a similar posture for deployments across environments and infrastructures (i.e. zarf packages). Using Zarf packages includes additional requirements not mentioned exhaustively here (e.g. Runtime kubernetes dependency). Marketplace will be a baseline application for discoverability across environments and infrastructures.

## Decision

At launch, Marketplace will be hosted at `apps.defenseunicorns.com`

Until the environment can support multi-domain's, Marketplace will be hosted at `apps.burning.boats` and `apps.uds.is`

## Consequences

- Marketplace will require a solution akin to the custom-uds-ingress to support multi-domain's
- Marketplace will adopt some complexity, in favor of dog-fooding and portability
