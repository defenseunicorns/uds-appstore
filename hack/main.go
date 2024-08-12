//go:build ignore

package main

import (
	"encoding/json"
	"fmt"

	"github.com/alecthomas/jsonschema"
	uds "github.com/defenseunicorns/uds-cli/src/types"
	"github.com/zarf-dev/zarf/src/api/v1alpha1"
)

type genTypes struct {
	UDSBundle   uds.UDSBundle
	ZarfPackage v1alpha1.ZarfPackage
}

//go:generate sh -c "go run . | npx quicktype -s schema --just-types -o ../ui/src/types/gen.ts"
func main() {
	schema := jsonschema.Reflect(&genTypes{})
	output, err := json.Marshal(schema)
	if err != nil {
		panic(err)
	}
	fmt.Print(string(output))
}
