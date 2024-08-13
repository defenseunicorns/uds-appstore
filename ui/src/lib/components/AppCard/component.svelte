<script lang="ts">
	import { AppCardHeader } from '$lib/components';
	import type { Application } from '$lib/types';
	import { ArrowRight } from 'carbon-icons-svelte';
	export let app: Application;

	$: description = (app.spec.description ?? 'No description available').slice(0, 150);
	$: if (description.length === 150) description += '...';
</script>

<div
	class="app-card inline-flex h-[329px] w-[360px] flex-col items-start justify-start rounded-lg border border-gray-700 bg-[#1f2a37] p-6 shadow"
>
	<AppCardHeader {app} />
	<div class="flex h-[201px] flex-col items-start justify-start gap-5 self-stretch pt-5">
		<div
			class="h-[120px] self-stretch overflow-hidden text-base font-normal leading-normal text-gray-300"
		>
			{description}
		</div>
		<!-- TODO: connect to app detail page -->
		<div class="inline-flex items-center justify-end gap-2.5 self-stretch">
			<div
				class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-[#1f2a37] px-5 py-2.5"
			>
				<div class="text-sm font-medium leading-[21px] text-gray-300">Learn More</div>
				<div class="relative h-3.5 w-3.5">
					<ArrowRight />
				</div>
			</div>
		</div>
	</div>
</div>
