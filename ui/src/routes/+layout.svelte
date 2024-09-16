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
	class="relative h-screen w-full overflow-hidden transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
	<div
		class="h-full overflow-y-auto p-4 md:p-6"
		style="padding-top: var(--nav-height); padding-left: var(--sidebar-width);"
	>
		<slot />
	</div>
</main>
