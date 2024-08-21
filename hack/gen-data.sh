#!/bin/bash

dir="ui/static/api/apps"
rm -rf "$dir"
mkdir -p "$dir"

yq="uds zarf tools yq"

for file in apps/*.yaml; do
  export PACKAGE=$(basename -s ".yaml" "$file")
  export REPO="ghcr.io/defenseunicorns/packages/uds/$PACKAGE"
  export VERSIONS=$(oras repo tags "$REPO" | grep "upstream")

  latest=$(echo "$VERSIONS" | tail -n 1)
  echo "$REPO:$latest"

  export ARCHS=$(oras manifest fetch "$REPO:$latest" | $yq '.manifests[].platform.architecture')
  echo "$ARCHS"

  $yq '
    .spec.versions = (env(VERSIONS) | split(" ") | reverse) |
    .spec.architecture = (env(ARCHS) | split(" ") | sort) |
    .spec.repository = .spec.repository // env(REPO) |
    .spec.security.fips = .spec.security.fips // true |
    .spec.security.cveReport = .spec.security.cveReport // true |
    .spec.security.sbom = .spec.security.sbom // true |
    .spec.security.impactLevel = .spec.security.impactLevel // [ "2", "4", "5", "6" ] |
    .spec.contractingDetails.vehicle = .spec.contractingDetails.vehicle // ["Available"] |
    .spec.vendor = .spec.vendor // {"name": "Defense Unicorns", "url": "https://defenseunicorns.com/contactus"} |
    .spec.providers = .metadata.providers // ["AWS", "Azure", "GCP", "On-Prem", "Air-Gapped"]
  ' "apps/$PACKAGE.yaml" -o=json >"$dir/$PACKAGE.json"

  manifest=$(oras manifest fetch --platform=multi/amd64 "$REPO:$latest")
  digest=$(echo $manifest | $yq '.layers[] | select(.annotations["org.opencontainers.image.title"] == "zarf.yaml") | .digest')
  oras blob fetch --output - "$REPO@$digest" | $yq -o=json >"ui/static/api/packages/$PACKAGE.json"

done

$yq eval-all -o=json '. as $item ireduce ([]; . + $item)' ui/static/api/apps/*.json >"ui/static/api/apps/index.json"
