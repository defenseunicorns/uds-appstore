<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import tailwindConfig from '$lib/tailwind-config';

	export const isOpen = writable(true);
	export let routes: string[] = [];

	// Create a writable store for selected categories
	export const selectedCategoriesStore = writable<string[]>([]);

	let innerWidth: number;
	let navElement: HTMLElement;

	const mdBreakpoint = parseInt(tailwindConfig.theme.screens.md);

	$: isSmallScreen = innerWidth < mdBreakpoint;
	$: isAppsRoute = routes.includes($page.url.pathname);

	function handleResize() {
		isOpen.set(!isSmallScreen);
		updateSidebarWidth();
	}

	function updateSidebarWidth() {
		if (navElement) {
			document.documentElement.style.setProperty('--sidebar-width', `${navElement.offsetWidth}px`);
		}
	}

	function handleCategoryChange(category: string) {
		selectedCategoriesStore.update((categories) => {
			const index = categories.indexOf(category);
			if (index === -1) {
				return [...categories, category];
			} else {
				return categories.filter((c) => c !== category);
			}
		});
	}

	onMount(() => {
		handleResize();
	});

	afterUpdate(() => {
		updateSidebarWidth();
	});
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

{#if isAppsRoute}
	<div
		bind:this={navElement}
		class="fixed left-0 top-[var(--nav-height)] z-40 flex h-[calc(100vh-var(--nav-height))] w-64 flex-col items-start justify-start gap-3 overflow-y-auto border-r border-gray-700 bg-gray-800 transition-transform duration-300 ease-in-out"
		class:translate-x-0={$isOpen}
		class:-translate-x-full={!$isOpen}
		class:hidden={isSmallScreen}
		class:md:block={!isSmallScreen}
	>
		<div class="flex w-full flex-col items-start justify-start gap-3 p-4">
			<div class="flex w-full items-center justify-between">
				<h2 class="text-base font-semibold text-white">Category</h2>
			</div>
			<div class="flex w-full flex-col items-start justify-start gap-3">
				{#each ['AI/ML', 'Arcade', 'Business', 'Databases', 'Developer Tools', 'Kubernetes (K8s)', 'Networking', 'Productivity', 'Security', 'Web'] as category}
					<div class="flex w-full items-center justify-start">
						<label class="flex items-center gap-2 rounded" for={`category-${category}`}>
							<input
								id={`category-${category}`}
								type="checkbox"
								checked={$selectedCategoriesStore.includes(category)}
								on:change={() => handleCategoryChange(category)}
								class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500"
							/>
							<span class="text-sm font-medium text-white">{category}</span>
						</label>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
