package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/defenseunicorns/uds-appstore/pkg/types"
	"github.com/invopop/jsonschema"
)

// AppstoreTypes is a struct that contains all the types that need to be included in the schema
type AppstoreTypes struct {
	Application types.Application
}

// generateSchema generates the schema based on the provided type and adds enum definitions
func generateSchema() ([]byte, error) {
	reflector := &jsonschema.Reflector{
		AllowAdditionalProperties:  false,
		RequiredFromJSONSchemaTags: true,
	}
	schema := reflector.Reflect(&AppstoreTypes{})

	return json.MarshalIndent(schema, "", "  ")
}

//go:generate sh -c "go run . > ../schemas/application.schema.json"
func main() {
	output, err := generateSchema()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println(string(output))
}
