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

<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<main
	class="relative h-screen w-full overflow-auto transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<Navbar />
	<div class="relative h-full w-full overflow-y-auto pt-16">
		<slot />
	</div>
</main>
