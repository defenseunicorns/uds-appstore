<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { AppCardHeader, DescriptionListGroup, DescriptionListItem } from '$lib/components';

	export let data: PageData;

	$: app = data.apps.find((a) => a.metadata.name == $page.params.id)!;
</script>

<AppCardHeader {app} />

<Tabs tabStyle="underline" contentClass="p-4 mt-4">
	<TabItem open title="Product Overview">
		<div class="grid grid-cols-5 gap-6">
			<div class="col-span-3">
				<div class="prose dark:prose-invert max-w-none">
					<SvelteMarkdown source={app.spec.description} />
				</div>
			</div>
			<div class="col-span-2 mt-4">
				<div class="mt-4 grid w-full grid-cols-1 gap-4">
					<DescriptionListGroup title="Contracting Details">
						<DescriptionListItem key="Contracting Number" value={app.spec.contractingDetails?.number} />
						<DescriptionListItem key="Pricing Model" value={app.spec.contractingDetails?.pricing} />
						<DescriptionListItem key="Small Business Status" value={app.spec.contractingDetails?.smallBusinessStatus} />
						<DescriptionListItem key="Delivery Timeline" value="-" />
						<DescriptionListItem key="Business Category" value={app.spec.keywords?.join(', ')} />
					</DescriptionListGroup>

					<DescriptionListGroup title="Authorization Details">
						<DescriptionListItem key="FIPS Compliant Image(s)" value={app.spec.authorizationDetails?.fips ? 'Yes' : 'No'} />
						<DescriptionListItem key="NIST 800-53" value={app.spec.authorizationDetails?.nist800_53 ? 'Available' : '-'} />
						<DescriptionListItem key="CVE Report" value={app.spec.authorizationDetails?.cveReport ? 'Yes' : 'No'} />
						<DescriptionListItem key="SBOM" value={app.spec.authorizationDetails?.sbom ? 'Yes' : 'No'} />
					</DescriptionListGroup>

					<DescriptionListGroup title="Technical Details">
						<DescriptionListItem key="Infrastructure" value={app.spec.providers?.join(', ')} />
						<DescriptionListItem key="Architecture(s)" value={app.spec.architecture?.join(', ')} />
					</DescriptionListGroup>
				</div>
			</div>
		</div>
	</TabItem>
	<TabItem title="Security & Compliance"></TabItem>
	<TabItem title="Package Config"></TabItem>
	<TabItem title="Contracting Info"></TabItem>
</Tabs>
