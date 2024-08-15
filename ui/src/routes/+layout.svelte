<script lang="ts">
	import 'flowbite';
	import { initFlowbite } from 'flowbite';
	import 'flowbite/dist/flowbite.css';

	import { afterNavigate } from '$app/navigation';

	import { Navbar } from '$lib/features/navigation';
	import '../app.postcss';

	afterNavigate(initFlowbite);
</script>

<Navbar />

<svelte:head>
	<title>UDS Marketplace</title>
</svelte:head>
<main
	class="flex h-screen flex-col px-24 py-9 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<div class="flex-grow overflow-hidden overflow-y-auto p-4">
		<slot />
	</div>
</main>
