<img width="200" alt="UDS Unicorn Delivery Service" src="https://github.com/defenseunicorns/uds-marketplace/assets/1349336/52deb6da-bef5-4501-8d97-e8a63b10dbc9">

# UDS Package GitLab

[![Latest Release](https://img.shields.io/github/v/release/defenseunicorns/uds-package-gitlab)](https://github.com/defenseunicorns/uds-package-gitlab/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/defenseunicorns/uds-package-gitlab/tag-and-release.yaml)](https://github.com/defenseunicorns/uds-package-gitlab/actions/workflows/tag-and-release.yaml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-gitlab/badge)](https://api.securityscorecards.dev/projects/github.com/defenseunicorns/uds-package-gitlab)

[Description](#description) ·
[Contracting Information](#contracting-information) ·
[Security Report](#security-report) ·
[Enterprise Support](#get-this-package-in-your-environment) ·
[Package Guide](#package-guide)

## Description

GitLab is a comprehensive DevSecOps platform designed to meet the rigorous demands of the Department of Defense. Our single, unified application streamlines the entire software development lifecycle, enhancing collaboration between development, security, and operations teams across the defense ecosystem.

Engineered for mission-critical environments, GitLab accelerates software delivery from months to days while reducing development costs and minimizing application vulnerabilities. This efficiency boost translates to a 200% faster software lifecycle, significantly enhancing operational readiness and mission capabilities.

## Contracting Information

<details><summary>Contracting Document</summary>

```txt
DoD Contracting Information
Application Name: [Insert Application Name]
Vendor: [Insert Vendor Name]
Contract Vehicle: [e.g., GSA Schedule, SEWP, Other]
Contract Number: [Insert Contract Number]
CAGE Code: [Insert Commercial and Government Entity Code]
NAICS Code: [Insert North American Industry Classification System Code]
Product Service Code (PSC): [Insert PSC]
Security Clearance Level: [e.g., Unclassified, Secret, Top Secret]
Authority to Operate (ATO) Status: [e.g., Approved, Pending, In Process]
Compliance:
NIST 800-53: [Yes/No]
CMMC Level: [Insert Level]
FedRAMP: [Yes/No - If yes, specify level]
Pricing Model: [e.g., Per User, Per Instance, Enterprise]
Small Business Status: [e.g., Small Business, Woman-Owned, Veteran-Owned, etc.]
Delivery Timeline: [Insert estimated delivery time]
POC for Contracting:
Name: [Insert Name]
Email: [Insert Email]
Phone: [Insert Phone Number]
Additional Notes: [Any other relevant contracting information]
```

</details>

[![Contracting Info](img/contract-info-tall.svg)](./placeholders/contracting-placeholder.md)

## Security Report

<details><summary>Security Document</summary>

```txt
DoD Security Report Information
Application Name: [Insert Application Name]
Version: [Insert Version Number]
Last Security Assessment Date: [MM/DD/YYYY]
Security Classification: [e.g., Unclassified, Secret, Top Secret]
Authority to Operate (ATO) Status:
Status: [e.g., Full ATO, Interim ATO, In Process]
Issuing Organization: [e.g., DoD Component]
Expiration Date: [MM/DD/YYYY]
Compliance Status:
NIST 800-53 Rev 5: [Compliant/Non-Compliant]
DISA STIG: [Compliant/Non-Compliant]
CMMC Level: [Insert Level]
FedRAMP: [Authorization level, if applicable]
Vulnerability Assessment:
Total Vulnerabilities: [Number]
Critical: [Number]
High: [Number]
Medium: [Number]
Low: [Number]
Penetration Test Results:
Date of Last Test: [MM/DD/YYYY]
Overall Risk Rating: [e.g., Low, Medium, High]
Key Findings: [Brief summary]
Encryption:
Data at Rest: [Algorithm and strength]
Data in Transit: [Protocol and strength]
Access Control:
Authentication Method: [e.g., CAC, 2FA, MFA]
Role-Based Access Control: [Yes/No]
Continuous Monitoring:
Real-time Threat Detection: [Yes/No]
Automated Vulnerability Scanning: [Frequency]
Incident Response Plan: [Yes/No]
Supply Chain Risk Management:
SCRM Plan: [Yes/No]
Third-Party Dependencies Assessed: [Yes/No]
Additional Security Features: [List any other relevant security features]
POC for Security Inquiries:
Name: [Insert Name]
Email: [Insert Email]
Phone: [Insert Phone Number]
Date of Report: [MM/DD/YYYY]
```

</details>

[![Security Package](img/security-report-tall.svg)](./placeholders/security-placeholder.md)

## Get This Package In Your Environment

Wesa no like da Naboo! Da Naboo tink day so smarty. Day tink day brains so big. Once those droids take control of the surface, they will take control of you. Mesa no tink so.
Everything's overheated. Oops! This is not good. Noooo! No given up General Ja Ja. Wesa tink of sometin. Hands up! My giv up. My giv up. Your little insurrection is at an end, Your Highness.

[![Talk to a Mission Expert](img/talk.svg)](./placeholders/support-placeholder.md)

# Package Guide

This package is designed for use as part of a [UDS Software Factory](https://github.com/defenseunicorns/uds-software-factory) bundle deployed on [UDS Core](https://github.com/defenseunicorns/uds-core), and is based on the Bigbang [GitLab](https://repo1.dso.mil/big-bang/product/packages/gitlab) chart.

> [!IMPORTANT]  
> The `arm64` package includes `amd64` images due to lack of availability of `arm64` images from upstream projects at this time. This means you can deploy the `arm64` package on an `arm64` kubernetes cluster, but some of the images contained in the package will require emulation (e.g., qemu or rosetta) to run properly.

## Pre-requisites

The GitLab Package expects to be deployed on top of [UDS Core](https://github.com/defenseunicorns/uds-core) with the dependencies listed below being configured prior to deployment.

> [!IMPORTANT]
> **NOTE**: Some GitLab features (such as GitLab pages) will also require a [GitLab runner](https://github.com/defenseunicorns/uds-package-gitlab-runner) along with additional configuration such as an additional certificate SAN for `*.pages.<your-domain>`.

GitLab is configured by default to assume the internal dependencies that are used for testing (see minio, redis and postgres in the [bundle](bundle/uds-bundle.yaml)).

> [!IMPORTANT]
> If you are using different internal services, cloud services or a mix you will have to configure values in the config chart accordingly via bundle overrides. See the networking [docs](docs/networking.md) for details

#### Database

- A Postgres database is running on port `5432` and accessible to the cluster via the `GITLAB_DB_ENDPOINT` Zarf var.
- This database can be logged into via the username configured with the Zarf var `GITLAB_DB_USERNAME`. Default is `gitlab`
- This database instance has a psql database created matching what is defined in the Zarf var `GITLAB_DB_NAME`. Default is `gitlabdb`
- The user has read/write access to the above mentioned database
- Create `gitlab-postgres` service in `gitlab` namespace that points to the psql database
- Create `gitlab-postgres` secret in `gitlab` namespace with the key `password` that contains the password to the user for the psql database

#### Redis / Redis Equivalent

- An instance of Redis or Redis equivalent (elasticache, etc.) is running on port `6379` and accessible to the cluster via the `GITLAB_REDIS_ENDPOINT` Zarf var.
- The redis instance accepts anonymous auth (password only)
- Create `gitlab-redis` service in `gitlab` namespace that points to the redis instance
- Create `gitlab-redis` secret in `gitlab` namespace with the key `password` that contains the password to the redis instance

#### Object Storage

Object Storage works a bit differently as there are many kinds of file stores GitLab can be configured to use.

- Create the secret `gitlab-object-store` in the `gitlab` namespace with the following keys:
  - An example for in-cluster Minio can be found in this repository at the path `src/dev-secrets/minio-secret.yaml`
  - `connection`
    - This key refers to the configuration for the main GitLab service. The documentation for what goes in this key is located [here](https://docs.gitlab.com/16.0/ee/administration/object_storage.html#configure-the-connection-settings)
  - `registry`
    - This key refers to the configuration for the gitlab registry. The documentation for what goes in this key is located [here](https://docs.docker.com/registry/configuration/#storage)
  - `backups`
    - This key refers to the configuration for the gitlab-toolbox backup tool. It relies on a program called `s3cmd`. The documentation for what goes in this key is located [here](https://s3tools.org/kb/item14.htm)
- Below are the list of buckets that need to be created before starting GitLab:

```yaml
  - uds-gitlab-pages
  - uds-gitlab-registry
  - uds-gitlab-lfs
  - uds-gitlab-artifacts
  - uds-gitlab-uploads
  - uds-gitlab-packages
  - uds-gitlab-mr-diffs
  - uds-gitlab-terraform-state
  - uds-gitlab-ci-secure-files
  - uds-gitlab-dependency-proxy
  - uds-gitlab-backups
  - uds-gitlab-tmp
```

- These buckets can have a suffix applied via the `BUCKET_SUFFIX` Zarf variable (e.g. `-some-deployment-name` plus `uds-gitlab-backups` would be `uds-gitlab-backups-some-deployment-name`)



## Flavors

| Flavor | Description | Example Creation |
| ------ | ----------- | ---------------- |
| upstream | Uses upstream images within the package. | `zarf package create . -f upstream` |
| registry1 | Uses images from registry1.dso.mil within the package. | `zarf package create . -f registry1` |

> [!IMPORTANT]
> **NOTE:** To create the registry1 flavor you will need to be logged into Iron Bank - you can find instructions on how to do this in the [Big Bang Zarf Tutorial](https://docs.zarf.dev/tutorials/6-big-bang/#setup).

## Releases

The released packages can be found in [ghcr](https://github.com/defenseunicorns/uds-package-gitlab/pkgs/container/packages%2Fuds%2Fgitlab).

## UDS Tasks (for local dev and CI)

*For local dev, this requires you install [uds-cli](https://github.com/defenseunicorns/uds-cli?tab=readme-ov-file#install)

> [!TIP]
> To get a list of tasks to run you can use `uds run --list`!

## Contributing

Please see the [CONTRIBUTING.md](./CONTRIBUTING.md)

## Development

When developing this package it is ideal to utilize the json schemas for UDS Bundles, Zarf Packages and Maru Tasks. This involves configuring your IDE to provide schema validation for the respective files used by each application. For guidance on how to set up this schema validation, please refer to the [guide](https://github.com/defenseunicorns/uds-common/blob/main/docs/development-ide-configuration.md) in uds-common