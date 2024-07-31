<script lang="ts">
	import type { CarbonIcon } from 'carbon-icons-svelte';

	export let href: string;
	export let icon: typeof CarbonIcon;
	export let testId: string;
</script>

<a
	data-testid={testId}
	{href}
	class="icon inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
>
	<svelte:component this={icon} class="h-6 w-6" />
</a>
