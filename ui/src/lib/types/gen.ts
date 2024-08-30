// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

export interface Gen {
    Application?: Application;
    UDSBundle?:   UdsBundle;
    ZarfPackage?: ZarfPackage;
    [property: string]: any;
}

export interface Application {
    kind?:     string;
    metadata?: ApplicationMetadata;
    spec?:     Spec;
    [property: string]: any;
}

export interface ApplicationMetadata {
    name?: string;
    [property: string]: any;
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
    [property: string]: any;
}

export enum Architecture {
    Amd64 = "amd64",
    Arm64 = "arm64",
}

export enum Category {
    AIMl = "AI/ML",
    Arcade = "Arcade",
    Business = "Business",
    Databases = "Databases",
    DevelopmentTools = "Development Tools",
    Kubernetes = "Kubernetes",
    Networking = "Networking",
    Productivity = "Productivity",
    Security = "Security",
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
    AWSGov = "AWS Gov",
    AirGapped = "AirGapped",
    AzureGov = "Azure Gov",
    OnPrem = "On-Prem",
}

export interface LinkElement {
    description?: string;
    url?:         string;
    [property: string]: any;
}

export interface Security {
    cveReport?:   boolean;
    fips?:        boolean;
    impactLevel?: ImpactLevel[];
    nist80053?:   boolean;
    sbom?:        boolean;
    [property: string]: any;
}

export enum ImpactLevel {
    The2 = "2",
    The4 = "4",
    The5 = "5",
    The6 = "6",
}

export interface Vendor {
    icons?: IconElement[];
    name?:  string;
    url?:   string;
    [property: string]: any;
}

export interface UdsBundle {
    /**
     * Generated bundle build data
     */
    build?: UDSBundleBuild;
    /**
     * The kind of UDS package
     */
    kind?: UDSBundleKind;
    /**
     * UDSBundle metadata
     */
    metadata?: UDSBundleMetadata;
    /**
     * List of Zarf packages
     */
    packages?: PackageElement[];
    [property: string]: any;
}

/**
 * Generated bundle build data
 */
export interface UDSBundleBuild {
    /**
     * The architecture this package was created on
     */
    architecture?: string;
    /**
     * The machine name that created this package
     */
    terminal?: string;
    /**
     * The timestamp when this package was created
     */
    timestamp?: string;
    /**
     * The username who created this package
     */
    user?: string;
    /**
     * The version of Zarf used to build this package
     */
    version?: string;
    [property: string]: any;
}

/**
 * The kind of UDS package
 */
export enum UDSBundleKind {
    UDSBundle = "UDSBundle",
}

/**
 * UDSBundle metadata
 */
export interface UDSBundleMetadata {
    /**
     * Checksum of a checksums.txt file that contains checksums all the layers within the
     * package.
     */
    aggregateChecksum?: string;
    /**
     * The target cluster architecture for this package
     */
    architecture?: string;
    /**
     * Comma-separated list of package authors (including contact info)
     */
    authors?: string;
    /**
     * Additional information about this package
     */
    description?: string;
    /**
     * Link to package documentation when online
     */
    documentation?: string;
    /**
     * Name to identify this UDS bundle
     */
    name?: string;
    /**
     * Link to package source code when online
     */
    source?: string;
    /**
     * Disable compression of this package
     */
    uncompressed?: boolean;
    /**
     * Link to package information when online
     */
    url?: string;
    /**
     * Name of the distributing entity, organization or individual.
     */
    vendor?: string;
    /**
     * Generic string set by a package author to track the package version
     */
    version?: string;
    [property: string]: any;
}

export interface PackageElement {
    /**
     * Description of the Zarf package
     */
    description?: string;
    /**
     * List of Zarf variables to export from the Zarf package
     */
    exports?: ExportElement[];
    /**
     * Flavor of the Zarf package
     */
    flavor?: string;
    /**
     * List of Zarf variables to import from another Zarf package
     */
    imports?: ImportElement[];
    name?:    string;
    /**
     * List of optional components to include from the package (required components are always
     * included)
     */
    optionalComponents?: string[];
    /**
     * Map of Helm chart overrides to set. The format is <component>:
     */
    overrides?: { [key: string]: { [key: string]: OverrideObject } };
    /**
     * The local path to import the package from
     */
    path?: string;
    /**
     * The public key to use to verify the package
     */
    publicKey?: string;
    /**
     * Ref (tag) of the Zarf package
     */
    ref?: string;
    /**
     * The repository to import the package from
     */
    repository?: string;
    [property: string]: any;
}

