<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import tailwindConfig from '$lib/tailwind-config';

	export const isOpen = writable(true);
	export let routes: string[] = [];

	let innerWidth: number;
	let navElement: HTMLElement;

	const mdBreakpoint = parseInt(tailwindConfig.theme.screens.md); // Tailwind's default md breakpoint

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
				<div class="h-3 w-3"></div>
			</div>
			<div class="flex w-full flex-col items-start justify-start gap-3">
				{#each ['AI/ML', 'Arcade', 'Business', 'Databases', 'Developer Tools', 'Kubernetes (K8s)', 'Networking', 'Productivity', 'Security', 'Web'] as category}
					<div class="flex w-full items-center justify-start">
						<div class="flex items-center gap-2 rounded">
							<div class="h-4 w-4 rounded border border-gray-600 bg-gray-700"></div>
							<span class="text-sm font-medium text-white">{category}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
