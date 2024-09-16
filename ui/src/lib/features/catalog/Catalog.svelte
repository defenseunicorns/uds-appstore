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
	<div class="flex w-full flex-col items-center justify-center md:items-start">
		<h1 class="mb-2 max-w-[360px] text-2xl font-semibold leading-9 md:max-w-full md:text-3xl">
			Applications Deployable on UDS
		</h1>
		<h2 class="max-w-[360px] text-lg font-normal md:max-w-full">
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
		{:else if applications.length === 0}
			<p class="rounded-lg bg-red-300 p-4 text-center text-lg dark:bg-red-400">
				No applications found matching your search.
			</p>
		{:else}
			<div class="flex flex-wrap justify-center gap-4 md:justify-start">
				{#each applications as app}
					<div class="mb-4">
						<AppCard {app} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
