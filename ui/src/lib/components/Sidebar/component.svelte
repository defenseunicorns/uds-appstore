<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import tailwindConfig from '$lib/tailwind-config';
	import { Category, PricingModel, Infrastructure, Architecture, ImpactLevel } from '$lib/types';
	import { ChevronDown } from 'carbon-icons-svelte';
	import { applicationStore, type FilterMap } from '$lib/stores';

	export const isOpen = writable(true);
	export let routes: string[] = [];

	const mdBreakpoint = parseInt(tailwindConfig.theme.screens.md);

	type FilterDropdowns = {
		label: string;
		values?: string[];
		key: string;
	};

	const sidebarFilters: FilterDropdowns[] = [
		{
			label: 'Category',
			values: Object.values(Category),
			key: 'categories'
		},
		{
			label: 'Pricing Model',
			values: Object.values(PricingModel) as string[],
			key: 'pricingModel'
		},
		{
			label: 'Impact Level',
			values: Object.values(ImpactLevel) as string[],
			key: 'impactLevel'
		},
		{
			label: 'Infrastructure',
			values: Object.values(Infrastructure) as string[],
			key: 'infrastructure'
		},
		{
			label: 'Architecture',
			values: Object.values(Architecture) as string[],
			key: 'architecture'
		}
	];

	const selectedFilters: Writable<FilterMap> = writable(new Map());

	let innerWidth: number;
	let navElement: HTMLElement;
	let collapsedFilters: { [key: string]: boolean } = {};

	function handleResize() {
		isOpen.set(!isSmallScreen);
		updateSidebarWidth();
	}

	function updateSidebarWidth() {
		if (navElement) {
			document.documentElement.style.setProperty('--sidebar-width', `${navElement.offsetWidth}px`);
		}
	}

	function toggleFilter(filter: string) {
		collapsedFilters[filter] = !collapsedFilters[filter];
	}

	function handleFilterChange(filter: string, category: string) {
		selectedFilters.update((currentFilters) => {
			const filterValues = currentFilters.get(filter) || [];
			if (!filterValues.includes(category)) {
				filterValues.push(category);
			} else {
				filterValues.splice(filterValues.indexOf(category), 1);
			}
			currentFilters.set(filter, filterValues);
			return currentFilters;
		});

		applicationStore.filterApplications($selectedFilters);
	}

	function clearFilters() {
		selectedFilters.set(new Map());
		applicationStore.filterApplications($selectedFilters);
	}

	onMount(() => {
		handleResize();
		return () => {
			clearFilters();
		};
	});

	afterUpdate(() => {
		updateSidebarWidth();
	});

	$: isSmallScreen = innerWidth < mdBreakpoint;
	$: isAppsRoute = routes.includes($page.url.pathname);
	$: {
		if (isSmallScreen) {
			clearFilters();
		}
	}
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

{#if isAppsRoute}
	<div
		bind:this={navElement}
		id="filter-sidebar"
		class="fixed left-0 top-[var(--nav-height)] z-40 flex h-[calc(100vh-var(--nav-height))] w-64 flex-col items-start justify-start gap-3 overflow-y-auto border-r border-gray-700 bg-gray-800 transition-transform duration-300 ease-in-out"
		class:translate-x-0={$isOpen}
		class:-translate-x-full={!$isOpen}
		class:hidden={isSmallScreen}
		class:md:block={!isSmallScreen}
	>
		<div class="flex w-full flex-col items-start justify-start gap-3 p-4">
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
										checked={$selectedFilters.get(filter.key)?.includes(category)}
										on:change={() => handleFilterChange(filter.key, category)}
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
