#!/bin/bash

dir="ui/static/api/apps"
rm -rf "$dir"
mkdir -p "$dir" "ui/static/api/packages"

yq="uds zarf tools yq"

for file in apps/*.yaml; do
  export PACKAGE=$(basename -s ".yaml" "$file")
  export REPO="ghcr.io/defenseunicorns/packages/uds/$PACKAGE"
  export VERSIONS=$(oras repo tags "$REPO" | grep "upstream")

  $yq "apps/$PACKAGE.yaml" -o=json >"$dir/$PACKAGE.json"

  $yq -i '.spec.versions = (env(VERSIONS) | split(" ") | reverse)' "$dir/$PACKAGE.json"

  # Add vendor information to metadata
  $yq -i '.metadata.vendor = {"name": "Defense Unicorns", "url": "https://defenseunicorns.com/contactus"}' "$dir/$PACKAGE.json"

  latest=$(echo "$VERSIONS" | tail -n 1)
  echo "$REPO:$latest"
  manifest=$(oras manifest fetch --platform=multi/amd64 "$REPO:$latest")
  digest=$(echo $manifest | $yq '.layers[] | select(.annotations["org.opencontainers.image.title"] == "zarf.yaml") | .digest')
  oras blob fetch --output - "$REPO@$digest" | $yq -o=json >"ui/static/api/packages/$PACKAGE.json"

  # Add vendor information to the package JSON's metadata as well
  $yq -i '.metadata.vendor = {"name": "Defense Unicorns", "url": "https://defenseunicorns.com/contactus"}' "ui/static/api/packages/$PACKAGE.json"
done

$yq eval-all -o=json '. as $item ireduce ([]; . + $item)' ui/static/api/apps/*.json >"ui/static/api/apps/index.json"
