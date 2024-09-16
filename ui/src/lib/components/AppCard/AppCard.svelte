<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { Application } from '$lib/types';
	import { AppCardHeader } from '$lib/components';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { truncateString } from '$lib/utils/helpers';

	export let app: Application;

	let description = 'No description available';
	$: {
		if (app.spec?.description) {
			description = truncateString(app.spec.description, 150);
		}
	}
</script>

<div
	class="app-card inline-flex min-h-[329px] w-full max-w-[360px] flex-col items-start justify-start rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 md:w-[360px]"
>
	<AppCardHeader {app} />
	<div class="flex h-[201px] flex-col items-start justify-start gap-5 self-stretch pt-5">
		<div
			class="app-card-description h-[120px] self-stretch overflow-hidden text-base font-normal leading-normal text-gray-700 dark:text-gray-300"
		>
			{#if description && description.trim() !== ''}
				<SvelteMarkdown source={description} />
			{:else}
				<div class="text-sm font-medium leading-[21px] text-gray-700 dark:text-gray-300">
					{description}
				</div>
			{/if}
		</div>
		<div class="inline-flex items-center justify-end gap-2.5 self-stretch">
			<a
				href="/apps/{app.metadata?.name}"
				class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-5 py-2.5 dark:border-gray-600 dark:bg-gray-700"
			>
				<div class="text-sm font-medium leading-[21px] text-gray-700 dark:text-gray-300">
					Learn More
				</div>
				<div class="relative h-3.5 w-3.5">
					<ArrowRight />
				</div>
			</a>
		</div>
	</div>
</div>