export interface ExportElement {
    description?: string;
    name?:        string;
    [property: string]: any;
}

export interface ImportElement {
    description?: string;
    name?:        string;
    package?:     string;
    [property: string]: any;
}

export interface OverrideObject {
    /**
     * The namespace to deploy the Helm chart to
     */
    namespace?: string;
    /**
     * List of Helm chart values to set statically
     */
    values?: ValueElement[];
    /**
     * List of Helm chart value file  paths to set statically
     */
    valuesFiles?: string[];
    /**
     * List of Helm chart variables to set via UDS variables
     */
    variables?: OverrideVariable[];
    [property: string]: any;
}

export interface ValueElement {
    path?:  string;
    value?: any;
    [property: string]: any;
}

export interface OverrideVariable {
    default?:     any;
    description?: string;
    name?:        string;
    path?:        string;
    /**
     * Where the value is set from
     */
    source?: Source;
    /**
     * The type of value to be processed
     */
    type?: Type;
    [property: string]: any;
}

/**
 * Where the value is set from
 */
export enum Source {
    Bundle = "bundle",
    CLI = "cli",
    Config = "config",
    Env = "env",
}

/**
 * The type of value to be processed
 */
export enum Type {
    File = "file",
    Raw = "raw",
}

export interface ZarfPackage {
    apiVersion?: APIVersion;
    build?:      ZarfPackageBuild;
    components?: ComponentElement[];
    constants?:  ConstantElement[];
    kind?:       ZarfPackageKind;
    metadata?:   ZarfPackageMetadata;
    variables?:  ZarfPackageVariable[];
    [property: string]: any;
}

export enum APIVersion {
    ZarfDevV1Alpha1 = "zarf.dev/v1alpha1",
}

export interface ZarfPackageBuild {
    architecture?:               string;
    differential?:               boolean;
    differentialMissing?:        string[];
    differentialPackageVersion?: string;
    flavor?:                     string;
    lastNonBreakingVersion?:     string;
    migrations?:                 string[];
    registryOverrides?:          { [key: string]: string };
    terminal?:                   string;
    timestamp?:                  string;
    user?:                       string;
    version?:                    string;
    [property: string]: any;
}

export interface ComponentElement {
    actions?:        Actions;
    charts?:         ChartElement[];
    cosignKeyPath?:  string;
    dataInjections?: DataInjectionElement[];
    default?:        boolean;
    description?:    string;
    extensions?:     Extensions;
    files?:          FileElement[];
    group?:          string;
    images?:         string[];
    import?:         Import;
    manifests?:      ManifestElement[];
    name?:           string;
    only?:           Only;
    repos?:          string[];
    required?:       boolean;
    scripts?:        Scripts;
    [property: string]: any;
}

export interface Actions {
    onCreate?: OnCreate;
    onDeploy?: OnCreate;
    onRemove?: OnCreate;
    [property: string]: any;
}

export interface OnCreate {
    after?:     AfterElement[];
    before?:    AfterElement[];
    defaults?:  Defaults;
    onFailure?: AfterElement[];
    onSuccess?: AfterElement[];
    [property: string]: any;
}

export interface AfterElement {
    cmd?:             string;
    description?:     string;
    dir?:             string;
    env?:             string[];
    maxRetries?:      number;
    maxTotalSeconds?: number;
    mute?:            boolean;
    setVariable?:     string;
    setVariables?:    SetVariableElement[];
    shell?:           Shell;
    wait?:            Wait;
    [property: string]: any;
}

export interface SetVariableElement {
    autoIndent?: boolean;
    name?:       string;
    pattern?:    string;
    sensitive?:  boolean;
    type?:       Type;
    [property: string]: any;
}

