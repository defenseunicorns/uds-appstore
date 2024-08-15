<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';

	import { afterNavigate } from '$app/navigation';

	import { isSidebarExpanded, Navbar, Sidebar } from '$lib/features/navigation';
	import '../app.postcss';

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
	<div class="flex-grow overflow-hidden overflow-y-auto p-4">
		<slot />
	</div>
</main>
