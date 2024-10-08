# 4. naming

Date: 2024-10-07

## Status

Accepted

## Context

Originally we were using `UDS Marketplace` to refer to the project. Data points from Marketing has adjusted this naming to the "Airgap App Store". This externally facing name will be consistent, but is not be the best name for technical internal use. Usage of `Airgap App Store` and variants are documented in this decision record.

## Decision

| Name               | Scenario                                                                 |
|--------------------|--------------------------------------------------------------------------|
| Airgap App Store   | (default) Used for all external use and Marketing                        |
| uds-appstore       | internal only and technical references (i.e. build, image, binary, repo) |
| UDS Marketplace    | [Deprecated] Original name - DO NOT USE                                  |

Airgap App Store is the external name for the project. uds-appstore is the internal name for the project. No other usage should be used.

## Consequences

- Migration required, as marketplace has been used in many places for 2 months.
- Historical references remain unchanged (i.e. CHANGELOG, previous ADRs, etc.)
