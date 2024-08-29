package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	uds "github.com/defenseunicorns/uds-cli/src/types"
	"github.com/defenseunicorns/uds-marketplace/pkg/types"
	"github.com/invopop/jsonschema"
	"github.com/zarf-dev/zarf/src/api/v1alpha1"
)

type genTypes struct {
	UDSBundle   uds.UDSBundle
	ZarfPackage v1alpha1.ZarfPackage
	Application types.Application
}

// generateSchema generates the schema based on the provided type and adds enum definitions
func generateSchema(schemaType string) ([]byte, error) {
	reflector := &jsonschema.Reflector{
		AllowAdditionalProperties:  true,
		RequiredFromJSONSchemaTags: true,
	}
	var schema *jsonschema.Schema
	switch schemaType {
	case "all":
		schema = reflector.Reflect(&genTypes{})
	case "application":
		schema = reflector.Reflect(&types.Application{})

	default:
		return nil, fmt.Errorf("invalid schema type: %s", schemaType)
	}

	return json.MarshalIndent(schema, "", "  ")
}

//go:generate sh -c "go run . all | npx quicktype -s schema --just-types -o ../ui/src/lib/types/gen.ts"
//go:generate sh -c "echo '// SPDX-License-Identifier: Apache-2.0\n// SPDX-FileCopyrightText: 2024-Present The UDS Authors\n' | cat - ../ui/src/lib/types/gen.ts > temp && mv temp ../ui/src/lib/types/gen.ts"
//go:generate sh -c "go run . application > ../schemas/application.schema.json"
func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please specify 'all' or 'application' as an argument")
		os.Exit(1)
	}

	arg := strings.ToLower(os.Args[1])

	output, err := generateSchema(arg)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println(string(output))
}
