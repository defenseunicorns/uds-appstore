<script lang="ts">
	import '../app.css';

	import AppNavbar from '$lib/AppNavbar.svelte';
	import AppSidebar from '$lib/AppSidebar.svelte';

	let sidebarHidden: boolean = false;
</script>


<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<AppNavbar bind:sidebarHidden />
</header>

<main class="overflow-hidden lg:flex">
	<AppSidebar bind:sidebarHidden />

	<div class="relative h-full w-full overflow-y-auto lg:ml-64 pt-[70px]">
		<slot />
	</div>
</main>
