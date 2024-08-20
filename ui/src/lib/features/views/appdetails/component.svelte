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

		<Tabs tabStyle="underline" contentClass="p-4 mt-4">
			<TabItem open title="Product Overview">
				<div class="grid grid-cols-5 gap-6">
					<div class="col-span-3">
						<div class="prose max-w-none dark:prose-invert">
							<SvelteMarkdown source={app.spec.description} />
						</div>
					</div>
					<div class="col-span-2 mt-4">
						<div class="mt-4 grid w-full grid-cols-1 gap-4">
							<DescriptionListGroup title="Contracting Details">
								<DescriptionListItem
									key="Contracting Vehicle(s)"
									value={app.spec.contractingDetails?.vehicle?.join(', ')}
								/>
								<!-- <DescriptionListItem
									key="Contracting Number"
									value={app.spec.contractingDetails?.number}
								/> -->
								<DescriptionListItem
									key="Pricing Model"
									value={app.spec.contractingDetails?.pricing?.join(', ')}
								/>
								<!-- <DescriptionListItem
									key="Small Business Status"
									value={app.spec.contractingDetails?.smallBusinessStatus}
								/> -->
								<DescriptionListItem
									key="Business Category"
									value={app.spec.keywords?.join(', ')}
								/>
							</DescriptionListGroup>

							<!-- <DescriptionListGroup title="Authorization Details">
								<DescriptionListItem key="FedRAMP Status" value="-" />
							</DescriptionListGroup> -->

							<DescriptionListGroup title="Security & Compliance">
								<DescriptionListItem
									key="FIPS Compliant Image(s)"
									value={app.spec.security?.fips ? 'Available' : '-'}
								/>
								<DescriptionListItem
									key="NIST 800-53"
									value={app.spec.security?.nist800_53 ? 'Available' : '-'}
								/>
								<DescriptionListItem
									key="CVE Report"
									value={app.spec.security?.cveReport ? 'Available' : '-'}
								/>
								<DescriptionListItem
									key="SBOM"
									value={app.spec.security?.sbom ? 'Available' : '-'}
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
		</Tabs>
	</div>
{/if}
