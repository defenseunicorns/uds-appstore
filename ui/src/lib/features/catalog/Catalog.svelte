<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import { base } from '$app/paths';
	import { AppCard, Alert } from '$lib/components';
	import Sidebar from './Sidebar/Sidebar.svelte';
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

<div class="flex h-full w-full overflow-hidden">
	<Sidebar routes={['/apps']} />
	<div class="container flex h-full flex-shrink flex-col overflow-y-auto py-9">
		<div class="mx-auto w-full max-w-[1200px] gap-y-9 px-4 sm:px-6 lg:px-8">
			<div class="catalog-header mb-8">
				<div class="text-2xl font-semibold leading-9">Applications Deployable on UDS</div>
				<div class="text-lg font-normal">
					Secure mission applications that can be deployed anywhere with Unicorn Delivery Service.
				</div>
			</div>
			{#if isLoading}
				<div class="flex h-full items-center justify-center">
					<img src="{base}/images/dougandserver.svg" alt="UDS Logo" class="h-20 w-20" />
					<p class="ml-4 text-lg">Loading applications...</p>
				</div>
			{:else if error}
				<Alert color="danger" title="Error" message="Failed to fetch applications"></Alert>
			{:else if applications.length === 0}
				<Alert
					color="info"
					title="No applications found"
					message={`The search query "${applicationStore.getSearchQuery()}" did not match any known applications.`}
				/>
			{:else}
				<div class="catalog-apps flex flex-wrap justify-center gap-2 md:justify-start md:gap-6">
					{#each applications as app}
						<div class="mb-4 w-full sm:w-auto">
							<AppCard {app} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