export interface Shell {
    /**
     * (default 'sh') Indicates a preference for the shell to use on macOS systems
     */
    darwin?: string;
    /**
     * (default 'sh') Indicates a preference for the shell to use on Linux systems
     */
    linux?: string;
    /**
     * (default 'powershell') Indicates a preference for the shell to use on Windows systems
     * (note that choosing 'cmd' will turn off migrations like touch -> New-Item)
     */
    windows?: string;
    [property: string]: any;
}

export interface Wait {
    cluster?: WaitCluster;
    network?: Network;
    [property: string]: any;
}

export interface WaitCluster {
    condition?: string;
    kind?:      string;
    name?:      string;
    namespace?: string;
    [property: string]: any;
}

export interface Network {
    address?:  string;
    code?:     number;
    protocol?: Protocol;
    [property: string]: any;
}

export enum Protocol {
    HTTP = "http",
    HTTPS = "https",
    TCP = "tcp",
}

export interface Defaults {
    dir?:             string;
    env?:             string[];
    maxRetries?:      number;
    maxTotalSeconds?: number;
    mute?:            boolean;
    shell?:           Shell;
    [property: string]: any;
}

export interface ChartElement {
    gitPath?:     string;
    localPath?:   string;
    name?:        string;
    namespace?:   string;
    noWait?:      boolean;
    releaseName?: string;
    repoName?:    string;
    url?:         string;
    valuesFiles?: string[];
    variables?:   ChartVariable[];
    version?:     string;
    [property: string]: any;
}

export interface ChartVariable {
    description?: string;
    name?:        string;
    path?:        string;
    [property: string]: any;
}

export interface DataInjectionElement {
    compress?: boolean;
    source?:   string;
    target?:   Target;
    [property: string]: any;
}

export interface Target {
    container?: string;
    namespace?: string;
    path?:      string;
    selector?:  string;
    [property: string]: any;
}

export interface Extensions {
    bigbang?: Bigbang;
    [property: string]: any;
}

export interface Bigbang {
    fluxPatchFiles?: string[];
    repo?:           string;
    skipFlux?:       boolean;
    valuesFiles?:    string[];
    version?:        string;
    [property: string]: any;
}

export interface FileElement {
    executable?:  boolean;
    extractPath?: string;
    shasum?:      string;
    source?:      string;
    symlinks?:    string[];
    target?:      string;
    [property: string]: any;
}

export interface Import {
    name?: string;
    path?: string;
    url?:  string;
    [property: string]: any;
}

export interface ManifestElement {
    files?:                      string[];
    kustomizations?:             string[];
    kustomizeAllowAnyDirectory?: boolean;
    name?:                       string;
    namespace?:                  string;
    noWait?:                     boolean;
    [property: string]: any;
}

export interface Only {
    cluster?: OnlyCluster;
    flavor?:  string;
    localOS?: LocalOS;
    [property: string]: any;
}

export interface OnlyCluster {
    architecture?: Architecture;
    distros?:      string[];
    [property: string]: any;
}

export enum LocalOS {
    Darwin = "darwin",
    Linux = "linux",
    Windows = "windows",
}

export interface Scripts {
    after?:          string[];
    before?:         string[];
    prepare?:        string[];
    retry?:          boolean;
    showOutput?:     boolean;
    timeoutSeconds?: number;
    [property: string]: any;
}

export interface ConstantElement {
    autoIndent?:  boolean;
    description?: string;
    name?:        string;
    pattern?:     string;
    value?:       string;
    [property: string]: any;
}

export enum ZarfPackageKind {
    ZarfInitConfig = "ZarfInitConfig",
    ZarfPackageConfig = "ZarfPackageConfig",
}

export interface ZarfPackageMetadata {
    aggregateChecksum?: string;
    architecture?:      string;
    authors?:           string;
    description?:       string;
    documentation?:     string;
    image?:             string;
    name?:              string;
    source?:            string;
    uncompressed?:      boolean;
    url?:               string;
    vendor?:            string;
    version?:           string;
    yolo?:              boolean;
    [property: string]: any;
}

export interface ZarfPackageVariable {
    autoIndent?:  boolean;
    default?:     string;
    description?: string;
    name?:        string;
    pattern?:     string;
    prompt?:      boolean;
    sensitive?:   boolean;
    type?:        Type;
    [property: string]: any;
}
