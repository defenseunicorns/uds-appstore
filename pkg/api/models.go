package api

import (
	"encoding/json"
	"errors"

	"github.com/guregu/null/v5"
)

type Application struct {
	Name         string   `json:"name"`
	Title        string   `json:"title"`
	Repositories []string `json:"repositories"`
	Description  string   `json:"description"`
	Tagline      string   `json:"tagline"`
	IconPath     string   `json:"icon_path"`
	Keywords     Keywords `json:"keywords"`
	Links        Links    `json:"links"`
}

type ContainerImage struct {
	ImageID    []byte
	Repository string
	Tag        null.String
	SbomPath   string
}

type Package struct {
	ManifestDigest  string
	ApplicationName string
	Repository      string
	Tag             null.String
	Architecture    null.String
	ZarfConfig      interface{}
}

type PackageImage struct {
	PackageManifestDigest []byte
	ImageID               []byte
}

type ReportByPackage struct {
	ApplicationName   string `json:"application_name"`
	PackageRepository string `json:"package_repository"`
	PackageTag        string `json:"package_tag"`
	Architecture      string `json:"architecture"`
	Critical          int64  `json:"critical"`
	High              int64  `json:"high"`
	Medium            int64  `json:"medium"`
	Low               int64  `json:"low"`
	Negligible        int64  `json:"negligible"`
	Info              int64  `json:"info"`
	Unknown           int64  `json:"unknown"`
	Total             int64  `json:"total"`
}

type ReportByPackageImage struct {
	ApplicationName   string
	PackageRepository string
	PackageTag        null.String
	Architecture      null.String
	ImageRepository   null.String
	ImageTag          null.String
	Critical          int64
	High              int64
	Medium            int64
	Low               int64
	Negligible        int64
	Unknown           int64
}

type Vulnerability struct {
	ImageID          []byte
	VulnerabilityID  string
	Severity         string
	Purl             null.String
	PackageName      null.String
	PackageType      null.String
	Description      null.String
	InstalledVersion null.String
	FixState         null.String
	FixVersions      interface{}
}

type Keywords []string

func (k *Keywords) Scan(src interface{}) (err error) {
	var keywords []string
	switch src := src.(type) {
	case string:
		err = json.Unmarshal([]byte(src), &keywords)
	case []byte:
		err = json.Unmarshal(src, &keywords)
	case nil:
		break
	default:
		return errors.New("incompatible type for Keywords")
	}
	if err != nil {
		return
	}
	*k = keywords
	return nil
}

type Link struct {
	Description string `json:"description"`
	Url         string `json:"url"`
}

type Links []Link

func (l *Links) Scan(src interface{}) (err error) {
	var links []Link
	switch src := src.(type) {
	case string:
		err = json.Unmarshal([]byte(src), &links)
	case []byte:
		err = json.Unmarshal(src, &links)
	case nil:
		break
	default:
		return errors.New("incompatible type for Links")
	}
	if err != nil {
		return
	}
	*l = links
	return nil
}
