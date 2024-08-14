<script lang="ts">
	import { base } from '$app/paths';
	import { AppCard } from '$lib/components';
	import { applicationsStore } from '$lib/stores/applicationstore/applicationstore';
	import { onMount } from 'svelte';

	let isLoading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			await applicationsStore.fetchCatalog();
			isLoading = false;
		} catch (e) {
			error = e instanceof Error ? e.message : 'An unknown error occurred';
			isLoading = false;
		}
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
				{#each applicationsStore.getApplications() as app}
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
