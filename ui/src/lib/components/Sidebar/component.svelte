<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { routes } from '$lib/features/navigation/routes';

	export const isOpen = writable(true);

	let innerWidth: number;

	$: isSmallScreen = innerWidth < 768;
	$: isAppsRoute = $page.url.pathname === routes[0].path;

	function handleResize() {
		if (isSmallScreen) {
			isOpen.set(false);
		} else {
			isOpen.set(true);
		}
	}
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />

{#if isAppsRoute}
	{#if $isOpen}
		<div
			transition:slide={{ axis: 'x', duration: 300 }}
			class="fixed left-0 top-16 z-50 flex h-[calc(100vh-64px)] w-64 flex-col items-start justify-start gap-3 overflow-y-auto border-r border-gray-700 bg-gray-800"
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
{/if}
