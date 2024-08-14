<script lang="ts">
	import { base } from '$app/paths';
	import type { Application } from '$lib/types';
	export let app: Application;

	$: image = (app.spec.icons?.[0]?.src ?? `${base}/doug.svg`) as string;
	$: vendor = app.metadata.vendor.name;
	$: vendorUrl = app.metadata.vendor.url;
</script>

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
					class="app-card-header-title self-stretch text-xl font-semibold leading-[25px] text-gray-900 dark:text-white"
				>
					{app.metadata.name}
				</div>
				<div class="inline-flex h-[21px] items-start justify-start gap-4 self-stretch">
					<div class="flex items-center justify-start gap-2">
						<div class="text-center">
							<span class="text-xs font-normal leading-[18px] text-gray-500 dark:text-gray-400"
								>By:
							</span>
							<a
								class="text-xs font-normal leading-[18px] text-blue-600 underline hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400"
								href={vendorUrl}
								rel="noopener noreferrer"
							>
								{vendor}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
