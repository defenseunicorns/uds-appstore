<script lang="ts">
	import { AppCard } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto px-4">
	<div class="mb-4 grid gap-6 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
		{#each data.apps as app}
			<AppCard {app} />
		{/each}
	</div>
</div>
