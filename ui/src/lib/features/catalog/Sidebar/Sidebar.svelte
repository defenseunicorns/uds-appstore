<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import tailwindConfig from '$lib/tailwind-config';
  import { Architecture, Category, Infrastructure, PricingModel, Security } from '$lib/types';
  import { ChevronDown } from 'carbon-icons-svelte';
  import { applicationStore, type Filter } from '$lib/stores';
  import type {
    CatalogStore,
    SelectedFilters
  } from '$lib/stores/applicationstore/applicationstore';
  import { SearchInput } from '$lib/components';

  export const isOpen = writable(true);
  export let routes: string[] = [];

  let innerWidth: number;
  let selectedFilters: SelectedFilters;
  let collapsedFilters: { [key: string]: boolean } = {};
  let scrolling = false;

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
      label: 'Supported Infrastructure',
      values: Object.values(Infrastructure) as string[],
      field: 'spec.infrastructure'
    },
    {
      label: 'Security',
      values: Object.values(Security) as string[],
      field: 'spec.security'
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

  // Update the sidebar visibility on window resize
  function handleResize() {
    isOpen.set(!isSmallScreen);
  }

  onMount(() => {
    handleResize();
    // updateSidebarWidth();
    window.addEventListener('resize', handleResize);
    return () => {
      clearFilters();
      unsubscribeCatalog();
      window.removeEventListener('resize', handleResize);
    };
  });

  $: isSmallScreen = innerWidth < mdBreakpoint;
  $: isValidRoute = routes.includes($page.url.pathname);
  $: {
    if (isSmallScreen) {
      clearFilters();
    }
  }

  function handleSearch(searchQuery: string) {
    applicationStore.setSearchQuery(searchQuery);
    applicationStore.filterApplications();
  }
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

{#if isValidRoute}
  <div
    id="filter-sidebar"
    class="custom-scroll flex w-[var(--sidebar-width)] min-w-[var(--sidebar-width)] flex-col items-start justify-start gap-3 overflow-y-auto border-r border-gray-700 bg-gray-800"
    class:translate-x-0={$isOpen}
    class:-translate-x-full={!$isOpen}
    class:hidden={isSmallScreen}
    class:md:block={!isSmallScreen}
    class:scroll-active={scrolling}
    on:scroll={() => (scrolling = true)}
    on:scrollend={() => (scrolling = false)}
  >
    <div>
      <div class="w-full p-4">
        <SearchInput {handleSearch} />
      </div>
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
