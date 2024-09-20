<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import TabList from '$lib/components/Tabs/TabList.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import type { Application } from '$lib/types/gen';
	import SvelteMarkdown from 'svelte-markdown';
	import { Information, Launch } from 'carbon-icons-svelte';
	import Details from '../Details/Details.svelte';
	import { Alert, Button } from 'flowbite-svelte';

	const tabs = ['Product Overview', 'Security & Compliance', 'Contracting', 'Authorization'];

	export let activeTab: string = tabs[0];
	export let app: Application;
</script>

<div class="flex flex-col gap-6">
	<TabList>
		{#each tabs as tab}
			<TabItem label={tab} bind:activeTab />
		{/each}
	</TabList>
	<div class="flex flex-col gap-6 md:flex-row">
		<div class="flex-1">
			{#if activeTab === tabs[0]}
				<div
					class="prose max-w-none dark:prose-invert prose-a:font-light prose-a:text-blue-600 prose-a:no-underline dark:prose-a:text-blue-500"
				>
					{#if app.spec?.tagline}
						<SvelteMarkdown source={app.spec.tagline} />
					{/if}
					{#if app.spec?.description}
						<p>{app.spec.description}</p>
					{/if}

					<h4>Why Deploy on UDS:</h4>
					<p>
						Deploying {app.spec?.title} on UDS, ensures a zero-vulnerability posture with continuous
						security monitoring and updates. The application is pre-integrated into our DoD compliant
						DevSecOps platform and which provides comprehensive documentation to accelerate Authority
						to Operate (ATO) preparation, streamlining delivery to any mission environment.
					</p>

					<p>
						Have questions about how to get {app.spec?.title} deployed into your mission environment?
						Our DoD mission specialists are available to discuss your specific mission needs and explore
						how this UDS-optimized solution could support your teams operations.
						<a href="https://www.defenseunicorns.com/contactus">Talk to a mission specialist.</a>
					</p>

					<h4>Additional Resources</h4>
					{#each app.spec?.links ?? [] as link}
						<a href={link.url}>
							{link.description}
							<Launch class="inline" />
						</a>
						<br />
					{/each}
				</div>
			{:else if activeTab === tabs[1]}
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
			{:else if activeTab === tabs[2]}
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
			{:else if activeTab === tabs[3]}
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
			{/if}
		</div>
		<Details {app} />
	</div>
</div>
