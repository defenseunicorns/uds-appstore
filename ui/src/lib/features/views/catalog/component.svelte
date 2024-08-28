<script lang="ts">
	import { base } from '$app/paths';
	import { AppCard } from '$lib/components';
	import { applicationStore } from '$lib/stores';
	import type { Application } from '$lib/types';
	import { onMount } from 'svelte';

	let isLoading = true;
	let error: string | undefined;
	let applications: Application[] = [];

	const unsubscribe = applicationStore.subscribe(($store) => {
		isLoading = $store.loading;
		error = $store.error;
		applications = Array.from($store.applications.values());
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});
</script>

<div class="inline-flex h-[71px] flex-col items-start justify-start gap-2 px-4">
	<div class="text-center text-2xl font-semibold leading-9 text-white">
		Applications Deployable on UDS
	</div>
	<div class="text-center text-lg font-normal leading-[27px] text-white">
		Secure mission applications that can be deployed anywhere with Unicorn Delivery Service.
	</div>
</div>
<div class="h-full overflow-y-auto">
	<div class="container mx-auto px-4 py-8">
		{#if isLoading}
			<div class="flex h-full items-center justify-center">
				<img src="{base}/images/dougandserver.svg" alt="UDS Logo" class="h-20 w-20" />
				<p class="ml-4 text-lg">Loading applications...</p>
			</div>
		{:else if error}
			<p class="text-center text-lg text-red-500">Error: {error}</p>
		{:else}
			<div class="-mx-2 flex flex-wrap">
				{#each applications as app}
					<div class="mb-4 w-full px-2 md:w-1/2 xl:w-1/3">
						<div class="flex justify-center md:justify-start">
							<AppCard {app} />
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
