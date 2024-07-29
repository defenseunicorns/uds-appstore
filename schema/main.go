package main

import (
	"encoding/json"
	"fmt"

	"github.com/invopop/jsonschema"
)

func main() {
	schema := jsonschema.Reflect(&metadata{})
	output, err := json.MarshalIndent(schema, "", "  ")
	if err != nil {
		panic(fmt.Errorf("unable to generate the JSON schema: %w", err))
	}
	fmt.Print(string(output) + "\n")
}

type metadata struct {
	Name        string `json:"name" jsonschema:"description=Name of the UDS Package"`
	Description string `json:"description" jsonschema:"description=Description of the UDS Package"`
	Version     string `json:"version" jsonschema:"description=Version of the UDS Package"`
}
