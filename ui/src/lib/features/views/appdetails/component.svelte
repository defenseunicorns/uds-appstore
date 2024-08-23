<script lang="ts">
	import { Launch, Information } from 'carbon-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { Tabs, TabItem, Alert, Button } from 'flowbite-svelte';
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
			<div class="flex items-center justify-start">
				<AppCardHeader {app} />
			</div>
			<div class="items-right flex">
				<Button size="md" color="blue" href="https://www.defenseunicorns.com/contactus">
					Talk with a Mission Specialist
				</Button>
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
			<TabItem title="Security & Compliance">
				<Alert color="blue">
					<div class="flex items-center gap-3">
						<Information class="h-5 w-5" />
						<h3 class="text-lg font-medium">Information Coming Soon!</h3>
					</div>
					<p class="mb-4 mt-2 text-sm">
						We're currently developing this section to provide you with comprehensive security and
						compliance information. In the meantime, our mission experts are ready to assist you
						with available security and compliance documentation for this application deployed with
						UDS.
					</p>
					<div class="flex gap-2">
						<Button
							size="xs"
							color="alternative"
							outline
							href="https://www.defenseunicorns.com/contactus"
						>
							Request More Information
						</Button>
					</div>
				</Alert>
			</TabItem>
			<TabItem title="Contracting">
				<Alert color="blue">
					<div class="flex items-center gap-3">
						<Information class="h-5 w-5" />
						<h3 class="text-lg font-medium">Information Coming Soon!</h3>
					</div>
					<p class="mb-4 mt-2 text-sm">
						We're currently developing this section to provide you with comprehensive contracting
						information. In the meantime, our mission experts are ready to assist you with any
						specific information you need about available contracting vehicles for getting this
						application with UDS.
					</p>
					<div class="flex gap-2">
						<Button
							size="xs"
							color="alternative"
							outline
							href="https://www.defenseunicorns.com/contactus"
						>
							Request More Information
						</Button>
					</div>
				</Alert>
			</TabItem>
			<TabItem title="Authorization">
				<Alert color="blue">
					<div class="flex items-center gap-3">
						<Information class="h-5 w-5" />
						<h3 class="text-lg font-medium">Information Coming Soon!</h3>
					</div>
					<p class="mb-4 mt-2 text-sm">
						We're currently developing this section to provide you with comprehensive authorization
						information. In the meantime, our mission experts are ready to assist you with any
						specific authorization documentation or information you need for this application
						deployed on UDS.
					</p>
					<div class="flex gap-2">
						<Button
							size="xs"
							color="alternative"
							outline
							href="https://www.defenseunicorns.com/contactus"
						>
							Request More Information
						</Button>
					</div>
				</Alert>
			</TabItem>
		</Tabs>
	</div>
{/if}
