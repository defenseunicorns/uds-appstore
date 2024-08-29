module github.com/defenseunicorns/uds-marketplace/hack

go 1.22.5

require (
	github.com/defenseunicorns/uds-cli v0.14.2
	github.com/defenseunicorns/uds-marketplace v0.0.0
	github.com/invopop/jsonschema v0.12.0
	github.com/zarf-dev/zarf v0.38.3
)

replace github.com/defenseunicorns/uds-marketplace v0.0.0 => ../

require (
	github.com/bahlo/generic-list-go v0.2.0 // indirect
	github.com/buger/jsonparser v1.1.1 // indirect
	github.com/kr/text v0.2.0 // indirect
	github.com/mailru/easyjson v0.7.7 // indirect
	github.com/wk8/go-ordered-map/v2 v2.1.8 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)
