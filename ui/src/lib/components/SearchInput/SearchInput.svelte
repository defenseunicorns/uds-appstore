<script lang="ts">
	import { onMount } from 'svelte';
	import { Search, Close } from 'carbon-icons-svelte';

	export let searchQuery = '';
	export let handleSearch: (searchQuery: string) => void = (searchQuery: string) => {
		console.log('searchQuery', searchQuery);
		console.log('Replace in props');
	};

	let isFocused = false;
	let hasChanged = false;
	let timeoutId: number | undefined;
	let searchInput: HTMLInputElement;

	function debouncedSearch(query: string) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			handleSearch(query);
		}, 500) as unknown as number;
	}

	function clearSearch() {
		console.log('clearSearch');
		searchQuery = '';
		hasChanged = false;
		handleSearch('');
		searchInput.focus();
	}

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				searchInput.focus();
			}
			if ((event.key === 'Escape' || event.key === 'Esc') && isFocused) {
				clearSearch();
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});

	$: {
		if (hasChanged) {
			debouncedSearch(searchQuery);
		} else if (searchQuery !== '') {
			hasChanged = true;
			debouncedSearch(searchQuery);
		}
	}
</script>

<form class="mx-auto max-w-md">
	<label
		for="default-search"
		class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
	>
		Search
	</label>
	<div class="relative">
		<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
			<Search class="h-5 w-5 text-gray-500 dark:text-gray-400" />
		</div>
		<input
			bind:this={searchInput}
			type="search"
			id="application-search"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pe-14 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-search-cancel-button]:hidden"
			placeholder="Search apps..."
			bind:value={searchQuery}
			on:focus={() => (isFocused = true)}
			on:blur={() => (isFocused = false)}
		/>
		<div class="absolute inset-y-0 end-0 flex items-center pe-3">
			{#if searchQuery}
				<button
					type="button"
					class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
					on:click|preventDefault={clearSearch}
				>
					<Close class="h-6 w-6" />
				</button>
			{:else if !isFocused}
				<span class="flex items-center text-base text-gray-500 dark:text-gray-400">
					<span class="mr-1 font-semibold">⌘</span>
					<span class="font-semibold">K</span>
				</span>
			{/if}
		</div>
	</div>
</form>
