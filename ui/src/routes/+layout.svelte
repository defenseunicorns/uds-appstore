<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';
	import { onMount } from 'svelte';

	import { afterNavigate } from '$app/navigation';

	import { Navbar } from '$lib/features/navigation';
	import '../app.postcss';
	import { applicationStore } from '$lib/stores';

	onMount(async () => {
		await applicationStore.fetchCatalog();
	});
	afterNavigate(initFlowbite);
</script>

<Navbar />

<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<main
	class="flex flex-col px-24 pt-16 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<div class="flex-grow p-4 pt-0">
		<slot />
	</div>
</main>
