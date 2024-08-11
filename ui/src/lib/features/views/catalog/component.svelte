<script lang="ts">
	import { base } from '$app/paths';
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

<div class="h-screen overflow-y-auto">
	<div class="w-full max-w-full px-4 py-4 sm:py-8 md:py-12 lg:py-16">
		<div class="mx-auto max-w-3xl">
			<div class="mx-auto mb-8 max-w-sm drop-shadow-2xl sm:mb-12 md:mb-16">
				<img src="{base}/images/dougandserver.svg" alt="UDS Logo" class="h-auto w-full" />
			</div>
			{#if isLoading}
				<p class="text-center">Loading applications...</p>
			{:else if error}
				<p class="text-center text-red-500">Error: {error}</p>
			{:else}
				<h1 class="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
					UDS Packages ({catalog.length}) coming soon!
				</h1>
			{/if}
		</div>
	</div>
</div>
