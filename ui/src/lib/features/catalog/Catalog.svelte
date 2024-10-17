<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { base } from '$app/paths';
  import { Alert, AppCard } from '$lib/components';
  import { applicationStore } from '$lib/stores';
  import type { Application } from '$lib/types';
  import { onMount } from 'svelte';
  import CatalogHeader from '$lib/features/catalog/CatalogHeader.svelte';
  import { APP_CARD_WIDTH } from '$lib/constants';

  let innerWidth: number;
  let isLoading = true;
  let error: string | undefined;
  let applications: Application[] = [];
  let scrolling = false;

  let screenSize: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  $: screenSize =
    innerWidth < 640
      ? 'base'
      : innerWidth < 768
        ? 'sm'
        : innerWidth < 1024
          ? 'md'
          : innerWidth < 1280
            ? 'lg'
            : innerWidth < 1536
              ? 'xl'
              : '2xl';

  const unsubscribe = applicationStore.subscribe(($store) => {
    isLoading = $store.loading;
    error = $store.error;
    applications = $store.filteredApplications;
  });

  const responsiveNumCardsPerRow = {
    base: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 3,
    '2xl': 4
  };
  $: maxHeaderWidth =
    screenSize === 'base'
      ? ' '
      : APP_CARD_WIDTH * responsiveNumCardsPerRow[screenSize] +
        (responsiveNumCardsPerRow[screenSize] - 1);

  $: responsiveGridClass = `grid grid-flow-row grid-cols-${responsiveNumCardsPerRow[screenSize]} gap-4`;

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:window bind:innerWidth />
<!--padding right adjusted separately to account for scrollbar-->
<div
  class="custom-scroll flex h-full max-h-[calc(100vh-var(--navbar-height))] flex-col items-center overflow-y-auto py-9 pl-9 pr-[28px]"
  class:scroll-active={scrolling}
  on:scroll={() => (scrolling = true)}
  on:scrollend={() => (scrolling = false)}
>
  <!--style property on CatalogHeader div required for reactive width-->
  <div style="max-width: {maxHeaderWidth}rem;">
    <CatalogHeader />
  </div>
  <div class={responsiveGridClass}>
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
      {#each applications as app}
        <AppCard {app} />
      {/each}
    {/if}
  </div>
</div>
