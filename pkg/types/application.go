package types

type Application struct {
	Kind     string              `json:"kind" yaml:"kind" xml:"kind"`
	Metadata ApplicationMetadata `json:"metadata" yaml:"metadata" xml:"metadata"`
	Spec     ApplicationSpec     `json:"spec" yaml:"spec" xml:"spec"`
}

type ApplicationMetadata struct {
	Name string `json:"name" yaml:"name" xml:"name"`
}

type ApplicationSpec struct {
	Title              string                        `json:"title" yaml:"title" xml:"title"`
	Description        string                        `json:"description" yaml:"description" xml:"description"`
	Repository         string                        `json:"repository" yaml:"repository" xml:"repository"`
	Icons              []ApplicationIcon             `json:"icons" yaml:"icons" xml:"icons"`
	Categories         []ApplicationCategory         `json:"categories" yaml:"categories" xml:"categories" jsonschema:"enum=AI/ML,enum=Arcade,enum=Business,enum=Databases,enum=Development Tools,enum=Kubernetes,enum=Networking,enum=Productivity,enum=Security,enum=Web"`
	Vendor             ApplicationVendor             `json:"vendor" yaml:"vendor" xml:"vendor"`
	ContractingDetails ApplicationContractingDetails `json:"contractingDetails" yaml:"contractingDetails" xml:"contractingDetails"`
	Security           ApplicationSecurity           `json:"security" yaml:"security" xml:"security"`
	Architecture       []ApplicationArchitecture     `json:"architecture" yaml:"architecture" xml:"architecture" jsonschema:"enum=arm64,enum=amd64"`
	Provider           []ApplicationProvider         `json:"provider" yaml:"provider" xml:"provider" jsonschema:"enum=AWS,enum=Azure,enum=GCP,enum=On Prem,enum=Air Gapped"`
	Keywords           []string                      `json:"keywords" yaml:"keywords" xml:"keywords"`
	Links              []ApplicationResourceLink     `json:"links" yaml:"links" xml:"links"`
	Versions           []string                      `json:"versions" yaml:"versions" xml:"versions"`
}

type ApplicationVendor struct {
	Name  string            `json:"name" yaml:"name" xml:"name"`
	URL   string            `json:"url" yaml:"url" xml:"url"`
	Icons []ApplicationIcon `json:"icons" yaml:"icons" xml:"icons"`
}

type ApplicationContractingDetails struct {
	Number              string               `json:"number" yaml:"number" xml:"number"`
	Vehicle             []string             `json:"vehicle" yaml:"vehicle" xml:"vehicle"`
	PricingModel        []ApplicationPricing `json:"pricingModel" yaml:"pricingModel" xml:"pricingModel" jsonschema:"enum=Free,enum=Bring Your Own License"`
	SmallBusinessStatus string               `json:"smallBusinessStatus" yaml:"smallBusinessStatus" xml:"smallBusinessStatus"`
}

type ApplicationSecurity struct {
	Nist80053   bool          `json:"nist80053" yaml:"nist80053" xml:"nist80053"`
	Fips        bool          `json:"fips" yaml:"fips" xml:"fips"`
	CveReport   bool          `json:"cveReport" yaml:"cveReport" xml:"cveReport"`
	Sbom        bool          `json:"sbom" yaml:"sbom" xml:"sbom"`
	ImpactLevel []ImpactLevel `json:"impact-level" yaml:"impact-level" xml:"impact-level" jsonschema:"enum=2,enum=4,enum=5,enum=6"`
}

type ApplicationIcon struct {
	Src  string `json:"src" yaml:"src" xml:"src"`
	Type string `json:"type" yaml:"type" xml:"type"`
	Size string `json:"size" yaml:"size" xml:"size"`
}

type ApplicationResourceLink struct {
	Description string `json:"description" yaml:"description" xml:"description"`
	URL         string `json:"url" yaml:"url" xml:"url"`
}

// Enum types
type (
	ApplicationPricing      string
	ImpactLevel             string
	ApplicationArchitecture string
	ApplicationProvider     string
	ApplicationCategory     string
)

// Enum constants
const (
	ApplicationPricingFree ApplicationPricing = "Free"
	ApplicationPricingByol ApplicationPricing = "Bring Your Own License"

	ImpactLevel2 ImpactLevel = "2"
	ImpactLevel4 ImpactLevel = "4"
	ImpactLevel5 ImpactLevel = "5"
	ImpactLevel6 ImpactLevel = "6"

	ApplicationArchitectureArm64 ApplicationArchitecture = "arm64"
	ApplicationArchitectureAmd64 ApplicationArchitecture = "amd64"

	ApplicationProviderAws       ApplicationProvider = "AWS"
	ApplicationProviderAzure     ApplicationProvider = "Azure"
	ApplicationProviderGcp       ApplicationProvider = "GCP"
	ApplicationProviderOnPrem    ApplicationProvider = "On Prem"
	ApplicationProviderAirGapped ApplicationProvider = "Air Gapped"

	ApplicationCategoryAiMl         ApplicationCategory = "AI/ML"
	ApplicationCategoryArcade       ApplicationCategory = "Arcade"
	ApplicationCategoryBusiness     ApplicationCategory = "Business"
	ApplicationCategoryDatabases    ApplicationCategory = "Databases"
	ApplicationCategoryDevTools     ApplicationCategory = "Development Tools"
	ApplicationCategoryKubernetes   ApplicationCategory = "Kubernetes"
	ApplicationCategoryNetworking   ApplicationCategory = "Networking"
	ApplicationCategoryProductivity ApplicationCategory = "Productivity"
	ApplicationCategorySecurity     ApplicationCategory = "Security"
	ApplicationCategoryWeb          ApplicationCategory = "Web"
)
