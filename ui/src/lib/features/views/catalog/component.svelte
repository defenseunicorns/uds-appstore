<script lang="ts">
	import { base } from '$app/paths';
	import { AppCard } from '$lib/components';
	import type { Application } from '$lib/types';
	import { onMount } from 'svelte';

	let catalog: Application[] = [];
	let isLoading = true;
	let error: string | null = null;

	async function fetchCatalog(): Promise<void> {
		try {
			const response = await fetch('/api/apps/index.json');
			if (response.ok) {
				catalog = await response.json();
			} else {
				throw new Error(`Failed to fetch resource: ${response.statusText}`);
			}
		} catch (e) {
			console.error('Error fetching catalog:', e);
			error = e instanceof Error ? e.message : 'An unknown error occurred';
			catalog = [];
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchCatalog();
	});
</script>

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
				{#each catalog as app}
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
