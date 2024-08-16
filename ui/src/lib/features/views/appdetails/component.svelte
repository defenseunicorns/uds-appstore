<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { applicationStore } from '$lib/stores';
	import { AppCardHeader, DescriptionListGroup, DescriptionListItem } from '$lib/components';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Application } from '$lib/types';

	export let id: string;

	let app: Application | undefined;
	let appCount: number;
	let error: string | undefined;
	const unsubscribe = applicationStore.subscribe(($store) => {
		app = $store.applications.get(id);
		appCount = $store.applications.size || 0;
		error = $store.error;
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});

	$: {
		if ((appCount && !app) || error) {
			goto('/404', { replaceState: true });
		}
	}
</script>

{#if app}
	<div class="flex h-full flex-col overflow-hidden">
		<AppCardHeader {app} />

		<Tabs tabStyle="underline" contentClass="p-4 mt-4 h-full overflow-y-auto">
			<TabItem open title="Product Overview">
				<div class="flex overflow-hidden">
					<div class="w-3/5 overflow-y-auto pr-6">
						<div class="prose max-w-none dark:prose-invert">
							<SvelteMarkdown source={app.spec.description} />
						</div>
					</div>
					<div class="w-2/5 overflow-y-auto pl-6">
						<div class="mt-4 flex flex-col gap-4">
							<DescriptionListGroup title="Contracting Details">
								<DescriptionListItem
									key="Contracting Number"
									value={app.spec.contractingDetails?.number}
								/>
								<DescriptionListItem
									key="Pricing Model"
									value={app.spec.contractingDetails?.pricing}
								/>
								<DescriptionListItem
									key="Small Business Status"
									value={app.spec.contractingDetails?.smallBusinessStatus}
								/>
								<DescriptionListItem key="Delivery Timeline" value="-" />
								<DescriptionListItem
									key="Business Category"
									value={app.spec.keywords?.join(', ')}
								/>
							</DescriptionListGroup>

							<DescriptionListGroup title="Authorization Details">
								<DescriptionListItem
									key="FIPS Compliant Image(s)"
									value={app.spec.authorizationDetails?.fips ? 'Yes' : 'No'}
								/>
								<DescriptionListItem
									key="NIST 800-53"
									value={app.spec.authorizationDetails?.nist800_53 ? 'Available' : '-'}
								/>
								<DescriptionListItem
									key="CVE Report"
									value={app.spec.authorizationDetails?.cveReport ? 'Yes' : 'No'}
								/>
								<DescriptionListItem
									key="SBOM"
									value={app.spec.authorizationDetails?.sbom ? 'Yes' : 'No'}
								/>
							</DescriptionListGroup>

							<DescriptionListGroup title="Technical Details">
								<DescriptionListItem key="Infrastructure" value={app.spec.providers?.join(', ')} />
								<DescriptionListItem
									key="Architecture(s)"
									value={app.spec.architecture?.join(', ')}
								/>
							</DescriptionListGroup>
						</div>
					</div>
				</div>
			</TabItem>
			<TabItem title="Security & Compliance"></TabItem>
			<TabItem title="Package Config"></TabItem>
			<TabItem title="Contracting Info"></TabItem>
		</Tabs>
	</div>
{/if}
