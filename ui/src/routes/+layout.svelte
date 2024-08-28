<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';
	import { onMount } from 'svelte';

	import { afterNavigate } from '$app/navigation';

	import { Navbar } from '$lib/features/navigation';
	import '../app.postcss';
	import { applicationStore } from '$lib/stores';
	import { Sidebar } from '$lib/components';

	onMount(async () => {
		await applicationStore.fetchCatalog();
	});
	afterNavigate(initFlowbite);
</script>

<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<main
	class="relative h-screen w-full overflow-hidden transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<Navbar />
	<Sidebar />
	<div class="relative h-full w-full overflow-y-hidden px-9 py-16 md:pl-72">
		<slot />
	</div>
</main>
