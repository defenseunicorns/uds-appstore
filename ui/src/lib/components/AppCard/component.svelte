<script lang="ts">
	import { base } from '$app/paths';
	import type { Application } from '$lib/types';
	import { ArrowRight } from 'carbon-icons-svelte';
	export let app: Application;

	$: image = (app.spec.icons?.[0]?.src ?? `${base}/doug.svg`) as string;
	$: description = (app.spec.description ?? 'No description available').slice(0, 150);
	$: if (description.length === 150) description += '...';
</script>

<div
	class="app-card inline-flex h-[329px] w-[360px] flex-col items-start justify-start rounded-lg border border-gray-700 bg-[#1f2a37] p-6 shadow"
>
	<div class="app-card-header inline-flex items-center justify-start gap-3">
		<div class="flex h-20 w-20 items-start justify-start rounded">
			<div class="flex h-20 w-20 items-center justify-center">
				<div class="relative flex h-[84px] w-[84px] flex-col items-start justify-start">
					<div class="relative max-h-[84px] w-full">
						<img src={image} class="app-card-header-icon h-full w-full" alt="App Icon" />
					</div>
				</div>
			</div>
		</div>
		<div
			class="app-card-header-content inline-flex w-[220px] flex-col items-start justify-start gap-3"
		>
			<div class="inline-flex items-start justify-start gap-2 self-stretch">
				<div class="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
					<div
						class="app-card-header-title self-stretch text-xl font-semibold leading-[25px] text-white"
					>
						{app.metadata.name}
					</div>
					<div class="inline-flex h-[21px] items-start justify-start gap-4 self-stretch">
						<div class="flex items-center justify-start gap-2">
							<div class="text-center">
								<span style="text-gray-300 text-xs font-normal  leading-[18px]">By: </span><span
									style="text-[#a4cafe] text-xs font-normal  leading-[18px]"
									>Vendor Name (link)</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex h-[201px] flex-col items-start justify-start gap-5 self-stretch pt-5">
		<div
			class="h-[120px] self-stretch overflow-hidden text-base font-normal leading-normal text-gray-300"
		>
			{description}
		</div>
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
