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

<div class="w-100 container pb-8">
	<div class="mb-8 flex flex-col items-start justify-start">
		<h1 class="mb-2 text-2xl font-semibold leading-9 md:text-3xl">
			Applications Deployable on UDS
		</h1>
		<p class="text-lg font-normal leading-[27px]">
			Secure mission applications that can be deployed anywhere with Unicorn Delivery Service.
		</p>
	</div>
	<div class="container">
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
					<div class="mb-4 px-2">
						<div class="flex justify-center">
							<AppCard {app} />
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
