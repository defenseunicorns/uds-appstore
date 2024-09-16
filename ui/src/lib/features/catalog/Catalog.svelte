<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

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
		applications = $store.filteredApplications;
	});

	onMount(() => {
		return () => {
			unsubscribe();
		};
	});
</script>

<div class="container mx-auto p-4 md:p-6">
	<div class="w-full">
		<h1 class="mb-2 text-2xl font-semibold leading-9 md:text-3xl">
			Applications Deployable on UDS
		</h1>
		<h2 class="text-lg font-normal">
			Secure mission applications that can be deployed anywhere with Unicorn Delivery Service.
		</h2>
	</div>
	<div class="w-full pt-4">
		{#if isLoading}
			<div class="flex h-full items-center justify-center">
				<img src="{base}/images/dougandserver.svg" alt="UDS Logo" class="h-20 w-20" />
				<p class="ml-4 text-lg">Loading applications...</p>
			</div>
		{:else if error}
			<p class="text-center text-lg text-red-500">Error: {error}</p>
		{:else}
			<div class="flex flex-wrap justify-center md:justify-start">
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
