<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { base } from '$app/paths';
  import { Alert, AppCard } from '$lib/components';
  import { applicationStore } from '$lib/stores';
  import type { Application } from '$lib/types';
  import { onMount } from 'svelte';
  import CatalogHeader from '$lib/features/catalog/CatalogHeader.svelte';

  let isLoading = true;
  let error: string | undefined;
  let applications: Application[] = [];
  let scrolling = false;

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

<!--Note- padding right adjusted separately to account for scrollbar-->
<div
  class="custom-scroll flex h-full max-h-[calc(100vh-var(--navbar-height))] flex-col items-center overflow-y-auto py-9 pl-9 pr-[28px]"
  class:scroll-active={scrolling}
  on:scroll={() => (scrolling = true)}
  on:scrollend={() => (scrolling = false)}
>
  <div class="flex w-full justify-center">
    <CatalogHeader />
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
    <div class="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {#each applications as app}
        <AppCard {app} />
      {/each}
    </div>
  {/if}
</div>
