<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { onMount, afterUpdate } from 'svelte';
  import tailwindConfig from '$lib/tailwind-config';
  import { Category, PricingModel, Infrastructure, Architecture, ImpactLevel } from '$lib/types';
  import { ChevronDown } from 'carbon-icons-svelte';
  import { type Filter, applicationStore } from '$lib/stores';
  import type {
    CatalogStore,
    SelectedFilters
  } from '$lib/stores/applicationstore/applicationstore';

  export const isOpen = writable(true);
  export let routes: string[] = [];

  let innerWidth: number;
  let sidebarElement: HTMLElement;
  let selectedFilters: SelectedFilters;
  let collapsedFilters: { [key: string]: boolean } = {};

  const mdBreakpoint = parseInt(tailwindConfig.theme.screens.md);

  const sidebarFilters: Filter[] = [
    {
      label: 'Category',
      values: Object.values(Category) as string[],
      field: 'spec.categories'
    },
    {
      label: 'Pricing Model',
      values: Object.values(PricingModel) as string[],
      field: 'spec.contractingDetails.pricingModel'
    },
    {
      label: 'Impact Level',
      values: Object.values(ImpactLevel) as string[],
      field: 'spec.security.impactLevel'
    },
    {
      label: 'Infrastructure',
      values: Object.values(Infrastructure) as string[],
      field: 'spec.infrastructure'
    },
    {
      label: 'Architecture',
      values: Object.values(Architecture) as string[],
      field: 'spec.architecture'
    }
  ];

  // Subscribe to the application store
  const unsubscribeCatalog = applicationStore.subscribe((store) => {
    selectedFilters = store.selectedFilters;
  });

  // Toggle the collapsed state of a filter

  function toggleFilter(filter: string) {
    collapsedFilters[filter] = !collapsedFilters[filter];
  }

  // Handle filter change
  function handleFilterChange(filter: Filter, category: string) {
    applicationStore.update((store: CatalogStore) => {
      // Update the selected filters
      const filterValues = store.selectedFilters.get(filter.field) || [];

      // Add or remove the category from the selected filters
      if (!filterValues.includes(category)) {
        filterValues.push(category);
      } else {
        filterValues.splice(filterValues.indexOf(category), 1);
      }

      // Update the selected filters
      store.selectedFilters.set(filter.field, filterValues);
      return store;
    });

    // Filter the applications
    applicationStore.filterApplications();
  }

  // Clear the selected filters
  function clearFilters() {
    applicationStore.setSelectedFilters(new Map());
    applicationStore.filterApplications();
  }

  // Update the sidebar --sidebar-width css variable
  function updateSidebarWidth() {
    if (sidebarElement && isValidRoute) {
      const sidebarWidth = sidebarElement.offsetWidth;
      document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
  }

  // Update the sidebar width and visibility on window resize
  function handleResize() {
    isOpen.set(!isSmallScreen);
    updateSidebarWidth();
  }

  onMount(() => {
    handleResize();
    updateSidebarWidth();
    window.addEventListener('resize', handleResize);
    return () => {
      clearFilters();
      unsubscribeCatalog();
      window.removeEventListener('resize', handleResize);
    };
  });

  // Update the sidebar width and visibility on navigation change
  afterUpdate(() => {
    updateSidebarWidth();
  });

  $: isSmallScreen = innerWidth < mdBreakpoint;
  $: isValidRoute = routes.includes($page.url.pathname);
  $: {
    if (isSmallScreen) {
      clearFilters();
    }
  }
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

{#if isValidRoute}
  <div
    bind:this={sidebarElement}
    id="filter-sidebar"
    class="flex h-[calc(100vh-var(--nav-height))] min-w-64 flex-col items-start justify-start gap-3 overflow-y-hidden border-r border-gray-700 bg-gray-800 transition-transform duration-300 ease-in-out"
    class:translate-x-0={$isOpen}
    class:-translate-x-full={!$isOpen}
    class:hidden={isSmallScreen}
    class:md:block={!isSmallScreen}
  >
    <div class="flex h-full w-full flex-col items-start justify-start gap-3 overflow-y-scroll p-4">
      {#each sidebarFilters as filter}
        <div
          class="flex w-full flex-col items-start justify-start gap-3 border-b border-gray-700 p-4"
        >
          <button
            class="flex w-full items-center justify-between text-base font-semibold text-white"
            on:click={() => toggleFilter(filter.label)}
          >
            <span>{filter.label}</span>
            <span
              class="h-5 w-5 transform transition-transform duration-200"
              class:rotate-180={collapsedFilters[filter.label]}
            >
              <ChevronDown />
            </span>
          </button>
          <div
            class:hidden={collapsedFilters[filter.label]}
            id="filter-values-{filter.label}"
            class="mt-2 flex w-full flex-col items-start justify-start gap-3"
          >
            {#each filter.values || [] as category}
              <div class="flex w-full items-center justify-start">
                <label class="flex items-center gap-2 rounded" for={`category-${category}`}>
                  <input
                    id={`category-${category}`}
                    type="checkbox"
                    checked={selectedFilters.get(filter.field)?.includes(category)}
                    on:change={() => handleFilterChange(filter, category)}
                    class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span class="text-sm font-medium text-white">{category}</span>
                </label>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
