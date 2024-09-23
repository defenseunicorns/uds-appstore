<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import type { Application } from '$lib/types';
	import { Launch } from 'carbon-icons-svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let app: Application;
</script>

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
		Deploying {app.spec?.title} on UDS, ensures a zero-vulnerability posture with continuous security
		monitoring and updates. The application is pre-integrated into our DoD compliant DevSecOps platform
		and which provides comprehensive documentation to accelerate Authority to Operate (ATO) preparation,
		streamlining delivery to any mission environment.
	</p>

	<p>
		Have questions about how to get {app.spec?.title} deployed into your mission environment? Our DoD
		mission specialists are available to discuss your specific mission needs and explore how this UDS-optimized
		solution could support your teams operations.
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
