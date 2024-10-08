<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { DescriptionListGroup, DescriptionListItem } from '$lib/components';
  import type { Application } from '$lib/types/gen';

  export let app: Application = {
    spec: {
      contractingDetails: {
        vehicle: [],
        pricingModel: [],
        businessCategory: []
      }
    }
  };
</script>

<div class="flex-1 md:max-w-[512px]">
  <div class="flex flex-col gap-4">
    <DescriptionListGroup title="Contracting Details">
      <DescriptionListItem
        key="Contracting Vehicle(s)"
        value={app.spec?.contractingDetails?.vehicle?.join(', ') ?? '-'}
      />
      <DescriptionListItem
        key="Pricing Model"
        value={app.spec?.contractingDetails?.pricingModel?.join(', ') ?? '-'}
      />
      <DescriptionListItem
        key="Business Category"
        value={app.spec?.categories?.join(', ') ?? '-'}
      />
    </DescriptionListGroup>

    <DescriptionListGroup title="Security & Compliance">
      <DescriptionListItem
        key="FIPS Compliant Image(s)"
        value={app.spec?.security?.fips ? 'Available' : '-'}
      />
      <DescriptionListItem
        key="NIST 800-53"
        value={app.spec?.security?.nist80053 ? 'Available' : '-'}
      />
      <DescriptionListItem
        key="Impact Level"
        value={app.spec?.security?.impactLevel?.join(', ') ?? '-'}
      />
      <DescriptionListItem
        key="CVE Report"
        value={app.spec?.security?.cveReport ? 'Available' : '-'}
      />
      <DescriptionListItem key="SBOM" value={app.spec?.security?.sbom ? 'Available' : '-'} />
    </DescriptionListGroup>

    <DescriptionListGroup title="Technical Details">
      <DescriptionListItem
        key="Infrastructure"
        value={app.spec?.infrastructure?.join(', ') ?? '-'}
      />
      <DescriptionListItem
        key="Architecture(s)"
        value={app.spec?.architecture?.join(', ') ?? '-'}
      />
    </DescriptionListGroup>
  </div>
</div>
