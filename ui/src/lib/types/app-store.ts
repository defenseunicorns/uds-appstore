export interface AppStore {
    Application?: Application;
}

export interface Application {
    kind?:     string;
    metadata?: Metadata;
    spec?:     Spec;
}

export interface Metadata {
    name?: string;
}

export interface Spec {
    architecture?:       Architecture[];
    categories?:         Category[];
    contractingDetails?: ContractingDetails;
    description?:        string;
    icons?:              IconElement[];
    infrastructure?:     Infrastructure[];
    keywords?:           string[];
    links?:              LinkElement[];
    repository?:         string;
    security?:           Security;
    tagline?:            string;
    title?:              string;
    vendor?:             Vendor;
    versions?:           string[];
}

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
}

export enum PricingModel {
    BringYourOwnLicense = "Bring Your Own License",
    Free = "Free",
}

export interface IconElement {
    size?: string;
    src?:  string;
    type?: string;
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
}

export enum Security {
    FIPSImage = "FIPS Image",
    NIST80053ControlsMapped = "NIST 800-53 Controls Mapped",
}

export interface Vendor {
    icons?: IconElement[];
    name?:  string;
    url?:   string;
}
