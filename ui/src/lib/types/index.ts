// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

/* eslint-disable @typescript-eslint/no-explicit-any */

export * from './gen';

export enum Architecture {
  Amd64 = "amd64",
  Arm64 = "arm64",
}

export enum Category {
  AIMl = "AI/ML",
  Arcade = "Arcade",
  Collaboration = "Collaboration",
  CommandAndControl = "Command And Control",
  Databases = "Databases",
  DigitalEngineering = "Digital Engineering",
  ITManagement = "IT Management",
  KubernetesK8S = "Kubernetes (K8s)",
  Networking = "Networking",
  Productivity = "Productivity",
  Security = "Security",
  SoftwareDev = "Software Dev",
  SpaceOperations = "Space Operations",
  Web = "Web",
}

export interface ContractingDetails {
  number?:              string;
  pricingModel?:        PricingModel[];
  smallBusinessStatus?: string;
  vehicle?:             string[];
  [property: string]: any;
}

export enum PricingModel {
  BringYourOwnLicense = "Bring Your Own License",
  Free = "Free",
}

export interface IconElement {
  size?: string;
  src?:  string;
  type?: string;
  [property: string]: any;
}

export enum Infrastructure {
  AWSGovCloudUS = "AWS GovCloud (US)",
  AzureGovernmentCloud = "Azure Government Cloud",
  Edge = "Edge",
  OnPrem = "On-prem",
}

export interface LinkElement {
  description?: string;
  url?:         string;
  [property: string]: any;
}

export enum Security {
  FIPSImage = "FIPS Image",
  NIST80053ControlsMapped = "NIST 800-53 Controls Mapped",
}

export interface Vendor {
  icons?: IconElement[];
  name?:  string;
  url?:   string;
  [property: string]: any;
}
