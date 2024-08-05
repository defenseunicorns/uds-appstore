<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';
	import { onMount } from 'svelte';

	import { afterNavigate } from '$app/navigation';

	import { isSidebarExpanded, Navbar, Sidebar } from '$lib/features/navigation';
	import '../app.postcss';

	onMount(() => {
		initFlowbite();
	});
	afterNavigate(initFlowbite);
</script>

<Navbar />

<Sidebar />
<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<main
	class="flex h-screen flex-col pt-16 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white {$isSidebarExpanded
		? 'md:ml-64'
		: 'md:ml-16'}"
>
	<div class="flex-grow overflow-hidden p-4 pt-0">
		<slot />
	</div>
</main>
