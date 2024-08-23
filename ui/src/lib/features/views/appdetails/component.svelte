<script lang="ts">
	import { Launch } from 'carbon-icons-svelte';
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
	<div class="p-4">
		<div class="flex flex-wrap items-center justify-between">
			<div class="hflex items-center justify-start">
				<AppCardHeader {app} />
			</div>
			<div class="items-right flex">
				<a
					class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					href="https://www.defenseunicorns.com/contactus"
				>
					Talk with a Mission Specialist
				</a>
			</div>
		</div>

		<Tabs tabStyle="underline" contentClass="p-4 mt-4">
			<TabItem open title="Product Overview">
				<div class="grid grid-cols-5 gap-6">
					<div class="col-span-3">
						<div
							class="prose max-w-none dark:prose-invert prose-a:font-light prose-a:text-blue-600 prose-a:no-underline dark:prose-a:text-blue-500"
						>
							<SvelteMarkdown source={app.spec.description} />

							<h4>Why Deploy on UDS:</h4>
							<p>
								Deploying {app.spec.title} on UDS, ensures a zero-vulnerability posture with continuous
								security monitoring and updates. The application is pre-integrated into our DoD compliant
								DevSecOps platform and which provides comprehensive documentation to accelerate Authority
								to Operate (ATO) preparation, streamlining delivery to any mission environment.
							</p>

							<p>
								Have questions about how to get {app.spec.title} deployed into your mission environment?
								Our DoD mission specialists are available to discuss your specific mission needs and
								explore how this UDS-optimized solution could support your teams operations.
								<a href="https://www.defenseunicorns.com/contactus">Talk to a mission specialist.</a
								>
							</p>

							<h4>Additional Resources</h4>
							{#each app.spec.links as link}
								<a href={link.url}>
									{link.description}
									<Launch class="inline" />
								</a>
								<br />
							{/each}
						</div>
					</div>
					<div class="col-span-2">
						<div class="grid w-full grid-cols-1 gap-4">
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
									key="Impact Level"
									value={app.spec.security?.impactLevel?.join(', ')}
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
