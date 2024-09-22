<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import TabList from '$lib/components/Tabs/TabList.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import type { Application } from '$lib/types/gen';
	import ProductOverview from '../Sections/ProductOverview.svelte';
	import Details from '../DetailLists/DetailLists.svelte';
	import SecurityCompliance from '../Sections/SecurityCompliance.svelte';
	import Contracting from '../Sections/Contracting.svelte';
	import Authorization from '../Sections/Authorization.svelte';

	const tabs = ['Product Overview', 'Security & Compliance', 'Contracting', 'Authorization'];

	export let activeTab: string = tabs[0];
	export let app: Application;
</script>

<div class="flex flex-col gap-6">
	<TabList>
		{#each tabs as tab}
			<TabItem label={tab} bind:activeTab />
		{/each}
	</TabList>
	<div class="flex flex-col gap-6 md:flex-row">
		<div class="flex-1">
			{#if activeTab === tabs[0]}
				<ProductOverview {app} />
			{:else if activeTab === tabs[1]}
				<SecurityCompliance />
			{:else if activeTab === tabs[2]}
				<Contracting />
			{:else if activeTab === tabs[3]}
				<Authorization />
			{/if}
		</div>
		<Details {app} />
	</div>
</div>
