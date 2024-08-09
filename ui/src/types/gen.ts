export interface Gen {
    UDSBundle:   UDSBundle;
    ZarfPackage: ZarfPackage;
}

export interface UDSBundle {
    /**
     * Generated bundle build data
     */
    build?: UDSBuildData;
    /**
     * The kind of UDS package
     */
    kind: UDSBundleKind;
    /**
     * UDSBundle metadata
     */
    metadata: UDSMetadata;
    /**
     * List of Zarf packages
     */
    packages: Package[];
}

/**
 * Generated bundle build data
 */
export interface UDSBuildData {
    /**
     * The architecture this package was created on
     */
    architecture: string;
    /**
     * The machine name that created this package
     */
    terminal: string;
    /**
     * The timestamp when this package was created
     */
    timestamp: string;
    /**
     * The username who created this package
     */
    user: string;
    /**
     * The version of Zarf used to build this package
     */
    version: string;
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
export interface UDSMetadata {
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
    name: string;
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
}

export interface Package {
    /**
     * Description of the Zarf package
     */
    description?: string;
    /**
     * List of Zarf variables to export from the Zarf package
     */
    exports?: BundleVariableExport[];
    /**
     * Flavor of the Zarf package
     */
    flavor?: string;
    /**
     * List of Zarf variables to import from another Zarf package
     */
    imports?: BundleVariableImport[];
    name:     string;
    /**
     * List of optional components to include from the package (required components are always
     * included)
     */
    optionalComponents?: string[];
    /**
     * Map of Helm chart overrides to set. The format is <component>:
     */
    overrides?: { [key: string]: { [key: string]: BundleChartOverrides } };
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
    ref: string;
    /**
     * The repository to import the package from
     */
    repository?: string;
}

export interface BundleVariableExport {
    description?: string;
    name:         string;
}

export interface BundleVariableImport {
    description?: string;
    name:         string;
    package:      string;
}

export interface BundleChartOverrides {
    /**
     * The namespace to deploy the Helm chart to
     */
    namespace?: string;
    /**
     * List of Helm chart values to set statically
     */
    values?: BundleChartValue[];
    /**
     * List of Helm chart value file  paths to set statically
     */
    valuesFiles?: string[];
    /**
     * List of Helm chart variables to set via UDS variables
     */
    variables?: BundleChartVariable[];
}

export interface BundleChartValue {
    path:  string;
    value: any[] | boolean | number | number | { [key: string]: any } | null | string;
}

export interface BundleChartVariable {
    default?:     any[] | boolean | number | number | { [key: string]: any } | null | string;
    description?: string;
    name:         string;
    path:         string;
    /**
     * Where the value is set from
     */
    source?: Source;
    /**
     * The type of value to be processed
     */
    type?: Type;
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
 *
 * Changes the handling of a variable to load contents differently (i.e. from a file rather
 * than as a raw variable - templated files should be kept below 1 MiB)
 */
export enum Type {
    File = "file",
    Raw = "raw",
}

export interface ZarfPackage {
    apiVersion?: APIVersion;
    build?:      ZarfBuildData;
    components:  ZarfComponent[];
    constants?:  Constant[];
    kind:        ZarfPackageKind;
    metadata?:   ZarfMetadata;
    variables?:  InteractiveVariable[];
}

export enum APIVersion {
    ZarfDevV1Alpha1 = "zarf.dev/v1alpha1",
}

export interface ZarfBuildData {
    architecture:                string;
    differential?:               boolean;
    differentialMissing?:        string[];
    differentialPackageVersion?: string;
    flavor?:                     string;
    lastNonBreakingVersion?:     string;
    migrations?:                 string[];
    registryOverrides?:          { [key: string]: string };
    terminal:                    string;
    timestamp:                   string;
    user:                        string;
    version:                     string;
}

export interface ZarfComponent {
    actions?:        ZarfComponentActions;
    charts?:         ZarfChart[];
    cosignKeyPath?:  string;
    dataInjections?: ZarfDataInjection[];
    default?:        boolean;
    description?:    string;
    extensions?:     ZarfComponentExtensions;
    files?:          ZarfFile[];
    group?:          string;
    images?:         string[];
    import?:         ZarfComponentImport;
    manifests?:      ZarfManifest[];
    name:            string;
    only?:           ZarfComponentOnlyTarget;
    repos?:          string[];
    required?:       boolean;
    scripts?:        DeprecatedZarfComponentScripts;
}

export interface ZarfComponentActions {
    onCreate?: ZarfComponentActionSet;
    onDeploy?: ZarfComponentActionSet;
    onRemove?: ZarfComponentActionSet;
}

export interface ZarfComponentActionSet {
    after?:     ZarfComponentAction[];
    before?:    ZarfComponentAction[];
    defaults?:  ZarfComponentActionDefaults;
    onFailure?: ZarfComponentAction[];
    onSuccess?: ZarfComponentAction[];
}

export interface ZarfComponentAction {
    cmd?:             string;
    description?:     string;
    dir?:             string;
    env?:             string[];
    maxRetries?:      number;
    maxTotalSeconds?: number;
    mute?:            boolean;
    setVariable?:     string;
    setVariables?:    Variable[];
    shell?:           Shell;
    wait?:            ZarfComponentActionWait;
}

export interface Variable {
    /**
     * Whether to automatically indent the variable's value (if multiline) when templating.
     * Based on the number of chars before the start of ###ZARF_VAR_.
     */
    autoIndent?: boolean;
    /**
     * The name to be used for the variable
     */
    name: string;
    /**
     * An optional regex pattern that a variable value must match before a package deployment
     * can continue.
     */
    pattern?: string;
    /**
     * Whether to mark this variable as sensitive to not print it in the log
     */
    sensitive?: boolean;
    /**
     * Changes the handling of a variable to load contents differently (i.e. from a file rather
     * than as a raw variable - templated files should be kept below 1 MiB)
     */
    type?: Type;
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
}

export interface ZarfComponentActionWait {
    cluster?: ZarfComponentActionWaitCluster;
    network?: ZarfComponentActionWaitNetwork;
}

export interface ZarfComponentActionWaitCluster {
    condition?: string;
    kind:       string;
    name:       string;
    namespace?: string;
}

export interface ZarfComponentActionWaitNetwork {
    address:  string;
    code?:    number;
    protocol: Protocol;
}

export enum Protocol {
    HTTP = "http",
    HTTPS = "https",
    TCP = "tcp",
}

export interface ZarfComponentActionDefaults {
    dir?:             string;
    env?:             string[];
    maxRetries?:      number;
    maxTotalSeconds?: number;
    mute?:            boolean;
    shell?:           Shell;
}

export interface ZarfChart {
    gitPath?:     string;
    localPath?:   string;
    name:         string;
    namespace?:   string;
    noWait?:      boolean;
    releaseName?: string;
    repoName?:    string;
    url?:         string;
    valuesFiles?: string[];
    variables?:   ZarfChartVariable[];
    version?:     string;
}

export interface ZarfChartVariable {
    description: string;
    name:        string;
    path:        string;
}

export interface ZarfDataInjection {
    compress?: boolean;
    source:    string;
    target:    ZarfContainerTarget;
}

export interface ZarfContainerTarget {
    container: string;
    namespace: string;
    path:      string;
    selector:  string;
}

export interface ZarfComponentExtensions {
    bigbang?: BigBang;
}

export interface BigBang {
    fluxPatchFiles?: string[];
    repo?:           string;
    skipFlux?:       boolean;
    valuesFiles?:    string[];
    version:         string;
}

export interface ZarfFile {
    executable?:  boolean;
    extractPath?: string;
    shasum?:      string;
    source:       string;
    symlinks?:    string[];
    target:       string;
}

export interface ZarfComponentImport {
    name?: string;
    path?: string;
    url?:  string;
}

export interface ZarfManifest {
    files?:                      string[];
    kustomizations?:             string[];
    kustomizeAllowAnyDirectory?: boolean;
    name:                        string;
    namespace?:                  string;
    noWait?:                     boolean;
}

export interface ZarfComponentOnlyTarget {
    cluster?: ZarfComponentOnlyCluster;
    flavor?:  string;
    localOS?: LocalOS;
}

export interface ZarfComponentOnlyCluster {
    architecture?: Architecture;
    distros?:      string[];
}

export enum Architecture {
    Amd64 = "amd64",
    Arm64 = "arm64",
}

export enum LocalOS {
    Darwin = "darwin",
    Linux = "linux",
    Windows = "windows",
}

export interface DeprecatedZarfComponentScripts {
    after?:          string[];
    before?:         string[];
    prepare?:        string[];
    retry?:          boolean;
    showOutput?:     boolean;
    timeoutSeconds?: number;
}

export interface Constant {
    /**
     * Whether to automatically indent the variable's value (if multiline) when templating.
     * Based on the number of chars before the start of ###ZARF_CONST_.
     */
    autoIndent?: boolean;
    /**
     * A description of the constant to explain its purpose on package create or deploy
     * confirmation prompts
     */
    description?: string;
    /**
     * The name to be used for the constant
     */
    name: string;
    /**
     * An optional regex pattern that a constant value must match before a package can be
     * created.
     */
    pattern?: string;
    /**
     * The value to set for the constant during deploy
     */
    value: string;
}

export enum ZarfPackageKind {
    ZarfInitConfig = "ZarfInitConfig",
    ZarfPackageConfig = "ZarfPackageConfig",
}

export interface ZarfMetadata {
    aggregateChecksum?: string;
    architecture?:      string;
    authors?:           string;
    description?:       string;
    documentation?:     string;
    image?:             string;
    name:               string;
    source?:            string;
    uncompressed?:      boolean;
    url?:               string;
    vendor?:            string;
    version?:           string;
    yolo?:              boolean;
}

export interface InteractiveVariable {
    /**
     * The default value to use for the variable
     */
    default?: string;
    /**
     * A description of the variable to be used when prompting the user a value
     */
    description?: string;
    /**
     * Whether to prompt the user for input for this variable
     */
    prompt?:  boolean;
    Variable: Variable;
}
