<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import Themetoggle from '../themetoggle/component.svelte';
	import { onMount } from 'svelte';

	let navElement: HTMLElement;

	onMount(() => {
		if (navElement) {
			document.documentElement.style.setProperty('--nav-height', `${navElement.offsetHeight}px`);
		}
	});
</script>

<div class="bg-gray-900 antialiased">
	<nav
		bind:this={navElement}
		class="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-gray-800 px-6 py-2.5 dark:border-gray-700"
	>
		<div class="flex flex-wrap items-center justify-between">
			<div class="flex items-center justify-start text-2xl leading-9 text-white">
				<a href="/" class="mr-4 flex">
					<img src="/doug.svg" class="mr-3 h-8" alt="uds marketplace logo" />
					<span class="font-normal">UDS <span class="font-semibold">Marketplace</span></span>
				</a>
			</div>
			<div class="flex items-center lg:order-2">
				<Themetoggle />
			</div>
		</div>
	</nav>
</div>
