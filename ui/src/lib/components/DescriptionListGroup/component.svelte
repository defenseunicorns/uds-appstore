<script lang="ts">
	export let title: string;
</script>

<div class="max-h-full md:p-4">
	<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>

	<div class="mt-2 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-800">
		<slot />
	</div>
</div>
