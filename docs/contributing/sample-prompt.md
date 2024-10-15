Generate the metadata for the product. the metadata is used to produce items in a catalog and the catalog is viewed by a buyer persona.

Output into yaml format following these rules:
- The output should follow this schema
```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/defenseunicorns/uds-appstore/pkg/types/application",
  "$ref": "#/$defs/Application",
  "$defs": {
    "Application": {
      "properties": {
        "kind": {
          "type": "string"
        },
        "metadata": {
          "$ref": "#/$defs/ApplicationMetadata"
        },
        "spec": {
          "$ref": "#/$defs/ApplicationSpec"
        }
      },
      "type": "object"
    },
    "ApplicationContractingDetails": {
      "properties": {
        "number": {
          "type": "string"
        },
        "vehicle": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "pricingModel": {
          "items": {
            "type": "string",
            "enum": [
              "Free",
              "Bring Your Own License"
            ]
          },
          "type": "array"
        },
        "smallBusinessStatus": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "ApplicationIcon": {
      "properties": {
        "src": {
          "type": "string"
        },
      },
      "type": "object"
    },
    "ApplicationMetadata": {
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "ApplicationResourceLink": {
      "properties": {
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "ApplicationSpec": {
      "properties": {
        "title": {
          "type": "string"
        },
        "tagline": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "repository": {
          "type": "string"
        },
        "categories": {
          "items": {
            "type": "string",
            "enum": [
              "AI/ML",
              "Arcade",
              "Collaboration",
              "Command And Control",
              "Databases",
              "Digital Engineering",
              "IT Management",
              "Kubernetes (K8s)",
              "Networking",
              "Productivity",
              "Security",
              "Software Dev",
              "Space Operations",
              "Web"
            ]
          },
          "type": "array"
        },
        "vendor": {
          "$ref": "#/$defs/ApplicationVendor"
        },
        "keywords": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "links": {
          "items": {
            "$ref": "#/$defs/ApplicationResourceLink"
          },
          "type": "array"
        },
      },
      "type": "object"
    },
    "ApplicationVendor": {
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "icons": {
          "items": {
            "$ref": "#/$defs/ApplicationIcon"
          },
          "type": "array"
        }
      },
      "type": "object"
    }
  }
}
```
- the description key, should follow this format
```
[Tagline]
[Brief description of what the app does and its main functions]
[1-2 sentences on key benefits]
[Description of user interface or key features]
[Information on included components or integrations].
```
- the categories key should be selected from the specified enum from the schema
- if an exact value isn't known for the output, simple insert [REPLACE]

here is the product content:
