<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';

	import { afterNavigate } from '$app/navigation';

	import { Navbar } from '$lib/features/navigation';
	import '../app.postcss';
	import { Sidebar } from '$lib/components';

	afterNavigate(initFlowbite);
</script>

<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<Navbar />
<Sidebar routes={['/apps']} />

<main
	class="dark:focus:ring-primary-900 relative h-screen w-full overflow-hidden transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<div
		class="relative
		 mt-[var(--nav-height)] h-full overflow-y-auto px-9 py-9 md:mx-0 md:ml-[var(--sidebar-width)] md:px-24"
	>
		<slot />
	</div>
</main>
